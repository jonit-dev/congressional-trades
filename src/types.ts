export interface Trade {
  representative: string;
  transaction_date: string;
  disclosure_date: string;
  ticker: string;
  asset_description: string;
  type: string;
  amount: string;
  party: string;
  state: string;
  district: string;
}

export interface TradeAnalysis {
  summary: string;
  context: string;
  relatedEvents: string[];
}