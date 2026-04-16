import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

interface IChainConfig {
  label: string;
  shortName: string;
  color: string;
  easScanBase: string;
}

const SUPPORTED_CHAINS: IChainConfig[] = [
  { label: "Ethereum", shortName: "eth", color: "#627EEA", easScanBase: "https://easscan.org" },
  { label: "Optimism", shortName: "op", color: "#FF0420", easScanBase: "https://optimism.easscan.org" },
  { label: "Base", shortName: "base", color: "#0052FF", easScanBase: "https://base.easscan.org" },
  { label: "Arbitrum", shortName: "arb1", color: "#28A0F0", easScanBase: "https://arbitrum.easscan.org" },
  { label: "Sepolia", shortName: "sep", color: "#7D4698", easScanBase: "https://sepolia.easscan.org" },
  { label: "OP Sepolia", shortName: "op-sep", color: "#FF0420", easScanBase: "https://optimism-sepolia.easscan.org" },
];

interface IChainQRCardProps {
  chain: IChainConfig;
  address: string;
}

const ChainQRCard = ({ chain, address }: IChainQRCardProps): JSX.Element => {
  const [copied, setCopied] = useState(false);
  const qrValue = `${chain.shortName}:${address}`;
  const displayAddress = `${address.slice(0, 6)}…${address.slice(-4)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(qrValue).then(
      () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      () => undefined,
    );
  };

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-gray-700 bg-[#111111] p-4 transition-colors hover:border-gray-600">
      <div className="flex items-center gap-2 self-start">
        <span className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: chain.color }} />

        <span className="font-mono text-xs font-semibold text-white">{chain.label}</span>

        <span className="rounded bg-gray-800 px-1.5 py-0.5 font-mono text-xs text-gray-500">{chain.shortName}:</span>
      </div>

      <div className="rounded-lg bg-white p-2">
        <QRCodeSVG bgColor="#ffffff" fgColor={chain.color} level="M" size={100} value={qrValue} />
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        <span className="font-mono text-xs text-gray-500">{displayAddress}</span>

        <button
          className="rounded px-2 py-1 font-mono text-xs text-gray-500 transition-colors hover:text-gray-300"
          type="button"
          onClick={handleCopy}
        >
          {copied ? "✓" : "copy"}
        </button>
      </div>
    </div>
  );
};

interface IWalletQRGridProps {
  address: string;
}

export const WalletQRGrid = ({ address }: IWalletQRGridProps): JSX.Element => (
  <div className="flex flex-col gap-4">
    <div>
      <h3 className="font-mono text-sm font-semibold text-white">Your attested wallet across chains</h3>

      <p className="mt-1 text-xs text-gray-500">
        The same wallet address works on all EVM chains. Share or scan the QR for whichever chain the voting round is
        deployed on. Each QR encodes the EIP-3770 chain-specific address format.
      </p>

      <a
        className="mt-0.5 block font-mono text-xs text-[#7D4698] hover:underline"
        href="https://eips.ethereum.org/EIPS/eip-3770"
        rel="noopener noreferrer"
        target="_blank"
      >
        Learn about EIP-3770 →
      </a>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {SUPPORTED_CHAINS.map((chain) => (
        <ChainQRCard key={chain.shortName} address={address} chain={chain} />
      ))}
    </div>
  </div>
);
