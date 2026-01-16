import { JsonRpcSigner } from "ethers";
import { useEffect, useState } from "react";

import { useWaaP } from "~/hooks/useWaaP";

/**
 * Hook to get an ethers.js Signer from WAAP
 * Replaces the previous wagmi-based implementation
 */
export function useEthersSigner(): JsonRpcSigner | undefined {
  const { getSigner, isConnected } = useWaaP();
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>(undefined);

  useEffect(() => {
    if (!isConnected) {
      setSigner(undefined);
      return;
    }

    getSigner()
      .then(setSigner)
      .catch(() => {
        setSigner(undefined);
      });
  }, [isConnected, getSigner]);

  return signer;
}
