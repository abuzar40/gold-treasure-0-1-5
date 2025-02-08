import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

export function MintNFT() {
  const { isConnected } = useWallet();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement minting functionality
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <p className="text-amber-200 text-lg">Connect your wallet to mint NFTs</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-amber-400 font-semibold mb-2">NFT Image</label>
          <div className="relative">
            {preview ? (
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setPreview(null);
                  }}
                  className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  ×
                </button>
              </div>
            ) : (
              <label className="block aspect-square rounded-xl border-2 border-dashed border-amber-600/40 hover:border-amber-500/60 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-400">
                  <Upload className="w-12 h-12 mb-2" />
                  <div className="text-sm">Click to upload image</div>
                </div>
              </label>
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-amber-400 font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/20 border border-amber-600/20 rounded-lg px-4 py-2 text-amber-200 placeholder-amber-200/50 focus:outline-none focus:border-amber-500/40"
            placeholder="Enter NFT name"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-amber-400 font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full bg-black/20 border border-amber-600/20 rounded-lg px-4 py-2 text-amber-200 placeholder-amber-200/50 focus:outline-none focus:border-amber-500/40"
            placeholder="Describe your NFT"
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-amber-400 font-semibold mb-2">
            Price (USDT)
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.000001"
            className="w-full bg-black/20 border border-amber-600/20 rounded-lg px-4 py-2 text-amber-200 placeholder-amber-200/50 focus:outline-none focus:border-amber-500/40"
            placeholder="Enter price in USDT"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={!name || !description || !price || !image}
            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
              name && description && price && image
                ? 'bg-amber-500 hover:bg-amber-600 text-black'
                : 'bg-amber-500/50 text-black/50 cursor-not-allowed'
            }`}
          >
            Mint NFT
          </button>
        </div>
      </div>
    </form>
  );
}