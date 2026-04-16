import { useEffect, useState } from "react";

import { Button } from "~/components/ui/Button";

import { useMockVerification } from "../../hooks/useMockVerification";
import { type IPathProps } from "../../types";
import { MockVerificationTimer } from "../MockVerificationTimer";

const MOCK_VOUCH_URL = "https://tor-attestation.example/vouch?token=c7f3a9&expires=24h&v=1";

export const CommunityVouchPath = ({ onVerified }: IPathProps): JSX.Element => {
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const { isVerifying, isVerified, startVerification } = useMockVerification({ delayMs: 2000 });

  useEffect(() => {
    if (!linkGenerated) {
      return undefined;
    }
    const timer = setTimeout(() => {
      startVerification();
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [linkGenerated, startVerification]);

  const handleCopy = () => {
    navigator.clipboard.writeText(MOCK_VOUCH_URL).then(
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
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-mono text-lg font-semibold text-white">Community Vouch</h2>

        <p className="mt-1 text-sm text-gray-400">
          Generate a unique vouch request link and share it with a verified Tor community member. When they click it and
          confirm, your wallet receives an attestation. Each member can vouch for up to 3 people.
        </p>
      </div>

      {!linkGenerated && !isVerifying && !isVerified && (
        <div className="rounded-lg border border-gray-700 bg-[#111111] p-5">
          <div className="mb-4 flex items-start gap-3 rounded-md bg-gray-900 p-3">
            <span className="mt-0.5 text-yellow-500">⚠</span>

            <p className="text-xs text-gray-400">
              Make sure you have a verified community member ready to vouch for you before generating the link. Links
              expire after 24 hours.
            </p>
          </div>

          <Button
            size="auto"
            variant="primary"
            onClick={() => {
              setLinkGenerated(true);
            }}
          >
            Generate Vouch Link
          </Button>
        </div>
      )}

      {linkGenerated && !isVerifying && !isVerified && (
        <div className="flex flex-col gap-4 rounded-lg border border-gray-700 bg-[#111111] p-5">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs uppercase tracking-wider text-gray-400">Your vouch request link</label>

            <div className="flex items-center gap-2">
              <input
                readOnly
                className="flex-1 rounded-md border border-gray-700 bg-[#0A0A0A] px-3 py-2 font-mono text-xs text-gray-300 outline-none"
                value={MOCK_VOUCH_URL}
              />

              <button
                className="rounded-md border border-gray-700 px-3 py-2 font-mono text-xs text-gray-400 transition-colors hover:border-[#7D4698] hover:text-white"
                type="button"
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md bg-[#7D4698]/10 px-3 py-2">
            <span className="animate-pulse text-[#7D4698]">●</span>

            <span className="font-mono text-xs text-[#7D4698]">Awaiting vouch from community member…</span>
          </div>

          <p className="font-mono text-xs text-gray-600">Demo: this will auto-complete in a few seconds.</p>
        </div>
      )}

      {isVerifying && <MockVerificationTimer message="Confirming vouch on-chain…" />}

      {isVerified && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-[#7D4698]/40 bg-[#7D4698]/10 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[#7D4698]">✓</span>

              <span className="font-mono text-sm font-semibold text-white">Vouch received and verified</span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <div className="text-gray-500">Voucher</div>

              <div className="text-gray-300">0x742d…35Fa</div>

              <div className="text-gray-500">Voucher role</div>

              <div className="text-gray-300">Tor core developer</div>

              <div className="text-gray-500">Vouches remaining</div>

              <div className="text-gray-300">2 of 3</div>

              <div className="text-gray-500">Vouch graph</div>

              <div className="text-[#7D4698]">Recorded ✓</div>
            </div>
          </div>

          <Button size="auto" variant="primary" onClick={onVerified}>
            Issue Attestation →
          </Button>
        </div>
      )}
    </div>
  );
};
