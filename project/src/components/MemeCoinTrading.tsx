import React, { useState } from 'react';
import { ArrowRightLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { formatUSDT } from '../lib/utils';
import { MEME_COINS } from '../lib/constants';

export function MemeCoinTrading() {
  const { isConnected, balance } = useWallet();
  const [selectedCoin, setSelectedCoin] = useState(MEME_COINS[0]);
  const [amount, setAmount] = useState('');
  const [isBuying, setIsBuying] = useState(true);

  const handleTrade = () => {
    // Implement trade functionality
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <p className="text-amber-200 text-lg">Connect your wallet to trade meme coins</p>
      </div>
    );
  }

  const maxAmount = isBuying
    ? Math.floor(Number(formatUSDT(balance)) / Number(formatUSDT(selectedCoin.price)))
    : 100; // Mock balance, replace with actual coin balance

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Trading Card */}
      <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/50 rounded-xl p-6 border border-amber-600/20">
        <div className="space-y-6">
          {/* Trade Type Toggle */}
          <div className="flex rounded-lg overflow-hidden border border-amber-600/20">
            <button
              onClick={() => setIsBuying(true)}
              className={`flex-1 py-3 px-6 font-semibold transition-colors ${
                isBuying
                  ? 'bg-amber-500 text-black'
                  : 'bg-transparent text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setIsBuying(false)}
              className={`flex-1 py-3 px-6 font-semibold transition-colors ${
                !isBuying
                  ? 'bg-amber-500 text-black'
                  : 'bg-transparent text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              Sell
            </button>
          </div>

          {/* Coin Selection */}
          <div>
            <label className="block text-amber-400 font-semibold mb-2">
              Select Meme Coin
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MEME_COINS.map((coin) => (
                <button
                  key={coin.id}
                  onClick={() => setSelectedCoin(coin)}
                  className={`p-4 rounded-lg border transition-colors ${
                    selectedCoin.id === coin.id
                      ? 'border-amber-500 bg-amber-500/20'
                      : 'border-amber-600/20 hover:border-amber-500/40'
                  }`}
                >
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-12 h-12 rounded-full mx-auto mb-2"
                  />
                  <div className="text-center">
                    <div className="font-semibold text-amber-400">{coin.symbol}</div>
                    <div className="text-sm text-amber-200">{formatUSDT(coin.price)} USDT</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-amber-400 font-semibold mb-2">
              Amount ({selectedCoin.symbol})
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                max={maxAmount}
                className="w-full bg-black/20 border border-amber-600/20 rounded-lg px-4 py-2 text-amber-200 placeholder-amber-200/50 focus:outline-none focus:border-amber-500/40"
                placeholder={`Enter amount (max: ${maxAmount})`}
              />
              <button
                onClick={() => setAmount(maxAmount.toString())}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-amber-400 hover:text-amber-300 text-sm"
              >
                MAX
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-black/20 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-amber-200">Price per {selectedCoin.symbol}</span>
              <span className="text-amber-400 font-semibold">
                {formatUSDT(selectedCoin.price)} USDT
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-amber-200">Total</span>
              <span className="text-amber-400 font-semibold">
                {formatUSDT((BigInt(selectedCoin.price) * BigInt(amount || '0')).toString())} USDT
              </span>
            </div>
          </div>

          {/* Trade Button */}
          <button
            onClick={handleTrade}
            disabled={!amount || Number(amount) <= 0 || Number(amount) > maxAmount}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              amount && Number(amount) > 0 && Number(amount) <= maxAmount
                ? 'bg-amber-500 hover:bg-amber-600 text-black'
                : 'bg-amber-500/50 text-black/50 cursor-not-allowed'
            }`}
          >
            {isBuying ? 'Buy' : 'Sell'} {selectedCoin.symbol}
          </button>
        </div>
      </div>

      {/* Market Trends */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MEME_COINS.map((coin) => (
          <div
            key={coin.id}
            className="bg-gradient-to-br from-amber-900/50 to-amber-800/50 rounded-xl p-4 border border-amber-600/20"
          >
            <div className="flex items-center space-x-3">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-semibold text-amber-400">{coin.symbol}</div>
                <div className="text-sm text-amber-200">{coin.name}</div>
              </div>
            </div>
            <div className="mt-3 flex justify-between items-center">
              <span className="text-amber-200">{formatUSDT(coin.price)} USDT</span>
              <div className="flex items-center text-green-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+2.5%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}