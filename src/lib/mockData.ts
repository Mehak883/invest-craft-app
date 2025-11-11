export interface Asset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  image: string;
}

export interface PortfolioHolding {
  asset: Asset;
  quantity: number;
  avgBuyPrice: number;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell';
  asset: Asset;
  quantity: number;
  price: number;
  total: number;
  timestamp: Date;
}

export const mockAssets: Asset[] = [
  {
    id: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 43250.50,
    change24h: 2.45,
    marketCap: 846000000000,
    volume24h: 28500000000,
    image: '₿'
  },
  {
    id: '2',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2280.75,
    change24h: -1.23,
    marketCap: 274000000000,
    volume24h: 15200000000,
    image: 'Ξ'
  },
  {
    id: '3',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 178.50,
    change24h: 1.85,
    marketCap: 2800000000000,
    volume24h: 52000000000,
    image: ''
  },
  {
    id: '4',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 141.20,
    change24h: 0.95,
    marketCap: 1750000000000,
    volume24h: 28000000000,
    image: '🔍'
  },
  {
    id: '5',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 238.45,
    change24h: -2.15,
    marketCap: 756000000000,
    volume24h: 95000000000,
    image: '⚡'
  },
];

export const generateChartData = (basePrice: number, days: number = 30) => {
  const data = [];
  let price = basePrice;
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Random walk with slight upward bias
    const change = (Math.random() - 0.48) * (basePrice * 0.02);
    price = Math.max(price + change, basePrice * 0.8);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: Number(price.toFixed(2)),
    });
  }

  return data;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatLargeNumber = (value: number): string => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return formatCurrency(value);
};

export const formatPercentage = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};
