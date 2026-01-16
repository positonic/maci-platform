import { JsonRpcProvider } from "ethers";
import { useEffect, useState } from "react";

import type { Address } from "viem";

// Use Ethereum mainnet for ENS resolution
const ENS_PROVIDER_URL = "https://eth.llamarpc.com";

interface UseENSResult {
  name: string | null;
  avatar: string | null;
  isLoading: boolean;
}

// Cache for ENS lookups to avoid repeated requests
const ensCache = new Map<string, { name: string | null; avatar: string | null }>();

/**
 * Hook to resolve ENS name and avatar for an address
 * Uses Ethereum mainnet for ENS resolution regardless of connected chain
 */
export function useENS(address: Address | undefined): UseENSResult {
  const [name, setName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!address) {
      setName(null);
      setAvatar(null);
      return;
    }

    // Check cache first
    const cached = ensCache.get(address.toLowerCase());
    if (cached) {
      setName(cached.name);
      setAvatar(cached.avatar);
      return;
    }

    const resolveENS = async () => {
      setIsLoading(true);
      try {
        const provider = new JsonRpcProvider(ENS_PROVIDER_URL);

        // Resolve ENS name
        const ensName = await provider.lookupAddress(address);
        setName(ensName);

        // Resolve avatar if we have a name
        let ensAvatar: string | null = null;
        if (ensName) {
          try {
            ensAvatar = await provider.getAvatar(ensName);
            setAvatar(ensAvatar);
          } catch {
            // Avatar resolution can fail, that's ok
          }
        }

        // Cache the result
        ensCache.set(address.toLowerCase(), { name: ensName, avatar: ensAvatar });
      } catch {
        // ENS resolution failed, use address
        setName(null);
        setAvatar(null);
        ensCache.set(address.toLowerCase(), { name: null, avatar: null });
      } finally {
        setIsLoading(false);
      }
    };

    resolveENS();
  }, [address]);

  return { name, avatar, isLoading };
}

/**
 * Format address for display - shows ENS name if available, otherwise truncated address
 */
export function formatAddressOrENS(address: string | undefined, ensName: string | null): string {
  if (ensName) {
    return ensName;
  }
  if (!address) {
    return "";
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
