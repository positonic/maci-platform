import { useState } from "react";

import { Button } from "~/components/ui/Button";

import { useMockVerification } from "../../hooks/useMockVerification";
import { type IPathProps } from "../../types";
import { MockVerificationTimer } from "../MockVerificationTimer";

const ACCEPTED_LISTS = ["tor-dev", "tor-relays", "tor-project", "tor-talk"];

export const MailingListPath = ({ onVerified }: IPathProps): JSX.Element => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [code, setCode] = useState("");
  const { isVerifying, isVerified, startVerification } = useMockVerification({ delayMs: 2500 });

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-mono text-lg font-semibold text-white">Mailing List Membership</h2>

        <p className="mt-1 text-sm text-gray-400">
          Verify your subscription to a high-signal Tor mailing list. Your email is hashed immediately and never stored
          in plaintext. The on-chain attestation contains no email address.
        </p>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {ACCEPTED_LISTS.map((list) => (
            <span key={list} className="rounded bg-gray-800 px-2 py-0.5 font-mono text-xs text-gray-400">
              {list}@lists.torproject.org
            </span>
          ))}
        </div>
      </div>

      {!isVerifying && !isVerified && (
        <div className="flex flex-col gap-4 rounded-lg border border-gray-700 bg-[#111111] p-5">
          <div className="flex flex-col gap-2">
            <label className="font-mono text-xs uppercase tracking-wider text-gray-400">
              Email address <span className="text-[#7D4698]">*</span>
            </label>

            <input
              className="rounded-md border border-gray-700 bg-[#0A0A0A] px-3 py-2 font-mono text-sm text-white placeholder-gray-600 outline-none transition-colors focus:border-[#7D4698] disabled:opacity-50"
              disabled={emailSent}
              placeholder="yourname@example.com"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          {!emailSent && (
            <Button
              disabled={!isValidEmail}
              size="auto"
              variant={isValidEmail ? "primary" : "outline"}
              onClick={() => {
                setEmailSent(true);
              }}
            >
              Send Verification Code
            </Button>
          )}

          {emailSent && (
            <>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs uppercase tracking-wider text-gray-400">
                  One-time code <span className="text-[#7D4698]">*</span>
                </label>

                <input
                  className="rounded-md border border-gray-700 bg-[#0A0A0A] px-3 py-2 font-mono text-sm tracking-widest text-white placeholder-gray-600 outline-none transition-colors focus:border-[#7D4698]"
                  maxLength={6}
                  placeholder="TOR-XX"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                  }}
                />

                <span className="font-mono text-xs text-gray-500">
                  {`Check your inbox — a 6-character code was sent to ${email}. (Demo: enter any 6 characters)`}
                </span>
              </div>

              <Button
                disabled={code.length < 6}
                size="auto"
                variant={code.length >= 6 ? "primary" : "outline"}
                onClick={startVerification}
              >
                Verify Code
              </Button>
            </>
          )}
        </div>
      )}

      {isVerifying && <MockVerificationTimer message="Verifying mailing list membership…" />}

      {isVerified && (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-[#7D4698]/40 bg-[#7D4698]/10 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-[#7D4698]">✓</span>

              <span className="font-mono text-sm font-semibold text-white">Mailing list membership verified</span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <div className="text-gray-500">Email hash</div>

              <div className="text-gray-300">sha256:{email.slice(0, 4)}…redacted</div>

              <div className="text-gray-500">Lists matched</div>

              <div className="text-gray-300">tor-relays@, tor-dev@</div>

              <div className="text-gray-500">Member since</div>

              <div className="text-gray-300">~2 years</div>

              <div className="text-gray-500">Stored on-chain</div>

              <div className="text-[#7D4698]">None ✓</div>
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
