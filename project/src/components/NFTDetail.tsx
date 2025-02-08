import React, { useState } from 'react';
import { Heart, Share2, ArrowLeft } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { formatUSDT } from '../lib/utils';

interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  likes: number;
  creator: string;
}

interface NFTDetailProps {
  nft: NFT;
  onBack: () => void;
}

export function NFTDetail({ nft, onBack }: NFTDetailProps) {
  const { isConnected, balance } = useWallet();
  const [isLiked, setIsLiked] = useState(false);

  const handleBuy = () => {
    // Implement buy functionality
  };

  const handleShare = () => {
    navigator.share({
      title: nft.name,
      text: nft.description,
      url: window.location.href,
    }).catch(console.error);
  };

  return (
    <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/50 rounded-xl border border-amber-600/20">
      <div className="p-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <img
              src={nft.image}
              alt={nft.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-amber-400">{nft.name}</h1>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-colors ${
                      isLiked
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
                    }`}
                  >
                    <Heart className="w-6 h-6" fill={isLiked ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-colors"
                  >
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <p className="text-amber-200 mt-2">Created by {nft.creator}</p>
            </div>

            <div className="bg-black/20 rounded-xl p-6">
              <div className="text-amber-200 mb-2">Current Price</div>
              <div className="text-3xl font-bold text-amber-400 mb-4">
                {formatUSDT(nft.price)} USDT
              </div>
              {isConnected ? (
                <button
                  onClick={handleBuy}
                  disabled={BigInt(balance) < BigInt(nft.price)}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    BigInt(balance) >= BigInt(nft.price)
                      ? 'bg-amber-500 hover:bg-amber-600 text-black'
                      : 'bg-amber-500/50 text-black/50 cursor-not-allowed'
                  }`}
                >
                  {BigInt(balance) >= BigInt(nft.price) ? 'Buy Now' : 'Insufficient Balance'}
                </button>
              ) : (
                <div className="text-center text-amber-200">
                  Connect your wallet to purchase this NFT
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-amber-400 mb-2">Description</h2>
              <p className="text-amber-200">{nft.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}