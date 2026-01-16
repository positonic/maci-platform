# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MACI Platform is an open-source solution for private on-chain voting using the MACI (Minimal Anti-Collusion Infrastructure) protocol with zero-knowledge proofs. It supports multiple voting round types (RPGF, quadratic funding) across Ethereum and L2s (Optimism, Arbitrum, Base, Scroll).

## Monorepo Structure

This is a **pnpm workspace** monorepo managed with Lerna:

- **packages/contracts** - Solidity smart contracts (Hardhat)
- **packages/interface** - Next.js 14 web application (React/TypeScript/TailwindCSS)
- **packages/subgraph** - The Graph indexing (AssemblyScript/GraphQL)
- **packages/e2e** - Playwright end-to-end tests with wallet integration (Synpress)

## Common Commands

### Root Level
```bash
pnpm build                 # Build all packages
pnpm prettier              # Check formatting
pnpm prettier:fix          # Fix formatting
pnpm lint:ts               # Lint TypeScript
pnpm lint:ts:fix           # Fix TypeScript linting
pnpm lint:sol              # Lint Solidity
pnpm types                 # Type check all packages
```

### Contracts (packages/contracts)
```bash
pnpm run compileSol        # Compile Solidity
pnpm run test              # Run Hardhat tests
pnpm run coverage          # Test coverage
pnpm run deploy            # Deploy to localhost
pnpm run deploy:optimism-sepolia  # Deploy to Optimism Sepolia
```

### Interface (packages/interface)
```bash
pnpm run dev               # Development server with hot reload
pnpm run build             # Production build
pnpm run start             # Start production server
pnpm run lint              # Lint Next.js app
pnpm run types             # Type check
```

### Subgraph (packages/subgraph)
```bash
pnpm run codegen           # Generate types from schema
pnpm run build             # Build subgraph
pnpm run test              # Run Matchstick tests
pnpm run deploy            # Deploy to The Graph
```

### E2E (packages/e2e)
```bash
pnpm run test:playwright:headless   # Run tests headless
pnpm run test:playwright:headful    # Run tests with browser visible
```

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Web Interface                        │
│         (Next.js + React + TailwindCSS + wagmi)         │
└─────────────────────┬───────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   ┌─────────┐  ┌──────────┐  ┌──────────┐
   │  tRPC   │  │   EAS    │  │   MACI   │
   │   API   │  │   SDK    │  │   CLI    │
   └─────────┘  └──────────┘  └──────────┘
        │             │             │
        └─────────────┼─────────────┘
                      ▼
            ┌──────────────────┐
            │   Smart Contracts │
            │ (MACI + Registry) │
            └────────┬─────────┘
                     │
            ┌────────▼─────────┐
            │    Subgraph      │
            │  (Event Indexing) │
            └──────────────────┘
```

### Key Integration Points

- **EAS (Ethereum Attestation Service)**: Stores project metadata, approvals, and voter attestations on-chain
- **MACI Contracts**: Core voting infrastructure using `maci-contracts` v2.5.0
- **The Graph**: Indexes contract events for efficient frontend queries
- **tRPC**: Type-safe API between frontend and backend with automatic batching

### Interface Features (`packages/interface/src/features/`)
- **admin** - Round administration
- **ballot** - Voter ballot management
- **projects** - Project display and registration
- **rounds** - Voting round management
- **results** - Vote tallying and display
- **voters** - Voter registration and status

### Interface Contexts (`packages/interface/src/contexts/`)
- **Ballot** - Manages voter ballot state
- **Round** - Current round configuration
- **Maci** - MACI contract interactions

## Code Standards

- **Conventional Commits**: Required format enforced by commitlint (e.g., `feat:`, `fix:`, `chore:`)
- **Pre-commit hooks**: Husky runs lint-staged and type checking
- **Print width**: 120 characters
- **Formatting**: Double quotes, semicolons, trailing commas (see `.prettierrc`)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18, TypeScript 5.7, TailwindCSS 3.4 |
| Blockchain | wagmi v2, viem v2, ethers.js 6, RainbowKit v2 |
| Smart Contracts | Solidity 0.8.20, Hardhat, OpenZeppelin |
| API | tRPC 11, React Query v5 |
| Auth | NextAuth.js 4 |
| Indexing | The Graph, AssemblyScript |

## Environment Requirements

- **Node.js**: v20+
- **pnpm**: v9

## Multi-Chain Support

Contracts and interface support: Ethereum, Optimism, Optimism Sepolia, Arbitrum, Arbitrum Sepolia, Base, Base Sepolia, Scroll, Scroll Sepolia, Sepolia

## ZK Artifacts

Download required zero-knowledge ceremony artifacts:
```bash
pnpm download-zkeys:test   # For testing
pnpm download-zkeys:prod   # For production
```
