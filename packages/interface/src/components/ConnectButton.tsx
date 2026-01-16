import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo } from "react";

import { config } from "~/config";
import { useENS, formatAddressOrENS } from "~/hooks/useENS";
import { useIsMobile } from "~/hooks/useIsMobile";
import { useWaaP } from "~/hooks/useWaaP";

import { Button } from "./ui/Button";
import { Chip } from "./ui/Chip";

interface IConnectedDetailsProps {
  address: `0x${string}`;
  onDisconnect: () => void;
  isMobile: boolean;
}

const ConnectedDetails = ({ address, onDisconnect, isMobile }: IConnectedDetailsProps) => {
  const { name: ensName } = useENS(address);
  const displayName = isMobile ? null : formatAddressOrENS(address, ensName);

  return (
    <div>
      <div className="flex gap-2 text-white">
        <Chip color="neutral" onClick={onDisconnect}>
          <span className="font-sans text-base font-bold leading-none">{displayName}</span>

          <Image alt="dropdown" height="18" src="/dropdown.svg" width="18" />
        </Chip>
      </div>
    </div>
  );
};

interface IConnectButtonProps {
  showMobile: boolean;
}

const ConnectButton = ({ showMobile }: IConnectButtonProps): JSX.Element | null => {
  const isMobile = useIsMobile();
  const { address, isConnected, isConnecting, isInitialized, chainId, connect, disconnect, switchChain } = useWaaP();

  const isShow = useMemo(() => showMobile === isMobile, [isMobile, showMobile]);

  if (!isShow) {
    return null;
  }

  // Show loading state while WAAP is initializing
  if (!isInitialized) {
    return (
      <Button suppressHydrationWarning variant="secondary" disabled>
        <p>Loading...</p>
      </Button>
    );
  }

  // Not connected - show connect button
  if (!isConnected || !address) {
    return (
      <Button suppressHydrationWarning variant="secondary" onClick={connect} disabled={isConnecting}>
        <p>{isConnecting ? "Connecting..." : "Connect"}</p>
      </Button>
    );
  }

  // Connected but wrong network - show switch network button
  if (chainId !== config.network.id) {
    return (
      <Chip color="disabled" onClick={() => switchChain(config.network.id)}>
        Wrong network
      </Chip>
    );
  }

  // Connected and on correct network - show account details
  return <ConnectedDetails address={address} isMobile={isMobile} onDisconnect={disconnect} />;
};

export default dynamic(async () => Promise.resolve(ConnectButton), { ssr: false });
