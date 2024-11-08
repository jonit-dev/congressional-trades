import React from 'react';
import { format } from 'date-fns';
import { DollarSign, TrendingUp, Calendar, User } from 'lucide-react';
import type { Trade } from '../types';

interface TradeListProps {
  trades: Trade[];
  onSelectTrade: (trade: Trade) => void;
}

export default function TradeList({ trades, onSelectTrade }: TradeListProps) {
  return (
    <div className="space-y-3">
      {trades.map((trade, index) => (
        <div
          key={index}
          onClick={() => onSelectTrade(trade)}
          className="trade-card rounded-lg bg-[#1C2333] border border-gray-700/50 p-4 cursor-pointer hover:bg-[#232B3E] hover:border-blue-500/50"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gray-800">
                <User className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-white">
                  {trade.representative}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    trade.party === 'D' 
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {trade.party}
                  </span>
                  <span className="text-xs text-gray-500">{trade.state}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                {format(new Date(trade.transaction_date), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded bg-gray-800">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                </div>
                <span className="font-mono text-white">
                  {trade.ticker}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded bg-gray-800">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                </div>
                <span className="font-mono">
                  {trade.amount}
                </span>
              </div>
            </div>
            
            <span className={`px-3 py-1 text-xs rounded-full font-medium ${
              trade.type.includes('Purchase')
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {trade.type}
            </span>
          </div>
          
          <p className="mt-2 text-sm text-gray-400 line-clamp-1">
            {trade.asset_description}
          </p>
        </div>
      ))}
    </div>
  );
}