import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart2 } from 'lucide-react';
import { fetchStockHistory, fetchStockQuote } from '../store/stockSlice';
import { AppDispatch } from '../store/store';

export const StockDetails: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [chartData, setChartData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const stock = useSelector((state: RootState) => 
    state.stocks.stocks.find(s => s.symbol === symbol)
  );
  const loading = useSelector((state: RootState) => state.stocks.loading);

  useEffect(() => {
    if (symbol) {
      dispatch(fetchStockQuote(symbol));
      dispatch(fetchStockHistory(symbol))
        .unwrap()
        .then((data) => {
          if (!data) {
            setError('No historical data available');
            return;
          }
          try {
            const formattedData = Object.entries(data).map(([date, values]: [string, any]) => ({
              date,
              price: parseFloat(values['4. close']),
              volume: parseInt(values['5. volume'])
            })).reverse();
            setChartData(formattedData);
          } catch (err) {
            console.error('Error processing data:', err);
            setError('Error processing historical data');
          }
        })
        .catch((err) => {
          console.error('Error fetching data:', err);
          setError('Failed to fetch historical data');
        });
    }
  }, [symbol, dispatch]);

  if (!stock) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg text-gray-600">Stock not found</p>
        </div>
      </div>
    );
  }

  if (loading && chartData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const getMinMaxPrices = () => {
    if (chartData.length === 0) return { min: stock.price * 0.9, max: stock.price * 1.1 };
    return {
      min: Math.min(...chartData.map(d => d.price)),
      max: Math.max(...chartData.map(d => d.price))
    };
  };

  const { min: minPrice, max: maxPrice } = getMinMaxPrices();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{stock.name}</h1>
            <p className="text-lg text-gray-600">{stock.symbol}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">₹{stock.price.toFixed(2)}</div>
            <div className={`flex items-center justify-end ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stock.change >= 0 ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />}
              <span className="font-medium">
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center text-gray-600 mb-2">
              <Activity className="w-5 h-5 mr-2" />
              <span>Volume</span>
            </div>
            <div className="text-xl font-semibold">
              {chartData[0]?.volume?.toLocaleString() || 'N/A'}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center text-gray-600 mb-2">
              <DollarSign className="w-5 h-5 mr-2" />
              <span>Market Cap</span>
            </div>
            <div className="text-xl font-semibold">
              ₹{((stock.price * (Math.random() * 1000 + 1000)).toFixed(2))}Cr
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center text-gray-600 mb-2">
              <BarChart2 className="w-5 h-5 mr-2" />
              <span>52W Range</span>
            </div>
            <div className="text-xl font-semibold">
              ₹{minPrice.toFixed(2)} - ₹{maxPrice.toFixed(2)}
            </div>
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Price Chart</h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Area type="monotone" dataKey="price" stroke="#3B82F6" fillOpacity={1} fill="url(#colorPrice)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Volume</h2>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="volume" fill="#E5E7EB" stroke="#9CA3AF" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};