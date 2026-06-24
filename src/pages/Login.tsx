import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowLeft } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin-dashboard');
    } else {
      setError('Invalid access code');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full card-elevated">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Agent Portal</h2>
          <p className="text-slate-600 mt-2">Authorized personnel only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Access Code</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter your secure code"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2 ml-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="btn-primary w-full py-4 text-lg"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
