import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Search, BarChart3, RefreshCcw, TrendingUp, DollarSign } from 'lucide-react';
import TradeList from './components/TradeList';
import Analysis from './components/Analysis';
import { fetchTrades, getTradeAnalysis } from './services/api';
import type { Trade } from './types';

function App() {
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { 
    data: trades = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery('trades', fetchTrades);

  const { 
    data: analysis,
    isLoading: analysisLoading 
  } = useQuery(
    ['analysis', selectedTrade?.ticker],
    () => selectedTrade ? getTradeAnalysis(selectedTrade.ticker) : null,
    {
      enabled: !!selectedTrade
    }
  );

  const filteredTrades = trades.filter(trade => 
    trade.representative.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalTrades: trades.length,
    purchases: trades.filter(t => t.type.includes('Purchase')).length,
    sales: trades.filter(t => t.type.includes('Sale')).length,
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-gray-100">
      <header className="bg-[#111827]/50 border-b border-gray-800">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Congressional Trades
                </h1>
                <p className="text-xs text-gray-400">Real-time disclosure tracking</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex space-x-4">
                <div className="px-4 py-2 rounded-lg bg-[#1C2333] border border-gray-700">
                  <div className="text-xs text-gray-400">Total Trades</div>
                  <div className="text-lg font-semibold">{stats.totalTrades}</div>
                </div>
                <div className="px-4 py-2 rounded-lg bg-[#1C2333] border border-gray-700">
                  <div className="text-xs text-gray-400">Purchases</div>
                  <div className="text-lg font-semibold text-green-400">{stats.purchases}</div>
                </div>
                <div className="px-4 py-2 rounded-lg bg-[#1C2333] border border-gray-700">
                  <div className="text-xs text-gray-400">Sales</div>
                  <div className="text-lg font-semibold text-red-400">{stats.sales}</div>
                </div>
              </div>
              
              <button
                onClick={() => refetch()}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
          
          <div className="mt-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 rounded-lg bg-[#1C2333] border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search by representative or ticker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-400">Error loading trades. Please try again later.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Trades</h2>
                <div className="text-sm text-gray-400">
                  Showing {filteredTrades.length} trades
                </div>
              </div>
              <div className="h-[calc(100vh-240px)] overflow-y-auto scrollbar-thin">
                <TradeList trades={filteredTrades} onSelectTrade={setSelectedTrade} />
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">AI Analysis</h2>
              <div className="sticky top-6">
                {selectedTrade ? (
                  <Analysis analysis={analysis} isLoading={analysisLoading} />
                ) : (
                  <div className="rounded-lg bg-[#1C2333] border border-gray-700 p-6 text-center">
                    <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">
                      Select a trade to view AI-powered analysis
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;