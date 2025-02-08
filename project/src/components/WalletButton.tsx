import React from 'react';
import { Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { formatUSDT } from '../lib/utils';

export function WalletButton() {
  const { account, balance, connect, isConnected } = useWallet();

  if (isConnected && account) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-amber-200">
          <span className="block text-sm">Balance</span>
          <span className="font-semibold">{formatUSDT(balance)} USDT</span>
        </div>
        <button className="flex items-center space-x-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-lg">
          <Wallet className="w-5 h-5" />
          <span>{account.slice(0, 6)}...{account.slice(-4)}</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg transition-colors"
    >
      <Wallet className="w-5 h-5" />
      <span>Connect Wallet</span>
    </button>
  );
}