import type { Trade, TradeAnalysis } from '../types';

export async function fetchTrades(): Promise<Trade[]> {
  const response = await fetch('https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json');
  if (!response.ok) {
    throw new Error('Failed to fetch trades');
  }
  const data = await response.json();
  return data.slice(0, 50); // Latest 50 trades
}

export async function getTradeAnalysis(ticker: string): Promise<TradeAnalysis> {
  // In a real app, this would call your backend API that interfaces with OpenAI
  return {
    summary: "Based on recent trading patterns, there appears to be increased congressional activity in technology sector stocks, particularly following recent AI regulation discussions.",
    context: "This trade occurred shortly after the Senate hearing on AI regulation and cybersecurity measures. The timing coincides with several key policy discussions around technology sector oversight.",
    relatedEvents: [
      "Senate AI Regulation Hearing - March 2024",
      "Proposed Tech Sector Oversight Bill",
      "Congressional Budget Office Report on Tech Industry Impact"
    ]
  };
}