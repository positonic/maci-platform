import type { PoolAddress } from "./poolAddresses";

import { POOL_ADDRESSES } from "./poolAddresses";

/**
 * Per-project donation addresses across chains.
 *
 * Key: EAS attestation UID (the `project.id` from IRecipient — the hex string in the URL).
 * Value: Array of PoolAddress for each supported chain.
 *
 * Donating to a project's address IS the vote. Matching funds are allocated
 * proportionally based on direct donations received per project.
 *
 * Add an entry here for each project that should accept direct donations.
 * Chains without an address configured for that project are simply omitted.
 */
export const PROJECT_ADDRESSES: Record<string, PoolAddress[]> = {
  // Example entry — replace with real project attestation UIDs and addresses:
  //
  // "0x31f06a15f991fe1feecd516429ace5b0dff516394b800522d690d9db3e0345a2": [
  //   {
  //     chain: "Ethereum / EVM",
  //     symbol: "ETH / USDC",
  //     address: "0x...",
  //     explorerUrl: "https://etherscan.io/address/0x...",
  //     uriPrefix: "ethereum:",
  //   },
  //   {
  //     chain: "Bitcoin",
  //     symbol: "BTC",
  //     address: "bc1q...",
  //     explorerUrl: "https://blockstream.info/address/bc1q...",
  //     uriPrefix: "bitcoin:",
  //   },
  //   {
  //     chain: "Solana",
  //     symbol: "SOL",
  //     address: "...",
  //     explorerUrl: "https://solscan.io/account/...",
  //     uriPrefix: "solana:",
  //   },
  //   {
  //     chain: "Monero",
  //     symbol: "XMR",
  //     address: "4...",
  //     // No explorer — privacy by design
  //     uriPrefix: "monero:",
  //   },
  // ],
};

/**
 * Returns donation addresses for a given project ID.
 * Falls back to the shared pool addresses when no project-specific addresses are configured.
 */
export const getProjectAddresses = (projectId: string): PoolAddress[] => PROJECT_ADDRESSES[projectId] ?? POOL_ADDRESSES;
