"use client";

import { initWaaP } from "@human.tech/waap-sdk";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as viemChains from "viem/chains";

import type { PropsWithChildren } from "react";
import type { Chain } from "viem";

// Helper to get chain object from chainId
function getChainFromId(chainId: number | undefined): Chain | undefined {
  if (!chainId) {
    return undefined;
  }
  return Object.values(viemChains).find((chain) => chain.id === chainId);
}

/**
 * WaaP context state and methods
 */
export interface WaaPContextType {
  // Connection state
  isInitialized: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnected: boolean;

  // Account data
  address: `0x${string}` | undefined;
  chainId: number | undefined;
  chain: Chain | undefined;

  // Methods
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (chainId: number) => Promise<void>;
  signMessage: (message: string) => Promise<string>;

  // Signer access
  getSigner: () => Promise<JsonRpcSigner | undefined>;
}

const WaaPContext = createContext<WaaPContextType | undefined>(undefined);

// Type declaration for window.waap
declare global {
  interface Window {
    waap?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      login: () => Promise<void>;
      logout: () => Promise<void>;
      on: (event: string, handler: (data: unknown) => void) => void;
      removeListener: (event: string, handler: (data: unknown) => void) => void;
    };
  }
}

/**
 * WaaP Provider - manages wallet connection via Holonym WAAP
 */
export const WaaPProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [address, setAddress] = useState<`0x${string}` | undefined>(undefined);
  const [chainId, setChainId] = useState<number | undefined>(undefined);

  // Handle account changes
  const handleAccountsChanged = useCallback((accounts: unknown) => {
    const accountList = accounts as string[];
    if (accountList.length === 0) {
      setIsConnected(false);
      setAddress(undefined);
    } else {
      setIsConnected(true);
      setAddress(accountList[0] as `0x${string}`);
    }
  }, []);

  // Handle chain changes
  const handleChainChanged = useCallback((newChainId: unknown) => {
    const chainIdHex = newChainId as string;
    setChainId(parseInt(chainIdHex, 16));
  }, []);

  // Handle disconnect
  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
    setAddress(undefined);
    setChainId(undefined);
  }, []);

  // Initialize WAAP on mount
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") {
      return;
    }

    const init = async () => {
      try {
        // Check if WAAP is already available (extension installed)
        if (window.waap) {
          // Try to get existing accounts
          const accounts = (await window.waap.request({ method: "eth_accounts" })) as string[];
          if (accounts.length > 0) {
            setAddress(accounts[0] as `0x${string}`);
            setIsConnected(true);
          }

          // Get current chain
          const currentChainId = (await window.waap.request({ method: "eth_chainId" })) as string;
          setChainId(parseInt(currentChainId, 16));
        } else {
          // Initialize WAAP SDK with timeout
          const initPromise = initWaaP();

          const timeoutPromise = new Promise<void>((_, reject) => {
            setTimeout(() => {
              reject(new Error("WAAP initialization timeout"));
            }, 15000);
          });

          await Promise.race([initPromise, timeoutPromise]);
        }

        // Check for existing connection after init - re-check window.waap since initWaaP may have set it
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (window.waap) {
          const accounts = (await window.waap.request({ method: "eth_accounts" })) as string[];
          if (accounts.length > 0) {
            setAddress(accounts[0] as `0x${string}`);
            setIsConnected(true);
          }

          const currentChainId = (await window.waap.request({ method: "eth_chainId" })) as string;
          setChainId(parseInt(currentChainId, 16));
        }

        setIsInitialized(true);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to initialize WAAP:", error);
        setIsInitialized(true); // Mark as initialized even on error to not block UI
      }
    };

    init();
  }, []);

  // Set up event listeners
  useEffect(() => {
    if (typeof window === "undefined" || !window.waap) {
      return undefined;
    }

    window.waap.on("accountsChanged", handleAccountsChanged);
    window.waap.on("chainChanged", handleChainChanged);
    window.waap.on("disconnect", handleDisconnect);

    return () => {
      if (window.waap) {
        window.waap.removeListener("accountsChanged", handleAccountsChanged);
        window.waap.removeListener("chainChanged", handleChainChanged);
        window.waap.removeListener("disconnect", handleDisconnect);
      }
    };
  }, [handleAccountsChanged, handleChainChanged, handleDisconnect, isInitialized]);

  // Connect to WAAP
  const connect = useCallback(async () => {
    if (!isInitialized || !window.waap) {
      throw new Error("WAAP not initialized");
    }

    setIsConnecting(true);
    try {
      await window.waap.login();
      const accounts = (await window.waap.request({ method: "eth_requestAccounts" })) as string[];
      if (accounts.length > 0) {
        setAddress(accounts[0] as `0x${string}`);
        setIsConnected(true);
      }

      const currentChainId = (await window.waap.request({ method: "eth_chainId" })) as string;
      setChainId(parseInt(currentChainId, 16));
    } finally {
      setIsConnecting(false);
    }
  }, [isInitialized]);

  // Disconnect from WAAP
  const disconnect = useCallback(async () => {
    if (!window.waap) {
      return;
    }

    try {
      await window.waap.logout();
    } catch {
      // Force clear state even if logout fails
    }
    setIsConnected(false);
    setAddress(undefined);
    setChainId(undefined);
  }, []);

  // Switch chain
  const switchChain = useCallback(
    async (targetChainId: number) => {
      if (!window.waap || !isConnected) {
        throw new Error("Not connected");
      }

      const chainIdHex = `0x${targetChainId.toString(16)}`;
      try {
        await window.waap.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainIdHex }],
        });
      } catch (error) {
        // If chain not added, try to add it
        const err = error as { code?: number };
        if (err.code === 4902) {
          // Chain not added - would need to add chain info here
          // For now, re-throw the error
          throw error;
        }
        throw error;
      }
    },
    [isConnected],
  );

  // Sign message
  const signMessage = useCallback(
    async (message: string): Promise<string> => {
      if (!window.waap || !isConnected || !address) {
        throw new Error("Not connected");
      }

      const signature = (await window.waap.request({
        method: "personal_sign",
        params: [message, address],
      })) as string;

      return signature;
    },
    [isConnected, address],
  );

  // Get ethers signer
  const getSigner = useCallback(async (): Promise<JsonRpcSigner | undefined> => {
    if (!window.waap || !isConnected) {
      return undefined;
    }

    const provider = new BrowserProvider(window.waap as unknown as Eip1193Provider);
    return provider.getSigner();
  }, [isConnected]);

  // Get chain object from chainId
  const chain = useMemo(() => getChainFromId(chainId), [chainId]);

  const value = useMemo(
    () => ({
      isInitialized,
      isConnected,
      isConnecting,
      isDisconnected: !isConnected,
      address,
      chainId,
      chain,
      connect,
      disconnect,
      switchChain,
      signMessage,
      getSigner,
    }),
    [
      isInitialized,
      isConnected,
      isConnecting,
      address,
      chainId,
      chain,
      connect,
      disconnect,
      switchChain,
      signMessage,
      getSigner,
    ],
  );

  return <WaaPContext.Provider value={value}>{children}</WaaPContext.Provider>;
};

/**
 * Hook to access WaaP context
 */
export const useWaaP = (): WaaPContextType => {
  const context = useContext(WaaPContext);
  if (!context) {
    throw new Error("useWaaP must be used within a WaaPProvider");
  }
  return context;
};

// Re-export for convenience - provides similar API to wagmi's useAccount
export const useAccount = (): Pick<
  WaaPContextType,
  "address" | "isConnected" | "isConnecting" | "isDisconnected" | "chainId" | "chain"
> => {
  const { address, isConnected, isConnecting, isDisconnected, chainId, chain } = useWaaP();
  return { address, isConnected, isConnecting, isDisconnected, chainId, chain };
};

// Type for EIP-1193 provider
interface Eip1193Provider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}
