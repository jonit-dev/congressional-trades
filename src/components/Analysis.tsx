import React from 'react';
import { Brain, Lightbulb, Link } from 'lucide-react';
import type { TradeAnalysis } from '../types';

interface AnalysisProps {
  analysis: TradeAnalysis | undefined;
  isLoading: boolean;
}

export default function Analysis({ analysis, isLoading }: AnalysisProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg bg-[#1C2333] border border-gray-700 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="rounded-lg bg-[#1C2333] border border-gray-700 p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-purple-500/20">
            <Brain className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-lg font-medium text-white">
            AI Analysis
          </h3>
        </div>
        <p className="text-gray-300 leading-relaxed">
          {analysis.summary}
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-amber-500/20">
            <Lightbulb className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-lg font-medium text-white">
            Context
          </h3>
        </div>
        <p className="text-gray-300 leading-relaxed">
          {analysis.context}
        </p>
      </div>

      {analysis.relatedEvents.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Link className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-white">
              Related Events
            </h3>
          </div>
          <ul className="space-y-2">
            {analysis.relatedEvents.map((event, index) => (
              <li 
                key={index}
                className="flex items-center space-x-2 text-gray-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span>{event}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}