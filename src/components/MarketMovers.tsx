import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const MarketMovers: React.FC = () => {
  const { stocks } = useSelector((state: RootState) => state.stocks);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated) {
    return null;
  }

  const sortedStocks = [...stocks].sort((a, b) => b.changePercent - a.changePercent);
  const topGainers = sortedStocks.slice(0, 3);
  const topLosers = sortedStocks.reverse().slice(0, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Top Gainers */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
          <h2 className="text-xl font-bold">Top Gainers</h2>
        </div>
        <div className="space-y-4">
          {topGainers.map(stock => (
            <Link
              key={stock.symbol}
              to={`/stock/${stock.symbol}`}
              className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{stock.symbol}</h3>
                  <p className="text-sm text-gray-600">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{stock.price.toFixed(2)}</p>
                  <p className="text-green-500 font-medium">
                    +{stock.changePercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <TrendingDown className="w-6 h-6 text-red-500 mr-2" />
          <h2 className="text-xl font-bold">Top Losers</h2>
        </div>
        <div className="space-y-4">
          {topLosers.map(stock => (
            <Link
              key={stock.symbol}
              to={`/stock/${stock.symbol}`}
              className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{stock.symbol}</h3>
                  <p className="text-sm text-gray-600">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₹{stock.price.toFixed(2)}</p>
                  <p className="text-red-500 font-medium">
                    {stock.changePercent.toFixed(2)}%
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};