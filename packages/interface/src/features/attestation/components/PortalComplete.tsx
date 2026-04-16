import { WalletQRGrid } from "./WalletQRGrid";

interface IPortalCompleteProps {
  address: string;
  attestationUID: string;
  onRestart: () => void;
}

export const PortalComplete = ({ address, attestationUID, onRestart }: IPortalCompleteProps): JSX.Element => (
  <div className="flex flex-col gap-8">
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#7D4698]">
        <svg
          className="text-white"
          fill="none"
          height="28"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
          width="28"
        >
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 className="font-mono text-xl font-bold text-white">Registration complete</h2>

      <p className="max-w-md text-sm text-gray-400">
        You are now registered as a voter in the Tor Privacy Funding campaign. Your votes are encrypted end-to-end with
        MACI — no one can link your vote to your identity.
      </p>
    </div>

    <div className="rounded-lg border border-gray-700 bg-[#111111] p-4">
      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
        <div className="text-gray-500">Wallet</div>

        <div className="text-gray-300">{`${address.slice(0, 6)}…${address.slice(-4)}`}</div>

        <div className="text-gray-500">Attestation</div>

        <div className="text-[#7D4698]">{attestationUID.slice(0, 10)}…</div>

        <div className="text-gray-500">Status</div>

        <div className="text-green-400">Eligible to vote ✓</div>
      </div>
    </div>

    <WalletQRGrid address={address} />

    <div className="border-t border-gray-800 pt-4 text-center">
      <button
        className="font-mono text-xs text-gray-600 transition-colors hover:text-gray-400"
        type="button"
        onClick={onRestart}
      >
        ← Start over with a different wallet
      </button>
    </div>
  </div>
);
