import { config } from "~/config";
import { useWaaP } from "~/hooks/useWaaP";

export interface IUseIsCorrectNetworkReturn {
  isCorrectNetwork: boolean;
  correctNetwork: typeof config.network;
}

export function useIsCorrectNetwork(): IUseIsCorrectNetworkReturn {
  const { isConnected, chainId } = useWaaP();

  const isCorrectNetwork = isConnected && chainId === config.network.id;

  return {
    isCorrectNetwork,
    correctNetwork: config.network,
  };
}
