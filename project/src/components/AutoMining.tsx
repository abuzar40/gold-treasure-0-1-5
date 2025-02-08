import React, { useState, useEffect } from 'react';
import { TrendingUp, Play, Pause, RefreshCw } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { formatUSDT } from '../lib/utils';
import { MINING_RATES } from '../lib/constants';

export function AutoMining() {
  const { isConnected, balance } = useWallet();
  const [isMining, setIsMining] = useState(false);
  const [miningRate, setMiningRate] = useState(MINING_RATES.BASIC);
  const [earnings, setEarnings] = useState('0');
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval: number | undefined;

    if (isMining) {
      interval = window.setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
        setEarnings((prev) => {
          const hourlyRate = BigInt(miningRate);
          const secondRate = hourlyRate / BigInt(3600);
          return (BigInt(prev) + secondRate).toString();
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isMining, miningRate]);

  const toggleMining = () => {
    setIsMining(!isMining);
  };

  const claimEarnings = () => {
    // Implement claiming functionality
    setEarnings('0');
    setTimeElapsed(0);
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <p className="text-amber-200 text-lg">Connect your wallet to start mining</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Mining Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/50 rounded-xl p-6 border border-amber-600/20">
          <div className="text-amber-200 mb-2">Mining Rate</div>
          <div className="text-2xl font-bold text-amber-400">
            {formatUSDT(miningRate)} USDT/hr
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/50 rounded-xl p-6 border border-amber-600/20">
          <div className="text-amber-200 mb-2">Current Earnings</div>
          <div className="text-2xl font-bold text-amber-400">
            {formatUSDT(earnings)} USDT
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/50 rounded-xl p-6 border border-amber-600/20">
          <div className="text-amber-200 mb-2">Time Elapsed</div>
          <div className="text-2xl font-bold text-amber-400">
            {Math.floor(timeElapsed / 3600)}h {Math.floor((timeElapsed % 3600) / 60)}m {timeElapsed % 60}s
          </div>
        </div>
      </div>

      {/* Mining Controls */}
      <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/50 rounded-xl p-6 border border-amber-600/20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMining}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                isMining
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-amber-500 hover:bg-amber-600 text-black'
              }`}
            >
              {isMining ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Pause Mining</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Start Mining</span>
                </>
              )}
            </button>

            <button
              onClick={claimEarnings}
              disabled={BigInt(earnings) === BigInt(0)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                BigInt(earnings) > BigInt(0)
                  ? 'bg-amber-500 hover:bg-amber-600 text-black'
                  : 'bg-amber-500/50 text-black/50 cursor-not-allowed'
              }`}
            >
              <RefreshCw className="w-5 h-5" />
              <span>Claim Earnings</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={miningRate}
              onChange={(e) => setMiningRate(e.target.value)}
              className="bg-black/20 border border-amber-600/20 rounded-lg px-4 py-2 text-amber-200 focus:outline-none focus:border-amber-500/40"
            >
              <option value={MINING_RATES.BASIC}>Basic (0.1 USDT/hr)</option>
              <option value={MINING_RATES.ADVANCED}>Advanced (0.5 USDT/hr)</option>
              <option value={MINING_RATES.PREMIUM}>Premium (1 USDT/hr)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}