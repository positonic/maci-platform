import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";

import { Button } from "~/components/ui/Button";
import { Chip } from "~/components/ui/Chip";

const OnionIcon = (): JSX.Element => (
  <svg fill="none" height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" fill="#7D4698" r="13" />

    <ellipse cx="14" cy="14" fill="none" rx="5" ry="9" stroke="#fff" strokeWidth="1.5" />

    <ellipse cx="14" cy="14" fill="none" rx="9" ry="5" stroke="#fff" strokeWidth="1.5" />

    <circle cx="14" cy="14" fill="#fff" r="2" />
  </svg>
);

export const PortalHeader = (): JSX.Element => (
  <header className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
    <div className="flex items-center gap-3">
      <OnionIcon />

      <span className="font-mono text-sm uppercase tracking-widest text-gray-300">Tor Community Attestation</span>
    </div>

    <RainbowConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted, authenticationStatus }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === "authenticated");

        if (!ready) {
          return null;
        }

        if (!connected) {
          return (
            <Button size="sm" variant="outline" onClick={openConnectModal}>
              Connect wallet
            </Button>
          );
        }

        if (chain.unsupported) {
          return (
            <Chip color="disabled" onClick={openChainModal}>
              Wrong network
            </Chip>
          );
        }

        return (
          <button
            className="flex items-center gap-2 rounded-md border border-gray-700 px-3 py-1.5 font-mono text-xs text-gray-300 transition-colors hover:border-[#7D4698] hover:text-white"
            type="button"
            onClick={openAccountModal}
          >
            <span className="h-2 w-2 rounded-full bg-[#7D4698]" />

            {account.displayName}
          </button>
        );
      }}
    </RainbowConnectButton.Custom>
  </header>
);
