import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Star, StarOff } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Stock } from '../types/stock';
import { RootState } from '../store/store';
import { addToWatchlist, removeFromWatchlist } from '../store/stockSlice';

interface StockCardProps {
  stock: Stock;
}

export const StockCard: React.FC<StockCardProps> = ({ stock }) => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state: RootState) => state.stocks.watchlist);
  const isWatchlisted = watchlist.some(item => item.symbol === stock.symbol);

  const toggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWatchlisted) {
      dispatch(removeFromWatchlist(stock.symbol));
    } else {
      dispatch(addToWatchlist(stock.symbol));
    }
  };

  return (
    <Link to={`/stock/${stock.symbol}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold">{stock.symbol}</h3>
            <p className="text-gray-600 text-sm">{stock.name}</p>
          </div>
          <button
            onClick={toggleWatchlist}
            className="text-gray-400 hover:text-yellow-500 transition-colors"
          >
            {isWatchlisted ? <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" /> : <StarOff className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex justify-between items-end mt-4">
          <div className="text-2xl font-bold">₹{stock.price.toFixed(2)}</div>
          <div className={`flex items-center ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stock.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            <span className="font-medium">
              {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};