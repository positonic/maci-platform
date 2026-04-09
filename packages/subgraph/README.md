# maci-platform-subgraph

1. Make sure you have `{network}.json` file in `config` folder, where network is a CLI name supported for subgraph network [https://thegraph.com/docs/en/developing/supported-networks/](https://thegraph.com/docs/en/developing/supported-networks/).

2. Add network, maci contract address and maci contract deployed block.

```json
{
  "network": "optimism-sepolia",
  "maciContractAddress": "0xD18Ca45b6cC1f409380731C40551BD66932046c3",
  "registryManagerContractAddress": "0xbE6e250bf8B5F689c65Cc79667589A9EBF6Fe8E3",
  "registryManagerContractStartBlock": 13160483,
  "maciContractStartBlock": 11052407
}
```

3. Run `pnpm run build`. You can use env variables `NETWORK` and `VERSION` to switch config files.
4. Deploy to your chosen provider:

### The Graph Studio

```bash
graph auth --studio {key}  # Key from subgraph studio dashboard
pnpm run deploy
```

### Alchemy

```bash
pnpm run deploy-alchemy --deploy-key {key}
```

### Goldsky

```bash
curl https://goldsky.com | sh   # Install CLI (macOS/Linux)
goldsky login                   # Authenticate with API key from https://app.goldsky.com
pnpm run deploy:goldsky
```

After deploying, run `goldsky subgraph list` to get your GraphQL endpoint URL. Set it as `NEXT_PUBLIC_MACI_SUBGRAPH_URL` in the interface `.env`.
