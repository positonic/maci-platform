export interface PoolAddress {
  chain: string;
  symbol: string;
  address: string;
  explorerUrl?: string;
  uriPrefix?: string;
}

const definitions = [
  {
    chain: "Ethereum / EVM",
    symbol: "ETH / USDC",
    address: process.env.NEXT_PUBLIC_POOL_ETH_ADDRESS ?? "",
    explorerUrl: process.env.NEXT_PUBLIC_POOL_ETH_ADDRESS
      ? `https://etherscan.io/address/${process.env.NEXT_PUBLIC_POOL_ETH_ADDRESS}`
      : undefined,
    uriPrefix: "ethereum:",
  },
  {
    chain: "Bitcoin",
    symbol: "BTC",
    address: process.env.NEXT_PUBLIC_POOL_BTC_ADDRESS ?? "",
    explorerUrl: process.env.NEXT_PUBLIC_POOL_BTC_ADDRESS
      ? `https://blockstream.info/address/${process.env.NEXT_PUBLIC_POOL_BTC_ADDRESS}`
      : undefined,
    uriPrefix: "bitcoin:",
  },
  {
    chain: "Solana",
    symbol: "SOL",
    address: process.env.NEXT_PUBLIC_POOL_SOL_ADDRESS ?? "",
    explorerUrl: process.env.NEXT_PUBLIC_POOL_SOL_ADDRESS
      ? `https://solscan.io/account/${process.env.NEXT_PUBLIC_POOL_SOL_ADDRESS}`
      : undefined,
    uriPrefix: "solana:",
  },
  {
    chain: "Monero",
    symbol: "XMR",
    address: process.env.NEXT_PUBLIC_POOL_XMR_ADDRESS ?? "",
    // No public block explorer for Monero — privacy by design
    uriPrefix: "monero:",
  },
  {
    chain: "Zcash",
    symbol: "ZEC",
    address: process.env.NEXT_PUBLIC_POOL_ZEC_ADDRESS ?? "",
    explorerUrl: process.env.NEXT_PUBLIC_POOL_ZEC_ADDRESS
      ? `https://zcashblockexplorer.com/address/${process.env.NEXT_PUBLIC_POOL_ZEC_ADDRESS}`
      : undefined,
    uriPrefix: "zcash:",
  },
];

// Only expose chains that have been configured via environment variables
export const POOL_ADDRESSES: PoolAddress[] = definitions.filter((p) => p.address.length > 0);
