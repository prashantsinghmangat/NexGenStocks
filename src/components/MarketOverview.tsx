import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { StockCard } from './StockCard';
import { LineChart, BarChart } from 'lucide-react';
import { fetchStockQuote } from '../store/stockSlice';
import { AppDispatch } from '../store/store';

export const MarketOverview: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stocks, loading } = useSelector((state: RootState) => state.stocks);
  const marketTrend = stocks.reduce((acc, stock) => acc + stock.changePercent, 0) / stocks.length;

  useEffect(() => {
    // Fetch initial data for all stocks
    stocks.forEach(stock => {
      dispatch(fetchStockQuote(stock.symbol));
    });

    // Set up interval for real-time updates
    const interval = setInterval(() => {
      stocks.forEach(stock => {
        dispatch(fetchStockQuote(stock.symbol));
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading && stocks.every(stock => stock.price === 0)) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Market Overview</h2>
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <LineChart className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <BarChart className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <div className={`text-2xl font-bold ${marketTrend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {marketTrend >= 0 ? '+' : ''}{marketTrend.toFixed(2)}%
          </div>
          <span className="ml-2 text-gray-600">Market Trend</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map(stock => (
          <StockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  );
};