import React, { useState } from 'react';
import { useAdmin, Route, ContactInfo, PaymentMethod } from '../context/AdminContext';
import { Shield, Globe, Lock, Edit2, Save, X, Ban, CheckCircle, Phone, CreditCard, Ticket } from 'lucide-react';

const AVAILABLE_IMAGES = [
  { name: 'Nairobi', value: '/assets/nairobi.jpg' },
  { name: 'Kampala', value: '/assets/kampala.jpg' },
  { name: 'Juba', value: '/assets/juba.jpg' },
  { name: 'Goma', value: '/assets/goma.jpg' },
  { name: 'Goma 2', value: '/assets/goma (2).jpg' },
  { name: 'Bukavu', value: '/assets/bukavu.webp' },
  { name: 'Bus 1', value: '/assets/mini_magick20260128-31102-68vlss.jpg' },
  { name: 'Bus 2', value: '/assets/mini_magick20260128-31102-i1tltr.jpg' },
  { name: 'Bus 3', value: '/assets/mini_magick20260128-31102-r8rmj3.jpg' },
  { name: 'Bus 4', value: '/assets/mini_magick20260128-31102-u49wzm.jpg' },
  { name: 'Bus 5', value: '/assets/mini_magick20260128-31585-78mbdj.jpg' },
  { name: 'Bus 6', value: '/assets/mini_magick20260128-31585-lk5tcl.jpg' },
  { name: 'Bus 7', value: '/assets/mini_magick20260128-32058-ez8bgi.jpg' },
  { name: 'Bus 8', value: '/assets/mini_magick20260128-32058-vbgegz.jpg' },
  { name: 'Bus 9', value: '/assets/mini_magick20260128-32454-7pm8cd.jpg' },
  { name: 'Bus 10', value: '/assets/mini_magick20260128-32454-w502k8.jpg' },
];

const AdminDashboard = () => {
  const { 
    isAdmin, logout, 
    routes, updateRoute, addRoute, deleteRoute,
    bookings, updateBookingStatus, refreshBookings,
    contactInfo, updateContactInfo,
    paymentMethods, addPaymentMethod, removePaymentMethod,
    paymentSettings, updatePaymentSettings,
    stats, blockIP 
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'routes' | 'bookings' | 'settings'>('routes');
  
  // Route Editing State — now uses a modal instead of inline
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [editRouteForm, setEditRouteForm] = useState<Partial<Route>>({});
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageModalTarget, setImageModalTarget] = useState<'edit' | 'add'>('edit');

  // Add Route State
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [newRouteForm, setNewRouteForm] = useState<Omit<Route, 'id'>>({
    origin: '',
    country_origin: '',
    destination: '',
    country_dest: '',
    price: '',
    vip_price: '',
    duration: '',
    country: '',
    image: '',
    rating: 0,
    nextBus: ''
  });

  // Auto-capitalize: Title Case for city/country names
  const titleCase = (str: string) =>
    str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Contact Info Editing State
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactForm, setContactForm] = useState<ContactInfo>(contactInfo);
  
  // Payment Settings State
  const [isEditingPaymentSettings, setIsEditingPaymentSettings] = useState(false);
  const [paymentSettingsForm, setPaymentSettingsForm] = useState(paymentSettings);

  // Export bookings to CSV
  const exportBookingsToCSV = () => {
    if (bookings.length === 0) {
      alert('No bookings to export');
      return;
    }

    // CSV Headers
    const headers = ['Booking ID', 'Passenger Name', 'Phone Number', 'Route', 'Origin', 'Destination', 'Date', 'Time', 'Seat', 'Passengers', 'Total Price', 'Payment Method', 'Status', 'Device', 'Location', 'Created At'];
    
    // CSV Rows
    const rows = bookings.map(b => [
      b.id,
      b.passengerName || 'N/A',
      b.phoneNumber,
      `${b.origin} to ${b.destination}`,
      b.origin,
      b.destination,
      b.date,
      b.time,
      b.seat,
      b.passengers,
      b.totalPrice,
      b.paymentMethod,
      b.status,
      b.deviceType || 'N/A',
      b.userLocation || 'N/A',
      new Date(b.createdAt).toLocaleString()
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `trinity-bookings-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // New Payment Method State
  const [newPaymentMethod, setNewPaymentMethod] = useState<Omit<PaymentMethod, 'id'>>({
    name: '', type: 'paybill', accountNumber: '', accountName: '', instructions: ''
  });

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <Lock className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-400">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  // --- Handlers ---

  const handleEditRouteClick = (route: Route) => {
    setEditingRoute(route);
    setEditRouteForm({ ...route });
  };

  const handleRouteSave = (id: number) => {
    const normalizedRoute = {
      ...editRouteForm,
      origin: editRouteForm.origin ? titleCase(editRouteForm.origin.trim()) : editRouteForm.origin,
      destination: editRouteForm.destination ? titleCase(editRouteForm.destination.trim()) : editRouteForm.destination,
      country_origin: editRouteForm.country_origin ? titleCase(editRouteForm.country_origin.trim()) : editRouteForm.country_origin,
      country_dest: editRouteForm.country_dest ? titleCase(editRouteForm.country_dest.trim()) : editRouteForm.country_dest,
      country: editRouteForm.country ? titleCase(editRouteForm.country.trim()) : editRouteForm.country,
    };
    updateRoute(id, normalizedRoute);
    setEditingRoute(null);
  };

  const handleImageSelect = (imageValue: string) => {
    if (imageModalTarget === 'edit') {
      setEditRouteForm({ ...editRouteForm, image: imageValue });
    } else {
      setNewRouteForm({ ...newRouteForm, image: imageValue });
    }
    setShowImageModal(false);
  };

  const handleContactSave = () => {
    updateContactInfo(contactForm);
    setIsEditingContact(false);
  };

  const handlePaymentSettingsSave = () => {
    updatePaymentSettings(paymentSettingsForm);
    setIsEditingPaymentSettings(false);
  };

  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    addPaymentMethod(newPaymentMethod);
    setNewPaymentMethod({ name: '', type: 'paybill', accountNumber: '', accountName: '', instructions: '' });
  };

  const handleAddRoute = async () => {
    if (!newRouteForm.origin || !newRouteForm.destination || !newRouteForm.price || !newRouteForm.duration) {
      alert('Please fill in all required fields (Origin, Destination, Price, Duration)');
      return;
    }
    const normalizedRoute = {
      ...newRouteForm,
      origin: titleCase(newRouteForm.origin.trim()),
      destination: titleCase(newRouteForm.destination.trim()),
      country_origin: newRouteForm.country_origin ? titleCase(newRouteForm.country_origin.trim()) : '',
      country_dest: newRouteForm.country_dest ? titleCase(newRouteForm.country_dest.trim()) : '',
      country: newRouteForm.country ? titleCase(newRouteForm.country.trim()) : ''
    };
    await addRoute(normalizedRoute);
    setShowAddRouteModal(false);
    setNewRouteForm({
      origin: '', country_origin: '', destination: '', country_dest: '',
      price: '', vip_price: '', duration: '', country: '', image: '', rating: 0, nextBus: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-white">
                <Shield className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            {/* Mobile Logout (visible only on mobile) */}
            <button 
              onClick={logout}
              className="md:hidden p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full md:w-auto">
              <button 
                onClick={() => setActiveTab('routes')}
                className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'routes' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Routes
              </button>
              <button 
                onClick={() => setActiveTab('bookings')}
                className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'bookings' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Bookings
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Settings
              </button>
            </nav>
            <button 
              onClick={logout}
              className="hidden md:block px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        
        {/* Tab Content */}
        {activeTab === 'routes' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Route Management */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Route Management</h2>
                <button
                  onClick={() => setShowAddRouteModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Route
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Route</th>
                      <th className="px-6 py-4 font-semibold">Image</th>
                      <th className="px-6 py-4 font-semibold">Price</th>
                      <th className="px-6 py-4 font-semibold">Duration</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {routes.map((route) => (
                      <tr key={route.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-900">{route.origin} → {route.destination}</p>
                          <p className="text-xs text-gray-500">{route.country_origin} to {route.country_dest}</p>
                          {route.nextBus && <p className="text-xs text-blue-500 mt-0.5">🕐 {route.nextBus}</p>}
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-16 h-12 rounded overflow-hidden bg-gray-100 border border-gray-200">
                            {route.image ? (
                              <img src={route.image} alt="Route" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-blue-600">{route.price}</span>
                          {route.vip_price && <p className="text-xs text-orange-500 mt-0.5">VIP: {route.vip_price}</p>}
                        </td>
                        <td className="px-6 py-4 text-gray-500">{route.duration}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleEditRouteClick(route)} className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteRoute(route.id)} className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100" title="Delete">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side Panel: Security */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">Security Watch</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {stats.suspiciousIPs.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-mono text-sm text-gray-800">{item.ip}</p>
                          <p className="text-xs text-red-500">{item.attempts} failed attempts</p>
                        </div>
                        <button 
                          onClick={() => blockIP(item.ip)}
                          className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                            item.blocked 
                              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {item.blocked ? 'Unblock' : 'Block'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Revenue Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">Total Revenue</h3>
                  <CreditCard className="w-5 h-5 opacity-75" />
                </div>
                <p className="text-3xl font-bold">KSh {stats.totalRevenue.toLocaleString()}</p>
                <p className="text-xs opacity-75 mt-1">From all bookings</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">Total Bookings</h3>
                  <Ticket className="w-5 h-5 opacity-75" />
                </div>
                <p className="text-3xl font-bold">{stats.totalBookings}</p>
                <p className="text-xs opacity-75 mt-1">All time bookings</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium opacity-90">Average Booking</h3>
                  <Globe className="w-5 h-5 opacity-75" />
                </div>
                <p className="text-3xl font-bold">
                  KSh {stats.totalBookings > 0 ? Math.round(stats.totalRevenue / stats.totalBookings).toLocaleString() : 0}
                </p>
                <p className="text-xs opacity-75 mt-1">Per booking</p>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">All Bookings</h2>
                  <p className="text-sm text-gray-500 mt-1">Including past and upcoming trips</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={exportBookingsToCSV}
                    className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export CSV
                  </button>
                  <button
                    onClick={refreshBookings}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                  </button>
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                    {bookings.length} Total
                  </span>
                </div>
              </div>
            
            {bookings.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <Ticket className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No bookings received yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Ref ID</th>
                      <th className="px-6 py-4 font-semibold">Passenger</th>
                      <th className="px-6 py-4 font-semibold">Route</th>
                      <th className="px-6 py-4 font-semibold">Date/Time</th>
                      <th className="px-6 py-4 font-semibold">Pax</th>
                      <th className="px-6 py-4 font-semibold">Total</th>
                      <th className="px-6 py-4 font-semibold">Payment</th>
                      <th className="px-6 py-4 font-semibold">Device / Location</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-gray-500">{booking.id}</td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-900">{booking.passengerName}</p>
                          <p className="text-xs text-gray-500">{booking.phoneNumber}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-gray-900">{booking.origin} → {booking.destination}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-900">{booking.date}</p>
                          <p className="text-xs text-gray-500">{booking.time}</p>
                        </td>
                        <td className="px-6 py-4 text-center">{booking.passengers}</td>
                        <td className="px-6 py-4 font-bold text-green-600">{booking.totalPrice}</td>
                        <td className="px-6 py-4">
                          <span className="capitalize bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">{booking.paymentMethod}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-gray-700 bg-blue-50 px-2 py-0.5 rounded w-fit">
                              {booking.deviceType || 'Unknown'}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {booking.userLocation || 'Unknown'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {booking.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                  className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100"
                                  title="Confirm"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                  className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100"
                                  title="Cancel"
                                >
                                  <Ban className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Contact Information Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Phone className="w-5 h-5" /></div>
                  <h2 className="text-lg font-bold text-gray-900">Contact Information</h2>
                </div>
                {!isEditingContact ? (
                  <button onClick={() => setIsEditingContact(true)} className="text-blue-600 hover:text-blue-700 text-sm font-bold">Edit</button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={handleContactSave} className="text-green-600 hover:text-green-700 text-sm font-bold">Save</button>
                    <button onClick={() => setIsEditingContact(false)} className="text-gray-500 hover:text-gray-600 text-sm">Cancel</button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone (Kenya)</label>
                  {isEditingContact ? (
                    <input 
                      type="text" 
                      value={contactForm.phoneKE}
                      onChange={(e) => setContactForm({...contactForm, phoneKE: e.target.value})}
                      className="w-full border rounded p-2 text-sm"
                    />
                  ) : <p className="text-gray-900">{contactInfo.phoneKE}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone (Uganda)</label>
                  {isEditingContact ? (
                    <input 
                      type="text" 
                      value={contactForm.phoneUG}
                      onChange={(e) => setContactForm({...contactForm, phoneUG: e.target.value})}
                      className="w-full border rounded p-2 text-sm"
                    />
                  ) : <p className="text-gray-900">{contactInfo.phoneUG}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone (Rwanda)</label>
                  {isEditingContact ? (
                    <input 
                      type="text" 
                      value={contactForm.phoneRW}
                      onChange={(e) => setContactForm({...contactForm, phoneRW: e.target.value})}
                      className="w-full border rounded p-2 text-sm"
                    />
                  ) : <p className="text-gray-900">{contactInfo.phoneRW}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">WhatsApp</label>
                  {isEditingContact ? (
                    <input 
                      type="text" 
                      value={contactForm.whatsapp}
                      onChange={(e) => setContactForm({...contactForm, whatsapp: e.target.value})}
                      className="w-full border rounded p-2 text-sm"
                    />
                  ) : <p className="text-gray-900">{contactInfo.whatsapp}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                  {isEditingContact ? (
                    <input 
                      type="text" 
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full border rounded p-2 text-sm"
                    />
                  ) : <p className="text-gray-900">{contactInfo.email}</p>}
                </div>
              </div>
            </div>

            {/* Payment Methods Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-50 rounded-lg text-green-600"><CreditCard className="w-5 h-5" /></div>
                <h2 className="text-lg font-bold text-gray-900">Payment Methods</h2>
              </div>

              {/* API Integration Settings */}
              <div className="bg-blue-50/50 rounded-xl p-4 mb-8 border border-blue-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold text-gray-800">IntaSend Integration</h3>
                  {!isEditingPaymentSettings ? (
                    <button onClick={() => { setPaymentSettingsForm(paymentSettings); setIsEditingPaymentSettings(true); }} className="text-blue-600 hover:text-blue-700 text-xs font-bold uppercase">Configure</button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={handlePaymentSettingsSave} className="text-green-600 hover:text-green-700 text-xs font-bold uppercase">Save</button>
                      <button onClick={() => setIsEditingPaymentSettings(false)} className="text-gray-500 hover:text-gray-600 text-xs uppercase">Cancel</button>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Public API Key</label>
                    {isEditingPaymentSettings ? (
                      <input 
                        type="text" 
                        value={paymentSettingsForm.publicKey}
                        onChange={(e) => setPaymentSettingsForm({...paymentSettingsForm, publicKey: e.target.value})}
                        className="w-full border rounded p-2 text-xs font-mono"
                        placeholder="ISPubKey_..."
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                         <code className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600 truncate max-w-[200px]">{paymentSettings.publicKey}</code>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Mode:</label>
                    {isEditingPaymentSettings ? (
                      <div className="flex items-center gap-2">
                         <label className="flex items-center gap-1 cursor-pointer">
                           <input 
                             type="radio" 
                             checked={!paymentSettingsForm.isLive} 
                             onChange={() => setPaymentSettingsForm({...paymentSettingsForm, isLive: false})}
                           />
                           <span className="text-xs text-gray-700">Test</span>
                         </label>
                         <label className="flex items-center gap-1 cursor-pointer">
                           <input 
                             type="radio" 
                             checked={paymentSettingsForm.isLive} 
                             onChange={() => setPaymentSettingsForm({...paymentSettingsForm, isLive: true})}
                           />
                           <span className="text-xs text-red-600 font-bold">Live</span>
                         </label>
                      </div>
                    ) : (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded ${paymentSettings.isLive ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'}`}>
                        {paymentSettings.isLive ? 'LIVE' : 'TEST'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div>
                      <p className="font-bold text-gray-900">{method.name}</p>
                      <p className="text-xs text-gray-500">{method.type === 'paybill' ? 'Paybill: ' : 'Acc: '}{method.accountNumber}</p>
                    </div>
                    <button onClick={() => removePaymentMethod(method.id)} className="text-red-500 hover:text-red-700">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Add New Method</h3>
                <form onSubmit={handleAddPaymentMethod} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      placeholder="Name (e.g. M-Pesa)" 
                      className="border rounded p-2 text-sm"
                      value={newPaymentMethod.name}
                      onChange={(e) => setNewPaymentMethod({...newPaymentMethod, name: e.target.value})}
                      required
                    />
                    <select 
                      className="border rounded p-2 text-sm"
                      value={newPaymentMethod.type}
                      onChange={(e) => setNewPaymentMethod({...newPaymentMethod, type: e.target.value as any})}
                    >
                      <option value="paybill">Paybill</option>
                      <option value="till">Till Number</option>
                      <option value="bank">Bank Account</option>
                    </select>
                  </div>
                  <input 
                    placeholder="Account Number / Paybill" 
                    className="w-full border rounded p-2 text-sm"
                    value={newPaymentMethod.accountNumber}
                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, accountNumber: e.target.value})}
                    required
                  />
                  <input 
                    placeholder="Instructions (e.g. Use Booking Ref as Acc No.)" 
                    className="w-full border rounded p-2 text-sm"
                    value={newPaymentMethod.instructions}
                    onChange={(e) => setNewPaymentMethod({...newPaymentMethod, instructions: e.target.value})}
                  />
                  <button type="submit" className="w-full bg-gray-900 text-white font-bold py-2 rounded-lg text-sm hover:bg-gray-800">
                    Add Payment Method
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}

      </div>
      {/* Image Selection Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Select Route Image</h3>
                <p className="text-sm text-gray-500">Choose an image for this route</p>
              </div>
              <button onClick={() => setShowImageModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {AVAILABLE_IMAGES.map((img) => (
                <button 
                  key={img.value}
                  onClick={() => handleImageSelect(img.value)}
                  className={`group relative aspect-video rounded-xl overflow-hidden border-2 transition-all text-left ${
                    editRouteForm.image === img.value ? 'border-blue-600 ring-2 ring-blue-100' : 'border-gray-100 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <img src={img.value} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6">
                    <p className="text-white text-sm font-bold truncate">{img.name}</p>
                  </div>
                  {editRouteForm.image === img.value && (
                    <div className="absolute top-2 right-2 bg-blue-600 text-white p-1.5 rounded-full shadow-lg">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end">
              <button 
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 text-gray-600 font-bold hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Route Modal */}
      {showAddRouteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold text-gray-900">Add New Route</h3>
              <button 
                onClick={() => setShowAddRouteModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Origin City *</label>
                  <input 
                    type="text" 
                    value={newRouteForm.origin}
                    onChange={(e) => setNewRouteForm({...newRouteForm, origin: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., Nairobi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Origin Country</label>
                  <input 
                    type="text" 
                    value={newRouteForm.country_origin}
                    onChange={(e) => setNewRouteForm({...newRouteForm, country_origin: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., Kenya"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Destination City *</label>
                  <input 
                    type="text" 
                    value={newRouteForm.destination}
                    onChange={(e) => setNewRouteForm({...newRouteForm, destination: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., Kampala"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Destination Country</label>
                  <input 
                    type="text" 
                    value={newRouteForm.country_dest}
                    onChange={(e) => setNewRouteForm({...newRouteForm, country_dest: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., Uganda"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Price *</label>
                  <input 
                    type="text" 
                    value={newRouteForm.price}
                    onChange={(e) => setNewRouteForm({...newRouteForm, price: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., KSh 3,500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">VIP Price</label>
                  <input 
                    type="text" 
                    value={newRouteForm.vip_price}
                    onChange={(e) => setNewRouteForm({...newRouteForm, vip_price: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., KSh 5,000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Duration *</label>
                  <input 
                    type="text" 
                    value={newRouteForm.duration}
                    onChange={(e) => setNewRouteForm({...newRouteForm, duration: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., 12 hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Country/Region</label>
                  <input 
                    type="text" 
                    value={newRouteForm.country}
                    onChange={(e) => setNewRouteForm({...newRouteForm, country: e.target.value})}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="e.g., Uganda"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Next Bus Time</label>
                <input 
                  type="text" 
                  value={newRouteForm.nextBus}
                  onChange={(e) => setNewRouteForm({...newRouteForm, nextBus: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g., 08:00 AM"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Route Image</label>
                <div className="flex items-center gap-3">
                  <select
                    value={newRouteForm.image}
                    onChange={(e) => setNewRouteForm({...newRouteForm, image: e.target.value})}
                    className="flex-1 border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="">Select an image</option>
                    {AVAILABLE_IMAGES.map((img) => (
                      <option key={img.value} value={img.value}>{img.name}</option>
                    ))}
                  </select>
                  {newRouteForm.image && (
                    <div className="w-16 h-12 rounded overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={newRouteForm.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Rating (0-5)</label>
                <input 
                  type="number" 
                  min="0"
                  max="5"
                  step="0.1"
                  value={newRouteForm.rating}
                  onChange={(e) => setNewRouteForm({...newRouteForm, rating: parseFloat(e.target.value) || 0})}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="e.g., 4.8"
                />
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
              <button 
                onClick={() => setShowAddRouteModal(false)}
                className="px-6 py-2 text-gray-600 font-bold hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddRoute}
                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Route
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
