import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  location: string;
  category: string;
  farmer_name: string;
  created_at: string;
}

interface User {
  id: string;
  email?: string;
  phone?: string;
  user_metadata: {
    full_name?: string;
  };
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Products', icon: '🌱' },
    { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
    { id: 'fruits', name: 'Fruits', icon: '🍎' },
    { id: 'grains', name: 'Grains', icon: '🌾' },
    { id: 'herbs', name: 'Herbs', icon: '🌿' },
    { id: 'livestock', name: 'Livestock', icon: '🐄' }
  ];

  useEffect(() => {
    const fetchUserAndProducts = async () => {
      try {
        // Get current user
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        if (!currentUser) {
          navigate('/login');
          return;
        }
        setUser(currentUser);

        // Fetch products
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('available', true)
          .order('created_at', { ascending: false })
          .limit(20);

        if (!error && data) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndProducts();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-600 font-medium">Loading your marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-green-700 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L14.5 6.5L19 7.5L15.5 11L16.5 16.5L12 14L7.5 16.5L8.5 11L5 7.5L9.5 6.5L12 2Z"/>
                    <path d="M12 14V22"/>
                    <path d="M8 18H16"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                    AgriLink
                  </h1>
                  <p className="text-xs text-emerald-600 font-medium">Fiji Marketplace</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <span className="text-emerald-600 text-sm font-medium">
                  Welcome, {user?.user_metadata.full_name || user?.email || user?.phone}
                </span>
              </div>
              <button
                onClick={() => navigate('/account')}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border border-emerald-200"
              >
                Account
              </button>
              <button
                onClick={handleLogout}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-emerald-800 mb-6">
            Your Agricultural
            <span className="block bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              Marketplace
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-emerald-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connecting farmers, buyers, and suppliers across the beautiful islands of Fiji
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105">
              Browse Products
            </button>
            <button className="bg-white/80 backdrop-blur-sm hover:bg-white text-emerald-700 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-emerald-200 hover:border-emerald-300 transition-all duration-200 transform hover:scale-105">
              Sell Your Products
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-emerald-700">{products.length}+</div>
              <div className="text-emerald-600 font-medium">Products Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-emerald-700">500+</div>
              <div className="text-emerald-600 font-medium">Farmers Connected</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-emerald-700">15+</div>
              <div className="text-emerald-600 font-medium">Islands Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-heading font-bold text-emerald-800 mb-8 text-center">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-2xl text-center transition-all duration-200 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 text-white shadow-xl'
                    : 'bg-white/80 backdrop-blur-sm text-emerald-700 hover:bg-white border border-emerald-100 hover:border-emerald-200'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="font-semibold text-sm">{category.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h3 className="text-3xl font-heading font-bold text-emerald-800">
              {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
            </h3>
            <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-16 h-16 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L14.5 6.5L19 7.5L15.5 11L16.5 16.5L12 14L7.5 16.5L8.5 11L5 7.5L9.5 6.5L12 2Z"/>
                </svg>
              </div>
              <h4 className="text-2xl font-heading font-bold text-emerald-800 mb-4">No Products Available</h4>
              <p className="text-emerald-600 mb-8 max-w-md mx-auto">
                {selectedCategory === 'all' 
                  ? 'No products are currently available in the marketplace.' 
                  : `No products available in the ${categories.find(c => c.id === selectedCategory)?.name} category.`}
              </p>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:scale-105">
                List Your Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border border-emerald-100">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-heading font-bold text-emerald-800 flex-1 mr-2">
                        {product.name}
                      </h4>
                      <span className="bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-semibold shrink-0">
                        {product.category}
                      </span>
                    </div>
                    
                    <p className="text-emerald-600 text-sm mb-6 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-500 text-sm font-medium">Price:</span>
                        <span className="text-2xl font-bold text-emerald-800">${product.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-500 text-sm font-medium">Available:</span>
                        <span className="font-semibold text-emerald-700">{product.quantity} units</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-500 text-sm font-medium">Location:</span>
                        <span className="font-semibold text-emerald-700">{product.location}</span>
                      </div>
                      {product.farmer_name && (
                        <div className="flex justify-between items-center">
                          <span className="text-emerald-500 text-sm font-medium">Farmer:</span>
                          <span className="font-semibold text-emerald-700">{product.farmer_name}</span>
                        </div>
                      )}
                    </div>
                    
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md">
                      Contact Seller
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-800 to-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L14.5 6.5L19 7.5L15.5 11L16.5 16.5L12 14L7.5 16.5L8.5 11L5 7.5L9.5 6.5L12 2Z"/>
                  <path d="M12 14V22"/>
                  <path d="M8 18H16"/>
                </svg>
              </div>
              <div>
                <span className="text-2xl font-heading font-bold">AgriLink Fiji</span>
                <p className="text-emerald-200 text-sm">Connecting Farmers Across Paradise</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h5 className="font-semibold mb-2">For Farmers</h5>
                <p className="text-emerald-200 text-sm">List your products and reach more buyers</p>
              </div>
              <div>
                <h5 className="font-semibold mb-2">For Buyers</h5>
                <p className="text-emerald-200 text-sm">Find fresh, local produce directly from farmers</p>
              </div>
              <div>
                <h5 className="font-semibold mb-2">For Suppliers</h5>
                <p className="text-emerald-200 text-sm">Connect with the agricultural community</p>
              </div>
            </div>
            <div className="border-t border-emerald-700 pt-6">
              <p className="text-emerald-200 text-sm">
                © 2025 AgriLink Fiji. Proudly serving farmers across Fiji's beautiful islands.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
