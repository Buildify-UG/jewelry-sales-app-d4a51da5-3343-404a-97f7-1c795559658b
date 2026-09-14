import { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Diamond Elegance Ring',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    category: 'Rings',
    rating: 4.9,
    description: 'Stunning 18k white gold ring with 1.5ct diamond'
  },
  {
    id: 2,
    name: 'Pearl Pendant Necklace',
    price: 899,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    category: 'Necklaces',
    rating: 4.8,
    description: 'Elegant South Sea pearl pendant on 14k gold chain'
  },
  {
    id: 3,
    name: 'Sapphire Stud Earrings',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    category: 'Earrings',
    rating: 4.7,
    description: 'Certified blue sapphire studs in white gold'
  },
  {
    id: 4,
    name: 'Gold Bangle Bracelet',
    price: 599,
    image: 'https://images.unsplash.com/photo-1515562141207-6811bcb33ce7?w=400&h=400&fit=crop',
    category: 'Bracelets',
    rating: 4.6,
    description: 'Classic 22k gold bangle with intricate design'
  },
  {
    id: 5,
    name: 'Emerald Cocktail Ring',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
    category: 'Rings',
    rating: 5.0,
    description: 'Rare 2.5ct emerald with diamond halo'
  },
  {
    id: 6,
    name: 'Vintage Chain Necklace',
    price: 449,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
    category: 'Necklaces',
    rating: 4.5,
    description: 'Timeless 14k gold chain, 18 inches'
  },
];

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev =>
        prev.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const categories = ['Rings', 'Necklaces', 'Earrings', 'Bracelets'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-amber-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">✨</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                Amazing Grace
              </h1>
            </div>

            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jewelry..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 hover:bg-amber-50 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {!showCart && !showCheckout && (
          <div className="mb-12 rounded-2xl overflow-hidden bg-gradient-to-r from-amber-900 to-amber-700 text-white p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Timeless Elegance</h2>
            <p className="text-lg text-amber-100 max-w-2xl mx-auto">
              Discover our exquisite collection of handcrafted jewelry, each piece telling a story of luxury and sophistication.
            </p>
          </div>
        )}

        {/* Category Filter */}
        {!showCart && !showCheckout && (
          <div className="mb-8 flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-amber-700 text-white shadow-lg'
                  : 'bg-white text-amber-700 border-2 border-amber-200 hover:border-amber-400'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-700 text-white shadow-lg'
                    : 'bg-white text-amber-700 border-2 border-amber-200 hover:border-amber-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Products Grid */}
          {!showCart && !showCheckout && (
            <>
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="relative overflow-hidden bg-gray-200 h-64">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-amber-700">
                        ${product.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-amber-600">
                        ★ {product.rating}
                      </div>
                    </div>
                    <Button
                      onClick={() => addToCart(product)}
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-2 rounded-lg transition-all"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Cart View */}
          {showCart && !showCheckout && (
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">Shopping Cart</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-8">
                      {cart.map(item => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">${item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-semibold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900">
                              ${(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 hover:bg-red-100 rounded transition-colors"
                          >
                            <X className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t-2 border-gray-200 pt-6">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-semibold text-gray-900">Total:</span>
                        <span className="text-3xl font-bold text-amber-700">
                          ${cartTotal.toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() => setShowCheckout(true)}
                        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 rounded-lg transition-all mb-3"
                      >
                        Proceed to Checkout
                      </button>
                      <button
                        onClick={() => setShowCart(false)}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Checkout View */}
          {showCheckout && (
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h2>

                <div className="space-y-6 mb-8">
                  {/* Order Summary */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="border-t border-gray-300 mt-4 pt-4 flex justify-between font-bold text-gray-900">
                      <span>Total:</span>
                      <span className="text-amber-700">${cartTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Shipping Form */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Shipping Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        className="col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Payment Method</h3>
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 mb-4"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      alert(`Order placed! Total: $${cartTotal.toLocaleString()}`);
                      setCart([]);
                      setShowCheckout(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3 rounded-lg transition-all"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-900 to-amber-800 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-2">Amazing Grace</h3>
              <p className="text-amber-100">Crafted with elegance and sophistication.</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Contact Us</h3>
              <p className="text-amber-100">Ho, Anlokudzi</p>
              <p className="text-amber-100">
                <a href="mailto:ayedjeisrael45@gmail.com" className="hover:text-white transition-colors">
                  ayedjeisrael45@gmail.com
                </a>
              </p>
              <p className="text-amber-100">
                <a href="tel:0540929660" className="hover:text-white transition-colors">
                  0540929660
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">Hours</h3>
              <p className="text-amber-100">Mon - Fri: 9AM - 6PM</p>
              <p className="text-amber-100">Sat - Sun: 10AM - 5PM</p>
            </div>
          </div>
          <div className="border-t border-amber-700 pt-6 text-center">
            <p className="text-amber-100">© 2024 Amazing Grace. Crafted with elegance.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
