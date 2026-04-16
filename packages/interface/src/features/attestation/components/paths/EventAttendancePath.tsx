import { useState } from "react";

import { Button } from "~/components/ui/Button";

import { useMockVerification } from "../../hooks/useMockVerification";
import { type IPathProps } from "../../types";
import { MockVerificationTimer } from "../MockVerificationTimer";

// Static SVG QR code placeholder (visually convincing grid pattern)
const QRPlaceholder = (): JSX.Element => (
  <svg fill="none" height="140" viewBox="0 0 140 140" width="140" xmlns="http://www.w3.org/2000/svg">
    <rect fill="#111111" height="140" rx="4" width="140" />

    {/* Top-left finder pattern */}
    <rect fill="#7D4698" height="30" width="30" x="10" y="10" />

    <rect fill="#111111" height="20" width="20" x="15" y="15" />

    <rect fill="#7D4698" height="10" width="10" x="20" y="20" />

    {/* Top-right finder pattern */}
    <rect fill="#7D4698" height="30" width="30" x="100" y="10" />

    <rect fill="#111111" height="20" width="20" x="105" y="15" />

    <rect fill="#7D4698" height="10" width="10" x="110" y="20" />

    {/* Bottom-left finder pattern */}
    <rect fill="#7D4698" height="30" width="30" x="10" y="100" />

    <rect fill="#111111" height="20" width="20" x="15" y="105" />

    <rect fill="#7D4698" height="10" width="10" x="20" y="110" />

    {/* Data modules (decorative) */}
    {[50, 60, 70, 80, 90].map((x) =>
      [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((y) =>
        Math.sin(x * y * 0.001) > 0.2 ? (
          <rect key={`${x}-${y}`} fill="#9B5FB8" height="8" opacity="0.8" width="8" x={x} y={y} />
        ) : null,
      ),
    )}

    {[10, 20, 30, 40].map((x) =>
      [50, 60, 70, 80, 90, 100, 110, 120].map((y) =>
        Math.cos(x * y * 0.002) > 0.1 ? (
          <rect key={`${x}-${y}`} fill="#7D4698" height="8" opacity="0.9" width="8" x={x} y={y} />
        ) : null,
      ),
    )}

    {[100, 110, 120].map((x) =>
      [50, 60, 70, 80, 90].map((y) =>
        Math.sin(x + y) > 0.3 ? (
          <rect key={`${x}-${y}`} fill="#9B5FB8" height="8" opacity="0.7" width="8" x={x} y={y} />
        ) : null,
      ),
    )}
  </svg>
);

export const EventAttendancePath = ({ onVerified }: IPathProps): JSX.Element => {
  const [token, setToken] = useState("");
  const { isVerifying, isVerified, startVerification } = useMockVerification({ delayMs: 2000 });

  const hasToken = token.length >= 6;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-mono text-lg font-semibold text-white">Event Attendance</h2>

        <p className="mt-1 text-sm text-gray-400">
          Claim your attestation using a single-use token issued by event organisers at Tor dev meetings, community
          events, or partner conferences. Scan the QR code or enter the token manually.
        </p>
      </div>

      {!isVerifying && !isVerified && (
        <div className="flex flex-col gap-5 rounded-lg border border-gray-700 bg-[#111111] p-5">
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-xl border border-gray-700 bg-[#0A0A0A] p-3">
              <QRPlaceholder />
            </div>

            <p className="font-mono text-xs text-gray-500">
              Scan with Tor Browser or any QR reader · or enter token below
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs uppercase tracking-wider text-gray-400">Event token</label>

            <input
              className="rounded-md border border-gray-700 bg-[#0A0A0A] px-3 py-2 font-mono text-sm tracking-widest text-white placeholder-gray-600 outline-none transition-colors focus:border-[#7D4698]"
              placeholder="TOR-EVT-XXXXXX"
              value={token}
              onChange={(e) => {
                setToken(e.target.value.toUpperCase());
              }}
            />

            <span className="font-mono text-xs text-gray-600">Demo: enter any 6+ characters</span>
          </div>

          <Button
            disabled={!hasToken}
            size="auto"
            variant={hasToken ? "primary" : "outline"}
            onClick={startVerification}
          >
            Claim Attendance Attestation
          </Button>
        </div>
      )}

      {isVerifying && <MockVerificationTimer message="Verifying event token with organiser…" />}

      {isVerified && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-[#7D4698]/40 bg-[#7D4698]/10 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[#7D4698]">✓</span>

              <span className="font-mono text-sm font-semibold text-white">Attendance confirmed</span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <div className="text-gray-500">Event</div>

              <div className="text-gray-300">State of the Onion 2025</div>

              <div className="text-gray-500">Date</div>

              <div className="text-gray-300">Oct 15, 2025</div>

              <div className="text-gray-500">Organiser</div>

              <div className="text-gray-300">The Tor Project</div>

              <div className="text-gray-500">Token</div>

              <div className="text-gray-300">{token || "TOR-EVT-DEMO01"}</div>

              <div className="text-gray-500">Redeemed</div>

              <div className="text-[#7D4698]">Yes — token now void ✓</div>
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
