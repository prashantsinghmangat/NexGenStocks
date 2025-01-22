import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { StockCard } from './StockCard';

export const WatchList: React.FC = () => {
  const { stocks, watchlist } = useSelector((state: RootState) => state.stocks);
  const watchlistedStocks = stocks.filter(stock => 
    watchlist.some(item => item.symbol === stock.symbol)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Watchlist</h2>
      <div className="space-y-4">
        {watchlistedStocks.length === 0 ? (
          <p className="text-gray-500">No stocks in watchlist</p>
        ) : (
          watchlistedStocks.map(stock => (
            <StockCard key={stock.symbol} stock={stock} />
          ))
        )}
      </div>
    </div>
  );
};