import { useState } from "react";

import { Button } from "~/components/ui/Button";

import { useMockVerification } from "../../hooks/useMockVerification";
import { type IPathProps } from "../../types";
import { MockVerificationTimer } from "../MockVerificationTimer";

export const RelayOperatorPath = ({ onVerified }: IPathProps): JSX.Element => {
  const [fingerprint, setFingerprint] = useState("");
  const [nickname, setNickname] = useState("");
  const [challenge, setChallenge] = useState<string | null>(null);
  const { isVerifying, isVerified, startVerification } = useMockVerification({ delayMs: 3000 });

  const isValidFingerprint = /^[0-9a-fA-F]{40}$/.test(fingerprint);

  const handleGenerateChallenge = () => {
    const token = fingerprint.slice(0, 8).toUpperCase();
    setChallenge(`echo "tor-attestation-${token}" | gpg --clearsign`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-mono text-lg font-semibold text-white">Relay Operator</h2>

        <p className="mt-1 text-sm text-gray-400">
          Prove you operate a Tor relay by signing a challenge with your relay&apos;s identity key. Relay fingerprints
          are public — no additional personal data is disclosed.
        </p>
      </div>

      {!isVerifying && !isVerified && !challenge && (
        <div className="flex flex-col gap-4 rounded-lg border border-gray-700 bg-[#111111] p-5">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs uppercase tracking-wider text-gray-400">
              Relay Fingerprint <span className="text-[#7D4698]">*</span>
            </label>

            <input
              className={[
                "rounded-md border bg-[#0A0A0A] px-3 py-2 font-mono text-sm text-white placeholder-gray-600 outline-none transition-colors",
                isValidFingerprint || fingerprint === ""
                  ? "border-gray-700 focus:border-[#7D4698]"
                  : "border-red-800 focus:border-red-700",
              ].join(" ")}
              maxLength={40}
              placeholder="A1B2C3D4E5F6... (40 hex characters)"
              value={fingerprint}
              onChange={(e) => {
                setFingerprint(e.target.value.trim());
              }}
            />

            {fingerprint.length > 0 && !isValidFingerprint && (
              <span className="font-mono text-xs text-red-500">Must be exactly 40 hex characters</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs uppercase tracking-wider text-gray-400">
              Relay Nickname (optional)
            </label>

            <input
              className="rounded-md border border-gray-700 bg-[#0A0A0A] px-3 py-2 font-mono text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-[#7D4698]"
              placeholder="e.g. AwesomeTorRelay"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          </div>

          <Button
            disabled={!isValidFingerprint}
            size="auto"
            variant={isValidFingerprint ? "primary" : "outline"}
            onClick={handleGenerateChallenge}
          >
            Generate Challenge
          </Button>
        </div>
      )}

      {!isVerifying && !isVerified && challenge && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-gray-700 bg-[#111111] p-5">
            <p className="mb-3 font-mono text-xs text-gray-400">
              Run this command on your relay server and paste the signed output back. This proves you control the relay
              identity key.
            </p>

            <div className="rounded-md bg-[#0A0A0A] p-3">
              <pre className="overflow-x-auto font-mono text-xs text-[#7D4698]">{challenge}</pre>
            </div>
          </div>

          <Button size="auto" variant="primary" onClick={startVerification}>
            I&apos;ve Signed the Challenge →
          </Button>
        </div>
      )}

      {isVerifying && <MockVerificationTimer message="Fetching relay metrics from Onionoo…" />}

      {isVerified && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-[#7D4698]/40 bg-[#7D4698]/10 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[#7D4698]">✓</span>

              <span className="font-mono text-sm font-semibold text-white">Relay operator verified</span>
            </div>

            <table className="w-full font-mono text-xs">
              <tbody className="divide-y divide-gray-800">
                {[
                  ["Fingerprint", `${(fingerprint || "A1B2C3D4E5").slice(0, 10)}…`],
                  ["Nickname", nickname || "TorRelay#1"],
                  ["Bandwidth", "45 Mbit/s avg"],
                  ["Guard flag", "Yes"],
                  ["Exit flag", "No"],
                  ["Uptime", "99.1% (last 90d)"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="py-1.5 text-gray-500">{label}</td>

                    <td className="py-1.5 text-gray-300">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button size="auto" variant="primary" onClick={onVerified}>
            Issue Attestation →
          </Button>
        </div>
      )}
    </div>
  );
};
