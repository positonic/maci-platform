import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

import { Button } from "~/components/ui/Button";

import { EVerificationPath } from "../types";

import { VerificationPathCard } from "./VerificationPathCard";

const GitLabIcon = (): JSX.Element => (
  <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
    <path d="M4.845.904a.999.999 0 00-.955.692L.173 10.68a1 1 0 00.36 1.115l11.43 8.31a.07.07 0 00.083 0l11.43-8.31a1 1 0 00.36-1.115L20.11 1.596a1 1 0 00-.955-.692h-.001a1 1 0 00-.95.68l-2.7 8.304H8.494l-2.7-8.305a1 1 0 00-.949-.679z" />
  </svg>
);

const RelayIcon = (): JSX.Element => (
  <svg fill="none" height="20" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" width="20">
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />

    <circle cx="5" cy="12" fill="currentColor" r="2" />
  </svg>
);

const MailIcon = (): JSX.Element => (
  <svg fill="none" height="20" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" width="20">
    <path
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const VouchIcon = (): JSX.Element => (
  <svg fill="none" height="20" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" width="20">
    <path
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EventIcon = (): JSX.Element => (
  <svg fill="none" height="20" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" width="20">
    <path
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PATHS = [
  {
    id: EVerificationPath.GITLAB,
    icon: <GitLabIcon />,
    title: "Tor GitLab Account",
    description: "OAuth verify your gitlab.torproject.org account. Requires 6+ months age or 5+ contributions.",
    badge: "High signal",
  },
  {
    id: EVerificationPath.RELAY,
    icon: <RelayIcon />,
    title: "Relay Operator",
    description: "Prove you operate a Tor relay by signing a challenge with your relay identity key.",
    badge: "Highest signal",
  },
  {
    id: EVerificationPath.MAILING_LIST,
    icon: <MailIcon />,
    title: "Mailing List",
    description: "Verify email subscription to tor-dev@, tor-relays@, or tor-project@ mailing lists.",
    badge: undefined,
  },
  {
    id: EVerificationPath.VOUCH,
    icon: <VouchIcon />,
    title: "Community Vouch",
    description: "Get vouched by a verified Tor community member. Each member can vouch for up to 3 people.",
    badge: undefined,
  },
  {
    id: EVerificationPath.EVENT,
    icon: <EventIcon />,
    title: "Event Attendance",
    description: "Claim an attestation via single-use QR code issued at a Tor dev meeting or community event.",
    badge: undefined,
  },
] as const;

interface IAttestationLandingProps {
  onSelectPath: (path: EVerificationPath) => void;
}

export const AttestationLanding = ({ onSelectPath }: IAttestationLandingProps): JSX.Element => {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-mono text-2xl font-bold text-white">Verify your Tor community membership</h1>

        <p className="text-sm leading-relaxed text-gray-400">
          Choose a verification path below. No personal data is stored on-chain — only a lightweight attestation is
          issued to your wallet. You need at least one successful verification to register as a voter.
        </p>
      </div>

      {!isConnected && (
        <div className="rounded-lg border border-gray-700 bg-[#111111] p-6">
          <p className="mb-4 font-mono text-sm text-gray-300">Connect your wallet to begin</p>

          <RainbowConnectButton.Custom>
            {({ openConnectModal, mounted }) =>
              mounted ? (
                <Button size="auto" variant="primary" onClick={openConnectModal}>
                  Connect wallet
                </Button>
              ) : null
            }
          </RainbowConnectButton.Custom>
        </div>
      )}

      <div
        className={[
          "flex flex-col gap-3 transition-opacity",
          !isConnected ? "pointer-events-none opacity-40" : "",
        ].join(" ")}
      >
        {PATHS.map((path) => (
          <VerificationPathCard
            key={path.id}
            badge={path.badge}
            description={path.description}
            disabled={!isConnected}
            icon={path.icon}
            title={path.title}
            onClick={() => {
              onSelectPath(path.id);
            }}
          />
        ))}
      </div>
    </div>
  );
};
