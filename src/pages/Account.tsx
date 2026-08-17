import { useState } from 'react';
import { User, Lock, Smartphone, CheckCircle, LogOut } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const Account = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const { bookings } = useAdmin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  return (
    <div className="p-6">
      {!loggedIn ? (
        <>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-black">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </h2>
              <p className="text-gray-500 text-sm">Manage your simbacoach.com bookings</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-full mb-8">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`py-2.5 rounded-full text-sm font-bold transition-colors ${
                  mode === m ? 'bg-white shadow text-black' : 'text-gray-500'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="border border-gray-300 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all">
              <Smartphone className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number e.g. 0712 345 678"
                className="w-full outline-none text-black font-semibold bg-transparent text-sm"
                required
              />
            </div>
            <div className="border border-gray-300 rounded-xl px-4 py-3 flex items-center gap-3 focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all">
              <Lock className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full outline-none text-black font-semibold bg-transparent text-sm"
                required
              />
            </div>
            <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 rounded-full transition-colors text-lg shadow-md">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
            <p className="text-center text-xs text-gray-400">
              By continuing you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white text-lg font-black">
              {phone.slice(-2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">{phone}</h2>
              <p className="text-green-600 text-sm flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Verified account
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-5 mb-4">
            <h3 className="font-bold text-gray-900 mb-1">My Trips</h3>
            <p className="text-sm text-gray-500 mb-4">Active bookings on this device</p>
            {bookings.length === 0 ? (
              <p className="text-sm text-gray-400 py-6 text-center">No bookings yet. Book your first trip!</p>
            ) : (
              <div className="grid gap-2">
                {bookings.map((b) => (
                  <div key={b.id} className="border border-gray-200 rounded-xl p-3 text-sm">
                    <div className="font-bold text-gray-900">
                      {b.origin} → {b.destination}
                    </div>
                    <div className="text-gray-500">{b.date} • Seat {b.seat}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => setLoggedIn(false)} className="w-full border border-gray-300 text-gray-700 font-bold py-3.5 rounded-full transition-colors hover:bg-gray-50 flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </>
      )}
    </div>
  );
};

export default Account;