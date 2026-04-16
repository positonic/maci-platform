import { Button } from "~/components/ui/Button";

import { useMockVerification } from "../../hooks/useMockVerification";
import { type IPathProps } from "../../types";
import { MockVerificationTimer } from "../MockVerificationTimer";

export const GitLabPath = ({ onVerified }: IPathProps): JSX.Element => {
  const { isVerifying, isVerified, startVerification } = useMockVerification({ delayMs: 2500 });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-mono text-lg font-semibold text-white">Tor GitLab Account</h2>

        <p className="mt-1 text-sm text-gray-400">
          We verify your account on <span className="font-mono text-gray-300">gitlab.torproject.org</span> has at least
          6 months history or 5 merged contributions. We only read your public profile — no write access is requested.
        </p>
      </div>

      {!isVerifying && !isVerified && (
        <div className="flex flex-col gap-4 rounded-lg border border-gray-700 bg-[#111111] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FC6D26]/10 text-[#FC6D26]">
              <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
                <path d="M4.845.904a.999.999 0 00-.955.692L.173 10.68a1 1 0 00.36 1.115l11.43 8.31a.07.07 0 00.083 0l11.43-8.31a1 1 0 00.36-1.115L20.11 1.596a1 1 0 00-.955-.692h-.001a1 1 0 00-.95.68l-2.7 8.304H8.494l-2.7-8.305a1 1 0 00-.949-.679z" />
              </svg>
            </div>

            <div>
              <div className="font-mono text-sm text-white">gitlab.torproject.org</div>

              <div className="text-xs text-gray-500">Read-only OAuth — profile + contribution count</div>
            </div>
          </div>

          <Button size="auto" variant="primary" onClick={startVerification}>
            Connect GitLab Account
          </Button>
        </div>
      )}

      {isVerifying && <MockVerificationTimer message="Connecting to gitlab.torproject.org…" />}

      {isVerified && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-[#7D4698]/40 bg-[#7D4698]/10 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[#7D4698]">✓</span>

              <span className="font-mono text-sm font-semibold text-white">Account verified</span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <div className="text-gray-500">Username</div>

              <div className="text-gray-300">@tor-demo-user</div>

              <div className="text-gray-500">Account age</div>

              <div className="text-gray-300">3 years, 2 months</div>

              <div className="text-gray-500">Contributions</div>

              <div className="text-gray-300">47 commits, 12 MRs</div>

              <div className="text-gray-500">Verification</div>

              <div className="text-[#7D4698]">Passed ✓</div>
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
