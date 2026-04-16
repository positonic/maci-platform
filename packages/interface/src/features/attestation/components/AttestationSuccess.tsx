import { Button } from "~/components/ui/Button";

interface IAttestationSuccessProps {
  attestationUID: string;
  onContinue: () => void;
}

export const AttestationSuccess = ({ attestationUID, onContinue }: IAttestationSuccessProps): JSX.Element => (
  <div className="flex flex-col items-center gap-6 py-8 text-center">
    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#7D4698] bg-[#7D4698]/10">
      <svg
        className="text-[#7D4698]"
        fill="none"
        height="40"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        width="40"
      >
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>

    <div className="flex flex-col gap-2">
      <h2 className="font-mono text-xl font-bold text-white">Attestation issued</h2>

      <p className="text-sm text-gray-400">
        Your Tor community membership has been attested on-chain. Your wallet is now eligible to register as a voter.
      </p>
    </div>

    <div className="w-full rounded-lg border border-gray-700 bg-[#111111] p-4">
      <div className="mb-2 font-mono text-xs uppercase tracking-wider text-gray-500">Attestation UID</div>

      <div className="break-all font-mono text-xs text-[#7D4698]">{attestationUID}</div>

      <a
        className="mt-2 block font-mono text-xs text-gray-600 transition-colors hover:text-gray-400"
        href={`https://sepolia.easscan.org/attestation/view/${attestationUID}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        View on EAS Scan (Sepolia) →
      </a>

      <p className="mt-1 font-mono text-xs text-gray-700">
        Note: this is a demo attestation — the EAS Scan link returns 404.
      </p>
    </div>

    <Button size="auto" variant="primary" onClick={onContinue}>
      Complete Registration →
    </Button>
  </div>
);
