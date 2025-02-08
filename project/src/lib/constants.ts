// USDT Contract Address (Ethereum Mainnet)
export const USDT_CONTRACT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

// USDT Contract ABI (minimal for transfer)
export const USDT_ABI = [
  'function transfer(address to, uint value) returns (bool)',
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
];

// Minimum deposit amount in USDT (1 USDT)
export const MIN_DEPOSIT = '1000000'; // 6 decimals for USDT

// Minimum withdrawal amount in USDT (50 USDT)
export const MIN_WITHDRAWAL = '50000000'; // 6 decimals for USDT

// Mining rates (USDT per hour)
export const MINING_RATES = {
  BASIC: '100000', // 0.1 USDT
  ADVANCED: '500000', // 0.5 USDT
  PREMIUM: '1000000', // 1 USDT
};

// Meme coins
export const MEME_COINS = [
  {
    id: 'doge',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: '500000', // 0.5 USDT
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80',
  },
  {
    id: 'shib',
    name: 'Shiba Inu',
    symbol: 'SHIB',
    price: '300000', // 0.3 USDT
    image: 'https://images.unsplash.com/photo-1628099368512-748d8e8f5b12?w=800&q=80',
  },
  {
    id: 'pepe',
    name: 'Pepe Coin',
    symbol: 'PEPE',
    price: '200000', // 0.2 USDT
    image: 'https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=800&q=80',
  },
];