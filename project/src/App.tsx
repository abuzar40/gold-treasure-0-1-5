import React, { useState } from 'react';
import { Coins, TrendingUp, Trophy, ArrowRightLeft } from 'lucide-react';
import { WalletButton } from './components/WalletButton';
import { NFTGrid } from './components/NFTGrid';
import { NFTDetail } from './components/NFTDetail';
import { MintNFT } from './components/MintNFT';
import { AutoMining } from './components/AutoMining';
import { MemeCoinTrading } from './components/MemeCoinTrading';

// Mock data for demonstration
const mockNFTs = [
  {
    id: '1',
    name: 'Golden Dragon',
    description: 'A majestic dragon crafted from pure digital gold.',
    image: 'https://images.unsplash.com/photo-1599054802207-91d346adc120?w=800&q=80',
    price: '5000000', // 5 USDT
    likes: 42,
    creator: '@goldsmith',
  },
  {
    id: '2',
    name: 'Crystal Cave',
    description: 'A mysterious cave filled with precious crystals.',
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&q=80',
    price: '3000000', // 3 USDT
    likes: 28,
    creator: '@explorer',
  },
  {
    id: '3',
    name: 'Ancient Relic',
    description: 'A powerful artifact from a long-lost civilization.',
    image: 'https://images.unsplash.com/photo-1602000733170-5f6fb0d2f35e?w=800&q=80',
    price: '7000000', // 7 USDT
    likes: 35,
    creator: '@historian',
  },
];

type View = 'grid' | 'detail' | 'mint' | 'mining' | 'trading';

function App() {
  const [view, setView] = useState<View>('grid');
  const [selectedNFT, setSelectedNFT] = useState(mockNFTs[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-amber-600/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Coins className="w-8 h-8 text-amber-400" />
              <h1 className="text-2xl font-bold text-amber-400">Gold Treasure</h1>
            </div>
            <WalletButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            <button
              onClick={() => setView('grid')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                view === 'grid'
                  ? 'bg-amber-500 text-black'
                  : 'text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              Browse NFTs
            </button>
            <button
              onClick={() => setView('mint')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                view === 'mint'
                  ? 'bg-amber-500 text-black'
                  : 'text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              Mint NFT
            </button>
            <button
              onClick={() => setView('mining')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                view === 'mining'
                  ? 'bg-amber-500 text-black'
                  : 'text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              Auto Mining
            </button>
            <button
              onClick={() => setView('trading')}
              className={`px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                view === 'trading'
                  ? 'bg-amber-500 text-black'
                  : 'text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              Meme Coins
            </button>
          </div>
        </div>

        {/* Content */}
        {view === 'grid' && (
          <NFTGrid
            nfts={mockNFTs}
            onNFTClick={(nft) => {
              setSelectedNFT(nft);
              setView('detail');
            }}
          />
        )}

        {view === 'detail' && (
          <NFTDetail
            nft={selectedNFT}
            onBack={() => setView('grid')}
          />
        )}

        {view === 'mint' && <MintNFT />}

        {view === 'mining' && <AutoMining />}

        {view === 'trading' && <MemeCoinTrading />}

        {/* Features Grid */}
        {view === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {/* Auto-Mining Card */}
            <div
              onClick={() => setView('mining')}
              className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-xl p-6 border border-amber-600/20 hover:border-amber-500/40 transition-colors cursor-pointer"
            >
              <div className="bg-amber-400/10 p-3 rounded-lg w-fit mb-4">
                <TrendingUp className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-amber-400 mb-2">Auto-Mining</h3>
              <p className="text-amber-200">
                Set up your treasures to mine automatically and earn rewards while you sleep.
              </p>
            </div>

            {/* Meme Coins Card */}
            <div
              onClick={() => setView('trading')}
              className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-xl p-6 border border-amber-600/20 hover:border-amber-500/40 transition-colors cursor-pointer"
            >
              <div className="bg-amber-400/10 p-3 rounded-lg w-fit mb-4">
                <ArrowRightLeft className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-amber-400 mb-2">Meme Coins</h3>
              <p className="text-amber-200">
                Trade popular meme coins using USDT. Buy low, sell high!
              </p>
            </div>

            {/* Marketplace Card */}
            <div className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-xl p-6 border border-amber-600/20 hover:border-amber-500/40 transition-colors cursor-pointer">
              <div className="bg-amber-400/10 p-3 rounded-lg w-fit mb-4">
                <Coins className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-amber-400 mb-2">Marketplace</h3>
              <p className="text-amber-200">
                Trade your treasures in our secure marketplace. Buy, sell, and discover rare items.
              </p>
            </div>

            {/* Leaderboard Card */}
            <div className="bg-gradient-to-br from-amber-900 to-amber-800 rounded-xl p-6 border border-amber-600/20 hover:border-amber-500/40 transition-colors cursor-pointer">
              <div className="bg-amber-400/10 p-3 rounded-lg w-fit mb-4">
                <Trophy className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-amber-400 mb-2">Leaderboard</h3>
              <p className="text-amber-200">
                Compete with other miners and showcase your treasure collection on our leaderboard.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm border-t border-amber-600/20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-amber-200">
            <p>&copy; 2025 Gold Treasure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;