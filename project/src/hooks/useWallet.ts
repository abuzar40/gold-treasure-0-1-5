import { useState, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';
import { USDT_CONTRACT_ADDRESS, USDT_ABI } from '../lib/constants';

export function useWallet() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  // Initialize provider and account
  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        // Get initial account
        try {
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0].address);
            updateBalance(accounts[0].address, provider);
          }
        } catch (error) {
          console.error('Error getting accounts:', error);
        }

        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            updateBalance(accounts[0], provider);
          } else {
            setAccount(null);
            setBalance('0');
          }
        });
      }
    };

    init();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners('accountsChanged');
      }
    };
  }, []);

  // Update USDT balance
  const updateBalance = async (address: string, provider: ethers.BrowserProvider) => {
    try {
      const contract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, provider);
      const balance = await contract.balanceOf(address);
      setBalance(balance.toString());
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  // Connect wallet
  const connect = useCallback(async () => {
    if (!window.ethereum) {
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        if (provider) {
          updateBalance(accounts[0], provider);
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }, [provider]);

  // Deposit USDT
  const deposit = useCallback(async (amount: string) => {
    if (!provider || !account) throw new Error('Wallet not connected');

    const signer = await provider.getSigner();
    const contract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, signer);

    try {
      const tx = await contract.transfer(USDT_CONTRACT_ADDRESS, amount);
      await tx.wait();
      await updateBalance(account, provider);
      return tx.hash;
    } catch (error) {
      console.error('Error depositing USDT:', error);
      throw error;
    }
  }, [provider, account]);

  // Withdraw USDT
  const withdraw = useCallback(async (amount: string) => {
    if (!provider || !account) throw new Error('Wallet not connected');

    const signer = await provider.getSigner();
    const contract = new ethers.Contract(USDT_CONTRACT_ADDRESS, USDT_ABI, signer);

    try {
      const tx = await contract.transfer(account, amount);
      await tx.wait();
      await updateBalance(account, provider);
      return tx.hash;
    } catch (error) {
      console.error('Error withdrawing USDT:', error);
      throw error;
    }
  }, [provider, account]);

  return {
    account,
    balance,
    connect,
    deposit,
    withdraw,
    isConnected: !!account,
  };
}