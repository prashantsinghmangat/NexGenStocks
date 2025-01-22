import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Stock, WatchlistItem } from '../types/stock';
import { fetchQuote, fetchStockData } from '../services/api';

interface StockState {
  stocks: Stock[];
  watchlist: WatchlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: StockState = {
  stocks: [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', price: 0, change: 0, changePercent: 0 },
    { symbol: 'TCS', name: 'Tata Consultancy Services Ltd.', price: 0, change: 0, changePercent: 0 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd.', price: 0, change: 0, changePercent: 0 },
    { symbol: 'INFY', name: 'Infosys Ltd.', price: 0, change: 0, changePercent: 0 },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd.', price: 0, change: 0, changePercent: 0 },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd.', price: 0, change: 0, changePercent: 0 },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd.', price: 0, change: 0, changePercent: 0 },
    { symbol: 'BAJFINANCE', name: 'Bajaj Finance Ltd.', price: 0, change: 0, changePercent: 0 },
    { symbol: 'WIPRO', name: 'Wipro Ltd.', price: 0, change: 0, changePercent: 0 }
  ],
  watchlist: [],
  loading: false,
  error: null,
};

export const fetchStockQuote = createAsyncThunk(
  'stocks/fetchQuote',
  async (symbol: string) => {
    const data = await fetchQuote(symbol);
    return data['Global Quote'];
  }
);

export const fetchStockHistory = createAsyncThunk(
  'stocks/fetchHistory',
  async (symbol: string) => {
    const data = await fetchStockData(symbol);
    return data['Time Series (Daily)'];
  }
);

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<string>) => {
      if (!state.watchlist.find(item => item.symbol === action.payload)) {
        state.watchlist.push({
          symbol: action.payload,
          addedAt: new Date().toISOString(),
        });
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.watchlist = state.watchlist.filter(item => item.symbol !== action.payload);
    },
    updateStockPrice: (state, action: PayloadAction<{ 
      symbol: string; 
      price: number;
      change: number;
      changePercent: number;
    }>) => {
      const stock = state.stocks.find(s => s.symbol === action.payload.symbol);
      if (stock) {
        stock.price = action.payload.price;
        stock.change = action.payload.change;
        stock.changePercent = action.payload.changePercent;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockQuote.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockQuote.fulfilled, (state, action) => {
        state.loading = false;
        const quote = action.payload;
        if (quote) {
          const symbol = quote['01. symbol'].replace('.BSE', '');
          const stock = state.stocks.find(s => s.symbol === symbol);
          if (stock) {
            stock.price = parseFloat(quote['05. price']);
            stock.change = parseFloat(quote['09. change']);
            stock.changePercent = parseFloat(quote['10. change percent'].replace('%', ''));
          }
        }
      })
      .addCase(fetchStockQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch quote';
      });
  },
});

export const { addToWatchlist, removeFromWatchlist, updateStockPrice } = stockSlice.actions;
export default stockSlice.reducer;