import Link from "next/link";

import { Button } from "~/components/ui/Button";
import { Heading } from "~/components/ui/Heading";

import { MatchingPoolBalance } from "./MatchingPoolBalance";

const Section = ({ children, id = undefined }: { children: React.ReactNode; id?: string }) => (
  <div className="flex w-full flex-col items-center px-4 py-14 sm:py-20" id={id}>
    <div className="w-full max-w-screen-lg">{children}</div>
  </div>
);

const SponsorBadge = ({ name, description }: { name: string; description: string }) => (
  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
    <p className="font-mono text-lg font-semibold uppercase dark:text-white">{name}</p>

    <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
  </div>
);

export const TorCampaignHome = (): JSX.Element => (
  <div className="dark:text-white">
    {/* Hero Section */}
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-16 text-center sm:py-24">
      <Heading className="max-w-screen-lg" size="6xl">
        Help Protect Internet Freedom
      </Heading>

      <p className="max-w-screen-md text-xl text-gray-500 dark:text-gray-400">
        Support Tor and the privacy ecosystem through cryptocurrency donations
      </p>

      <p className="max-w-screen-md text-lg dark:text-gray-300">
        The internet should be free, private, and accessible to everyone. Join us in funding the tools that make this
        possible.
      </p>

      <div className="flex gap-4">
        <Button size="auto" variant="primary">
          <Link href="/donate">Donate Crypto</Link>
        </Button>

        <Button size="auto" variant="inverted">
          <a href="#how-it-works">Learn More</a>
        </Button>
      </div>
    </div>

    {/* Campaign Overview */}
    <Section>
      <Heading className="text-center" size="4xl">
        Funding Privacy Infrastructure for Everyone
      </Heading>

      <p className="mt-4 text-center text-lg dark:text-gray-300">
        This campaign supports Tor and 10+ critical privacy projects that protect millions of users worldwide. Through
        cryptocurrency donations and matching funds, we&apos;re building sustainable funding for the tools that defend
        digital rights.
      </p>

      <div className="mt-8">
        <Heading size="2xl">Why This Matters</Heading>

        <ul className="mt-4 flex flex-col gap-4 text-lg dark:text-gray-300">
          <li>
            <strong>2+ million daily Tor users</strong> rely on privacy tools for safety and freedom
          </li>

          <li>
            <strong>Journalists, activists, and citizens</strong> in authoritarian regimes depend on these technologies
          </li>

          <li>
            <strong>Open source privacy infrastructure</strong> needs sustainable funding beyond traditional grants
          </li>
        </ul>
      </div>
    </Section>

    {/* How It Works */}
    <Section id="how-it-works">
      <Heading className="text-center" size="4xl">
        How It Works
      </Heading>

      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
          <p className="font-mono text-4xl text-blue-500">1</p>

          <Heading size="xl">Donate Cryptocurrency</Heading>

          <p className="text-gray-500 dark:text-gray-400">
            Support the privacy ecosystem with ETH, stablecoins, and other cryptocurrencies. All donations are matched
            by our sponsor pool.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
          <p className="font-mono text-4xl text-blue-500">2</p>

          <Heading size="xl">Community Decides</Heading>

          <p className="text-gray-500 dark:text-gray-400">
            The Funding the Commons community (25K+ members with 8M+ reach) participates in allocation decisions through
            our transparent governance process.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
          <p className="font-mono text-4xl text-blue-500">3</p>

          <Heading size="xl">Direct Impact</Heading>

          <p className="text-gray-500 dark:text-gray-400">
            Funds go directly to beneficiary projects through our fiscal sponsorship partnership with Public Goods
            Foundation, ensuring efficient distribution and accountability.
          </p>
        </div>
      </div>
    </Section>

    {/* Beneficiary Projects */}
    <Section>
      <Heading className="text-center" size="4xl">
        Beneficiary Projects
      </Heading>

      <p className="mt-4 text-center text-lg dark:text-gray-300">
        <strong>10 Confirmed Privacy Projects</strong> including:
      </p>

      <ul className="mt-6 flex flex-col gap-3 text-lg dark:text-gray-300">
        <li>Tor Project (primary beneficiary)</li>

        <li>Additional privacy tools and infrastructure projects</li>
      </ul>

      <p className="mt-6 text-center text-sm italic text-gray-500 dark:text-gray-400">
        Each project has been vetted for impact, sustainability, and alignment with privacy-preserving values.
      </p>

      <div className="mt-6 flex justify-center">
        <Button size="auto" variant="inverted">
          View All Beneficiaries
        </Button>
      </div>
    </Section>

    {/* Matching Sponsors */}
    <Section>
      <Heading className="text-center" size="4xl">
        Matching Sponsors
      </Heading>

      <p className="mt-4 text-center text-lg dark:text-gray-300">
        Our sponsor partners are amplifying community donations:
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SponsorBadge description="Privacy stablecoin infrastructure" name="Alio" />

        <SponsorBadge description="Wallet integration technology" name="Human Tech" />

        <SponsorBadge description="MEV protection and privacy" name="Flashbots" />

        <SponsorBadge description="Additional sponsors" name="More Coming" />
      </div>

      <MatchingPoolBalance />
    </Section>

    {/* Built for Privacy */}
    <Section>
      <Heading className="text-center" size="4xl">
        Built for Privacy
      </Heading>

      <p className="mt-4 text-center text-lg dark:text-gray-300">
        This platform is designed to work seamlessly with Tor Browser, ensuring donor privacy while maintaining
        transparency about fund allocation and impact.
      </p>

      <div className="mt-8">
        <Heading size="2xl">Supported Currencies</Heading>

        <ul className="mt-4 flex flex-col gap-3 text-lg dark:text-gray-300">
          <li>Ethereum (ETH)</li>

          <li>Stablecoins (USDC, USDT, DAI)</li>

          <li>Bitcoin (BTC) - direct matching fund donations</li>

          <li>Zcash (future consideration)</li>
        </ul>
      </div>
    </Section>

    {/* Powered by FTC */}
    <Section>
      <Heading className="text-center" size="4xl">
        Powered by Funding the Commons
      </Heading>

      <div className="mt-6 flex flex-wrap justify-center gap-8 text-center">
        <div>
          <p className="font-mono text-3xl font-bold text-blue-500">8M+</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">Community Reach</p>
        </div>

        <div>
          <p className="font-mono text-3xl font-bold text-blue-500">25K+</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">Active Members</p>
        </div>

        <div>
          <p className="font-mono text-3xl font-bold text-blue-500">Proven</p>

          <p className="text-sm text-gray-500 dark:text-gray-400">Track Record</p>
        </div>
      </div>

      <p className="mt-6 text-center text-lg dark:text-gray-300">
        Funding the Commons has facilitated millions in funding for public goods through innovative mechanisms and
        community governance.
      </p>

      <div className="mt-6 flex justify-center gap-4">
        <Button size="auto" variant="inverted">
          About FTC
        </Button>

        <Button size="auto" variant="inverted">
          Previous Campaigns
        </Button>
      </div>
    </Section>

    {/* Get Involved */}
    <Section>
      <Heading className="text-center" size="4xl">
        Get Involved
      </Heading>

      <ul className="mt-6 flex flex-col gap-4 text-lg dark:text-gray-300">
        <li>
          <strong>Donate:</strong> Support privacy infrastructure with cryptocurrency
        </li>

        <li>
          <strong>Spread the Word:</strong> Share with your network using #PrivacyFunding
        </li>

        <li>
          <strong>Partner:</strong> Contact us about sponsorship opportunities
        </li>

        <li>
          <strong>Participate:</strong> Join governance discussions in our community
        </li>
      </ul>

      <div className="mt-8 flex justify-center gap-4">
        <Button size="auto" variant="primary">
          Contact Team
        </Button>

        <Button size="auto" variant="secondary">
          Join Community
        </Button>
      </div>
    </Section>
  </div>
);
