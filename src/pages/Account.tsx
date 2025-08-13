import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../components/Toast';

interface UserProfile {
  id: string;
  email?: string;
  phone?: string;
  user_metadata: {
    full_name?: string;
    user_type?: string;
  };
  created_at: string;
}

const Account: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState('farmer');
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (!currentUser) {
          navigate('/login');
          return;
        }
        setUser(currentUser);
        setFullName(currentUser.user_metadata.full_name || '');
        setUserType(currentUser.user_metadata.user_type || 'farmer');
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          user_type: userType,
        }
      });

      if (error) throw error;

      // Refresh user data
      const { data: { user: updatedUser } } = await supabase.auth.getUser();
      setUser(updatedUser);
      setIsEditing(false);
      addToast('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      addToast('Failed to update profile. Please try again.', 'error');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      addToast('Successfully logged out. See you next time!', 'success');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      addToast('Error logging out. Please try again.', 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-600 font-medium">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/95 backdrop-blur-sm shadow-lg border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/home" className="flex items-center space-x-3 text-emerald-700 hover:text-emerald-800 transition-colors duration-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              <span className="font-semibold">Back to Home</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-green-700 rounded-full flex items-center justify-center shadow-md">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L14.5 6.5L19 7.5L15.5 11L16.5 16.5L12 14L7.5 16.5L8.5 11L5 7.5L9.5 6.5L12 2Z"/>
                  <path d="M12 14V22"/>
                  <path d="M8 18H16"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                  AgriLink
                </h1>
                <p className="text-xs text-emerald-600 font-medium">Account Settings</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-4xl animate-slide-up">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="text-center p-8 bg-gradient-to-br from-emerald-50 to-green-50 border-b border-emerald-100">
              {/* Profile Avatar */}
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-600 to-green-700 rounded-full mb-6 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h1 className="text-4xl font-heading font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent mb-3">
                My Account
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your AgriLink profile and preferences
              </p>
            </div>

            <div className="p-8">
              {user && (
                <div className="space-y-8">
                  {/* Account Information */}
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                    <h3 className="text-xl font-heading font-bold text-emerald-800 mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      Account Information
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white/60 rounded-lg p-4 border border-emerald-100">
                        <label className="block text-sm font-semibold text-emerald-600 mb-2">
                          Email Address
                        </label>
                        <p className="text-emerald-800 font-medium text-lg">
                          {user.email || 'Not provided'}
                        </p>
                      </div>
                      
                      <div className="bg-white/60 rounded-lg p-4 border border-emerald-100">
                        <label className="block text-sm font-semibold text-emerald-600 mb-2">
                          Phone Number
                        </label>
                        <p className="text-emerald-800 font-medium text-lg">
                          {user.phone || 'Not provided'}
                        </p>
                      </div>
                      
                      <div className="bg-white/60 rounded-lg p-4 border border-emerald-100">
                        <label className="block text-sm font-semibold text-emerald-600 mb-2">
                          Member Since
                        </label>
                        <p className="text-emerald-800 font-medium text-lg">
                          {new Date(user.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      
                      <div className="bg-white/60 rounded-lg p-4 border border-emerald-100">
                        <label className="block text-sm font-semibold text-emerald-600 mb-2">
                          Account ID
                        </label>
                        <p className="text-emerald-800 font-medium text-sm font-mono">
                          {user.id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Profile Information */}
                  <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-heading font-bold text-emerald-800 flex items-center">
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        Profile Information
                      </h3>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
                      >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </button>
                    </div>

                    {isEditing ? (
                      <form onSubmit={handleUpdateProfile} className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                              </svg>
                            </div>
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="w-full pl-10 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none bg-white placeholder-gray-400 text-gray-900"
                              placeholder="Enter your full name"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            User Type
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L14.5 6.5L19 7.5L15.5 11L16.5 16.5L12 14L7.5 16.5L8.5 11L5 7.5L9.5 6.5L12 2Z"/>
                              </svg>
                            </div>
                            <select
                              value={userType}
                              onChange={(e) => setUserType(e.target.value)}
                              className="w-full pl-10 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 outline-none bg-white text-gray-900"
                            >
                              <option value="farmer">🌱 Farmer</option>
                              <option value="buyer">🛒 Buyer</option>
                              <option value="supplier">📦 Supplier</option>
                              <option value="distributor">🚚 Distributor</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex space-x-4">
                          <button 
                            type="submit" 
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105"
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                          <label className="block text-sm font-semibold text-emerald-600 mb-2">
                            Full Name
                          </label>
                          <p className="text-emerald-800 font-medium text-lg">
                            {user.user_metadata.full_name || 'Not provided'}
                          </p>
                        </div>
                        
                        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                          <label className="block text-sm font-semibold text-emerald-600 mb-2">
                            User Type
                          </label>
                          <p className="text-emerald-800 font-medium text-lg capitalize">
                            {user.user_metadata.user_type || 'Farmer'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-2xl p-6 border border-emerald-100 shadow-lg">
                    <h3 className="text-xl font-heading font-bold text-emerald-800 mb-6 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 3l3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"/>
                        <path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/>
                      </svg>
                      Quick Actions
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Link 
                        to="/products/add" 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-lg text-center font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        <div className="text-2xl mb-2">➕</div>
                        Add New Product
                      </Link>
                      <Link 
                        to="/orders" 
                        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-center font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        <div className="text-2xl mb-2">📋</div>
                        View My Orders
                      </Link>
                      <Link 
                        to="/products/manage" 
                        className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg text-center font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        <div className="text-2xl mb-2">⚙️</div>
                        Manage Products
                      </Link>
                      <Link 
                        to="/messages" 
                        className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg text-center font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                      >
                        <div className="text-2xl mb-2">💬</div>
                        Messages
                      </Link>
                    </div>
                  </div>

                  {/* Logout Section */}
                  <div className="pt-6 border-t border-emerald-200">
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 shadow-lg transform hover:scale-105"
                    >
                      <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                      </svg>
                      Sign Out of Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-emerald-600 text-sm flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Need help? Contact our support team at support@agrilink.fj
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
