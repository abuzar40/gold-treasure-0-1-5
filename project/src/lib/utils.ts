import { ethers } from 'ethers';

// Format USDT amount (6 decimals)
export function formatUSDT(amount: string): string {
  return ethers.formatUnits(amount, 6);
}