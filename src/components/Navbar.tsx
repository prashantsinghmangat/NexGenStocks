import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutGrid, Search } from 'lucide-react';
import { RootState } from '../store/store';

export const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { stocks } = useSelector((state: RootState) => state.stocks);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const foundStock = stocks.find(
      stock => 
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (foundStock) {
      navigate(`/stock/${foundStock.symbol}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <LayoutGrid className="w-8 h-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">NSE Tracker</span>
          </Link>
          
          <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search stocks..."
              />
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};