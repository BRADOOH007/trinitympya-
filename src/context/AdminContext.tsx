import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Types
export interface Route {
  id: number;
  origin: string;
  country_origin?: string;
  destination: string;
  country_dest?: string;
  price: string;
  vip_price?: string;
  duration: string;
  country?: string;
  image?: string;
  rating?: number;
  nextBus?: string; // Mapped to next_bus in DB
}

export interface Booking {
  id: string;
  routeId: number;
  origin: string;
  destination: string;
  date: string;
  time: string;
  seat: number;
  passengers: number;
  passengerName: string;
  phoneNumber: string;
  totalPrice: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  deviceType?: string;
  userLocation?: string;
  createdAt: string;
  tripType?: 'one-way' | 'return';
  linkedBookingId?: string;
  isReturnTrip?: boolean;
  discount?: number;
}

export interface ContactInfo {
  id?: number;
  phoneKE: string;
  phoneUG: string;
  phoneRW: string;
  whatsapp: string;
  email: string;
  addressKE: string;
  addressUG: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'paybill' | 'till' | 'bank';
  accountNumber: string;
  accountName: string;
  instructions: string;
}

export interface PaymentSettings {
  id?: number;
  provider: string;
  publicKey: string;
  isLive: boolean;
}

interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  
  routes: Route[];
  updateRoute: (id: number, updatedRoute: Partial<Route>) => void;
  addRoute: (route: Omit<Route, 'id'>) => Promise<void>;
  deleteRoute: (id: number) => Promise<void>;
  
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  refreshBookings: () => Promise<void>;

  contactInfo: ContactInfo;
  updateContactInfo: (info: ContactInfo) => void;

  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  removePaymentMethod: (id: string) => void;

  paymentSettings: PaymentSettings;
  updatePaymentSettings: (settings: PaymentSettings) => void;

  stats: {
    visits: number;
    topPages: { path: string; views: number }[];
    suspiciousIPs: { ip: string; attempts: number; blocked: boolean }[];
    totalRevenue: number;
    totalBookings: number;
  };
  blockIP: (ip: string) => void;
  recordSuspiciousActivity: (ip: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Default Fallback Data (used only while loading or if DB is empty/error)
const defaultContactInfo: ContactInfo = {
  phoneKE: '+254 751 494 564',
  phoneUG: '+256 747 180 552',
  phoneRW: '+250 735 589 845',
  whatsapp: '+254 755 356 109',
  email: 'Trinityexpressbus@gmail.com',
  addressKE: 'Duruma Road, Nairobi, Kenya',
  addressUG: 'Namirembe Road, Bakuli, Kampala',
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('isAdmin');
    return saved === 'true';
  });

  const [routes, setRoutes] = useState<Route[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo>(defaultContactInfo);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    provider: 'flutterwave',
    // Use the official Flutterwave Test Key
    publicKey: 'FLWPUBK_TEST-SANDBOXDEMO-X', 
    isLive: false
  });
  
  // Stats - real tracking via localStorage
  const loadStats = () => {
    try {
      const saved = localStorage.getItem('trinity_stats');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      visits: 0,
      topPages: [] as { path: string; views: number }[],
      suspiciousIPs: [] as { ip: string; attempts: number; blocked: boolean; lastSeen: string }[],
      totalRevenue: 0,
      totalBookings: 0
    };
  };

  const [stats, setStats] = useState(loadStats);

  const persistStats = (newStats: typeof stats) => {
    try { localStorage.setItem('trinity_stats', JSON.stringify(newStats)); } catch {}
    setStats(newStats);
  };

  // Track page visit on mount
  useEffect(() => {
    const path = window.location.pathname;
    setStats(prev => {
      const existing = prev.topPages.find((p: { path: string; views: number }) => p.path === path);
      const topPages = existing
        ? prev.topPages.map((p: { path: string; views: number }) => p.path === path ? { ...p, views: p.views + 1 } : p)
        : [...prev.topPages, { path, views: 1 }];
      const sorted = topPages.sort((a: { path: string; views: number }, b: { path: string; views: number }) => b.views - a.views).slice(0, 10);
      const updated = { ...prev, visits: prev.visits + 1, topPages: sorted };
      try { localStorage.setItem('trinity_stats', JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  // Calculate revenue and booking stats whenever bookings change
  useEffect(() => {
    const calculateStats = () => {
      const totalBookings = bookings.length;
      const totalRevenue = bookings.reduce((sum, booking) => {
        // Extract numeric value from price string (e.g., "KSh 3,500" -> 3500)
        const price = parseFloat(booking.totalPrice.replace(/[^0-9.]/g, '')) || 0;
        return sum + price;
      }, 0);

      setStats(prev => ({
        ...prev,
        totalRevenue,
        totalBookings
      }));
    };

    calculateStats();
  }, [bookings]);

  // Initialize tables and seed data
  const initializeTables = async () => {
    console.log('Checking if tables exist and seeding data...');
    console.log('Connecting to Supabase:', import.meta.env.VITE_SUPABASE_URL);
    
    // Try to seed routes - if table doesn't exist, user needs to run SQL manually
    const { error: routesError } = await supabase
      .from('trinity_routes')
      .select('id')
      .limit(1);
    
    if (routesError) {
      console.error('❌ DATABASE ERROR:', routesError);
      console.error('Error code:', routesError.code);
      console.error('Error message:', routesError.message);
      console.error('Error details:', routesError.details);
      
      // Show user-friendly error
      const errorMsg = `DATABASE ERROR: ${routesError.message}\n\n` +
        `The trinity_routes table doesn't exist in your Supabase database.\n\n` +
        `SOLUTION:\n` +
        `1. Go to: https://supabase.com/dashboard/project/awowbixrozodsdrovswr/sql\n` +
        `2. Copy and paste the ENTIRE contents of supabase_schema.sql\n` +
        `3. Click "Run"\n` +
        `4. Refresh this page`;
      
      alert(errorMsg);
      return false;
    }
    
    console.log('✅ Tables exist');
    return true;
  };

  // --- Fetch Data from Supabase ---
  useEffect(() => {
    (async () => {
      console.log('AdminContext: Starting data fetch...');
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
      
      // Test connection and initialize
      const tablesExist = await initializeTables();
      if (!tablesExist) return;
      
      await fetchRoutes();
      fetchBookings();
      fetchContactInfo();
      fetchPaymentMethods();
      fetchPaymentSettings();
    })();
  }, []);

  const fetchRoutes = async () => {
    console.log('Fetching routes from database...');
    const { data, error } = await supabase.from('trinity_routes').select('*').order('id');
    if (error) {
      console.error('❌ Error fetching routes:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      // Don't show alert here, just log - the initializeTables will handle it
    } else if (data) {
      console.log(`✅ Fetched ${data.length} routes from database`);
      // Map DB columns to frontend types if needed
      const mappedRoutes = data.map((r: any) => ({
        ...r,
        nextBus: r.next_bus,
        country_origin: r.country_origin,
        country_dest: r.country_dest,
        vip_price: r.vip_price
      }));
      setRoutes(mappedRoutes);
    }
  };

  const seedAdditionalRoutes = async () => {
    const additionalRoutes = [
      {
        origin: 'Kisumu',
        country_origin: 'Kenya',
        destination: 'Kampala',
        country_dest: 'Uganda',
        price: 'KSh 2,500',
        duration: '9 hours',
        country: 'Uganda'
      },
      {
        origin: 'Kisumu',
        country_origin: 'Kenya',
        destination: 'Kigali',
        country_dest: 'Rwanda',
        price: 'KSh 5,500',
        duration: '14 hours',
        country: 'Rwanda'
      },
      {
        origin: 'Eldoret',
        country_origin: 'Kenya',
        destination: 'Kigali',
        country_dest: 'Rwanda',
        price: 'KSh 6,000',
        duration: '12 hours',
        country: 'Rwanda'
      },
      {
        origin: 'Eldoret',
        country_origin: 'Kenya',
        destination: 'Kampala',
        country_dest: 'Uganda',
        price: 'KSh 2,500',
        duration: '7 hours',
        country: 'Uganda'
      },
      {
        origin: 'Nakuru',
        country_origin: 'Kenya',
        destination: 'Kampala',
        country_dest: 'Uganda',
        price: 'KSh 3,000',
        duration: '10 hours',
        country: 'Uganda'
      },
      {
        origin: 'Nakuru',
        country_origin: 'Kenya',
        destination: 'Jinja',
        country_dest: 'Uganda',
        price: 'KSh 2,500',
        duration: '8 hours',
        country: 'Uganda'
      },
      {
        origin: 'Nakuru',
        country_origin: 'Kenya',
        destination: 'Kigali',
        country_dest: 'Rwanda',
        price: 'KSh 6,500',
        duration: '13 hours',
        country: 'Rwanda'
      }
    ];

    const { data: existing, error: fetchErr } = await supabase
      .from('trinity_routes')
      .select('origin,destination');
    if (fetchErr) {
      console.error('Error checking existing routes:', fetchErr);
      return;
    }
    const exists = new Set((existing || []).map((r: any) => `${r.origin}|${r.destination}`));
    const toInsert = additionalRoutes.filter(r => !exists.has(`${r.origin}|${r.destination}`));
    if (toInsert.length > 0) {
      const { error: insertErr } = await supabase.from('trinity_routes').insert(toInsert);
      if (insertErr) console.error('Error inserting additional routes:', insertErr);
      else console.log(`✅ Added ${toInsert.length} new routes`);
    }
  };

  const fetchBookings = async () => {
    console.log('Fetching bookings from database...');
    const { data, error } = await supabase.from('trinity_bookings').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Error fetching bookings:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
    } else if (data) {
      console.log(`✅ Fetched ${data.length} bookings from database`);
      const mappedBookings = data.map((b: any) => ({
        ...b,
        routeId: b.route_id,
        passengerName: b.passenger_name,
        phoneNumber: b.phone_number,
        totalPrice: b.total_price,
        paymentMethod: b.payment_method,
        deviceType: b.device_type,
        userLocation: b.user_location,
        createdAt: b.created_at
      }));
      setBookings(mappedBookings);
      console.log('Bookings set in state:', mappedBookings.length);
    }
  };

  const fetchContactInfo = async () => {
    const { data, error } = await supabase.from('trinity_contact_info').select('*').limit(1).single();
    if (error) {
       console.error('Error fetching contact info:', error);
       // If no data, we might want to insert default? For now, keep default state.
    } else if (data) {
      setContactInfo({
        id: data.id,
        phoneKE: data.phone_ke || defaultContactInfo.phoneKE,
        phoneUG: data.phone_ug || defaultContactInfo.phoneUG,
        phoneRW: data.phone_rw || defaultContactInfo.phoneRW,
        whatsapp: data.whatsapp || defaultContactInfo.whatsapp,
        email: data.email || defaultContactInfo.email,
        addressKE: data.address_ke || defaultContactInfo.addressKE,
        addressUG: data.address_ug || defaultContactInfo.addressUG
      });
    }
  };

  const fetchPaymentMethods = async () => {
    const { data, error } = await supabase.from('trinity_payment_methods').select('*');
    if (error) console.error('Error fetching payment methods:', error);
    else if (data) {
      const mapped = data.map((p: any) => ({
        ...p,
        accountNumber: p.account_number,
        accountName: p.account_name
      }));
      setPaymentMethods(mapped);
    }
  };

  const fetchPaymentSettings = async () => {
    const { data, error } = await supabase.from('trinity_payment_settings').select('*').limit(1).single();
    if (error) {
      console.warn('Error fetching payment settings (might not exist yet):', error);
    } else if (data) {
      setPaymentSettings({
        id: data.id,
        provider: data.provider,
        publicKey: data.public_key,
        isLive: data.is_live
      });
    }
  };

  // --- Auth ---
  useEffect(() => {
    localStorage.setItem('isAdmin', String(isAdmin));
  }, [isAdmin]);

  const login = (password: string) => {
    if (password === '0987654321') {
      setIsAdmin(true);
      return true;
    }
    // Record failed login attempt
    const ip = 'unknown-' + Date.now(); // can't get real IP client-side, use timestamp as proxy
    recordSuspiciousActivity(ip);
    return false;
  };

  const logout = () => setIsAdmin(false);

  // --- Actions ---

  const updateRoute = async (id: number, updatedRoute: Partial<Route>) => {
    // Optimistic update
    setRoutes(prev => prev.map(route => route.id === id ? { ...route, ...updatedRoute } : route));
    
    // DB Update
    const dbUpdate: any = { ...updatedRoute };
    if (updatedRoute.nextBus) { dbUpdate.next_bus = updatedRoute.nextBus; delete dbUpdate.nextBus; }
    
    const { error } = await supabase.from('trinity_routes').update(dbUpdate).eq('id', id);
    if (error) {
      console.error('Error updating route:', error);
      fetchRoutes(); // Revert on error
    }
  };

  const addRoute = async (routeData: Omit<Route, 'id'>) => {
    console.log('Adding new route:', routeData);
    
    const dbRoute: any = {
      origin: routeData.origin,
      country_origin: routeData.country_origin,
      destination: routeData.destination,
      country_dest: routeData.country_dest,
      price: routeData.price,
      vip_price: routeData.vip_price,
      duration: routeData.duration,
      country: routeData.country,
      image: routeData.image,
      rating: routeData.rating,
      next_bus: routeData.nextBus
    };

    const { data, error } = await supabase.from('trinity_routes').insert([dbRoute]).select();
    
    if (error) {
      console.error('❌ Error adding route to database:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error details:', error.details);
      
      let errorMsg = `Failed to add route: ${error.message}\n\n`;
      
      if (error.message.includes('row_level security') || error.message.includes('policy')) {
        errorMsg += `The table exists but Row Level Security is blocking the operation.\n\n` +
          `SOLUTION:\n` +
          `1. Go to: https://supabase.com/dashboard/project/awowbixrozodsdrovswr/sql\n` +
          `2. Run this SQL:\n\n` +
          `drop policy if exists "Public routes are viewable by everyone" on public.trinity_routes;\n` +
          `create policy "Enable all access for routes" on public.trinity_routes for all using (true);\n\n` +
          `3. Try adding the route again`;
      } else {
        errorMsg += `This usually means the trinity_routes table doesn't exist.\n\n` +
          `Please run supabase_schema.sql in your Supabase SQL Editor.`;
      }
      
      alert(errorMsg);
    } else if (data) {
      console.log('✅ Route added successfully:', data[0]);
      await fetchRoutes(); // Refresh routes list
      alert('Route added successfully!');
    }
  };

  const deleteRoute = async (id: number) => {
    if (!confirm('Are you sure you want to delete this route?')) return;
    
    // Optimistic update
    setRoutes(prev => prev.filter(route => route.id !== id));
    
    const { error } = await supabase.from('trinity_routes').delete().eq('id', id);
    if (error) {
      console.error('Error deleting route:', error);
      alert('Failed to delete route. Please try again.');
      fetchRoutes(); // Revert on error
    }
  };

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    console.log('Adding booking:', bookingData);
    
    // Generate temporary ID for optimistic update
    const tempId = `temp-${Date.now()}`;
    const tempBooking = {
      ...bookingData,
      id: tempId,
      createdAt: new Date().toISOString(),
      status: bookingData.status || 'pending' as const
    };
    
    // Optimistically add to local state immediately
    setBookings(prev => [tempBooking, ...prev]);
    console.log('✅ Booking added to local state (optimistic)');

    const dbBooking = {
      route_id: bookingData.routeId,
      origin: bookingData.origin,
      destination: bookingData.destination,
      date: bookingData.date,
      time: bookingData.time,
      seat: bookingData.seat,
      passengers: bookingData.passengers,
      passenger_name: bookingData.passengerName,
      phone_number: bookingData.phoneNumber,
      total_price: bookingData.totalPrice,
      payment_method: bookingData.paymentMethod,
      device_type: bookingData.deviceType,
      user_location: bookingData.userLocation,
      status: bookingData.status || 'pending'
    };

    console.log('Attempting to save to database:', dbBooking);
    const { data, error } = await supabase.from('trinity_bookings').insert([dbBooking]).select();
    
    if (error) {
      console.error('❌ Error adding booking to database:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      // Keep the temp booking in state - it's still valid
    } else if (data) {
      console.log('✅ Booking saved to database successfully:', data[0]);
      // Replace temp booking with real one from database
      setBookings(prev => prev.map(b => 
        b.id === tempId ? {
          ...bookingData,
          id: data[0].id,
          createdAt: data[0].created_at,
          status: bookingData.status || 'pending'
        } : b
      ));
    }
  };

  const updateBookingStatus = async (id: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    
    const { error } = await supabase.from('trinity_bookings').update({ status }).eq('id', id);
    if (error) {
      console.error('Error updating booking status:', error);
      fetchBookings();
    }
  };

  const updateContactInfo = async (info: ContactInfo) => {
    setContactInfo(info);
    
    const dbInfo = {
      phone_ke: info.phoneKE,
      phone_ug: info.phoneUG,
      phone_rw: info.phoneRW,
      whatsapp: info.whatsapp,
      email: info.email,
      address_ke: info.addressKE,
      address_ug: info.addressUG
    };

    // Upsert (update if exists, insert if not)
    // Assuming ID 1 for single row
    const { error } = await supabase.from('trinity_contact_info').upsert({ id: 1, ...dbInfo });
    
    if (error) {
      console.error('Error updating contact info:', error);
      fetchContactInfo();
    }
  };

  const addPaymentMethod = async (method: Omit<PaymentMethod, 'id'>) => {
    const dbMethod = {
      name: method.name,
      type: method.type,
      account_number: method.accountNumber,
      account_name: method.accountName,
      instructions: method.instructions
    };

    const { data, error } = await supabase.from('trinity_payment_methods').insert([dbMethod]).select();
    
    if (error) {
      console.error('Error adding payment method:', error);
    } else if (data) {
      const newMethod: PaymentMethod = {
        ...method,
        id: data[0].id
      };
      setPaymentMethods(prev => [...prev, newMethod]);
    }
  };

  const removePaymentMethod = async (id: string) => {
    setPaymentMethods(prev => prev.filter(p => p.id !== id));
    
    const { error } = await supabase.from('trinity_payment_methods').delete().eq('id', id);
    if (error) {
      console.error('Error removing payment method:', error);
      fetchPaymentMethods();
    }
  };

  const updatePaymentSettings = async (settings: PaymentSettings) => {
    setPaymentSettings(settings);
    
    const dbSettings = {
      provider: settings.provider,
      public_key: settings.publicKey,
      is_live: settings.isLive
    };

    // Upsert (update if exists, insert if not)
    // Assuming ID 1 or single row logic
    const { error } = await supabase.from('trinity_payment_settings').upsert({ id: settings.id || 1, ...dbSettings });
    
    if (error) {
      console.error('Error updating payment settings:', error);
      fetchPaymentSettings();
    }
  };

  const blockIP = (ip: string) => {
    setStats(prev => {
      const updated = {
        ...prev,
        suspiciousIPs: prev.suspiciousIPs.map((item: { ip: string; attempts: number; blocked: boolean; lastSeen: string }) =>
          item.ip === ip ? { ...item, blocked: !item.blocked } : item
        )
      };
      try { localStorage.setItem('trinity_stats', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const recordSuspiciousActivity = (ip: string) => {
    setStats(prev => {
      const existing = prev.suspiciousIPs.find((item: { ip: string }) => item.ip === ip);
      const suspiciousIPs = existing
        ? prev.suspiciousIPs.map((item: { ip: string; attempts: number; blocked: boolean; lastSeen: string }) =>
            item.ip === ip ? { ...item, attempts: item.attempts + 1, lastSeen: new Date().toISOString() } : item
          )
        : [...prev.suspiciousIPs, { ip, attempts: 1, blocked: false, lastSeen: new Date().toISOString() }];
      const updated = { ...prev, suspiciousIPs };
      try { localStorage.setItem('trinity_stats', JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const refreshBookings = async () => {
    await fetchBookings();
  };

  return (
    <AdminContext.Provider value={{ 
      isAdmin, login, logout, 
      routes, updateRoute, addRoute, deleteRoute,
      bookings, addBooking, updateBookingStatus, refreshBookings,
      contactInfo, updateContactInfo,
      paymentMethods, addPaymentMethod, removePaymentMethod,
      paymentSettings, updatePaymentSettings,
      stats, blockIP, recordSuspiciousActivity
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
