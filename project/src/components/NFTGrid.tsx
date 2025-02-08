import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';
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

interface NFTGridProps {
  nfts: NFT[];
  onNFTClick: (nft: NFT) => void;
}

export function NFTGrid({ nfts, onNFTClick }: NFTGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {nfts.map((nft) => (
        <div
          key={nft.id}
          className="group bg-gradient-to-br from-amber-900/50 to-amber-800/50 rounded-xl overflow-hidden border border-amber-600/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
        >
          <div className="relative aspect-square">
            <img
              src={nft.image}
              alt={nft.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-amber-200 text-sm">By {nft.creator}</span>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-200 text-sm">{nft.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-amber-400 truncate">{nft.name}</h3>
              <button
                onClick={() => onNFTClick(nft)}
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
            <p className="text-amber-200 text-sm mb-3 line-clamp-2">{nft.description}</p>
            <div className="flex justify-between items-center">
              <div className="text-amber-400">
                <span className="text-sm text-amber-200">Price</span>
                <div className="font-semibold">{formatUSDT(nft.price)} USDT</div>
              </div>
              <button
                onClick={() => onNFTClick(nft)}
                className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}