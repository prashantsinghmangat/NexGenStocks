import React from 'react';
import { MarketOverview } from '../components/MarketOverview';
import { MarketMovers } from '../components/MarketMovers';
import { WatchList } from '../components/WatchList';

export const Dashboard: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <MarketMovers />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MarketOverview />
        </div>
        <div>
          <WatchList />
        </div>
      </div>
    </main>
  );
};