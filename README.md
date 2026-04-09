# MACI Platform

> [!IMPORTANT]  
> MACI Platform is no longer maintained. It can be used as is for running on chain voting rounds using [MACI v2](https://maci.pse.dev/docs/v2.x/introduction), thus we encourage you to fork it and use it as you see fit.
> MACI (the protocol), is still actively maintained and can be found [here](https://github.com/privacy-scaling-explorations/maci).

MACI Platform is a complete solution for running voting and funding rounds using [MACI](https://maci.pse.dev).

It is comprised of three components:

- Interface - a web app for managing and voting on MACI polls.
- Contracts - allows the deployment of the MACI contracts.
- Subgraph - queries blockchain to populate the Interface.

### MACI-Platform docs

- [Setup & Deployment](./docs/01_setup.md)
- [Adding Projects & Approving](./docs/02_adding_projects.md)
- [Creating Badgeholders/Voters](./docs/03_creating_badgeholders.md)
- [Voting](./docs/04_voting.md)
- [Results](./docs/05_results.md)
- [Troubleshooting of MACI](./docs/06_maci_troubleshooting.md)

### MACI docs

- [Documentation](https://maci.pse.dev/docs/introduction)

### Matching Pool & Quadratic Funding Flow

```mermaid
sequenceDiagram
    participant Admin as Admin/Owner
    participant Tally as Tally.sol
    participant Token as ERC20 Token
    participant MACI as MACI Contracts
    participant Coord as Coordinator
    participant Voter as Voters
    participant Recip as Recipients
    participant Sub as Subgraph
    participant Cust as Custodian

    Note over Admin,Cust: ── Phase 1: Setup ──

    Admin->>MACI: deployPoll()
    MACI-->>Admin: Poll + Tally addresses
    Admin->>Tally: init({payoutToken, maxCap, maxContribution, custodian, cooldownTime})
    Tally->>MACI: poll.getRegistry()
    Tally-->>Tally: store config, set initialized=true

    Note over Admin,Cust: ── Phase 2: Deposit Matching Funds ──

    Admin->>Token: approve(tally, amount)
    Admin->>Tally: deposit(amount)
    Tally-->>Tally: beforeTallying ✓
    Tally->>Token: safeTransferFrom(admin → tally, amount)
    Tally-->>Sub: emit Deposited(admin, amount)

    Note right of Tally: Matching pool = tally.balanceOf(token)<br/>Anyone can call deposit() multiple times

    Note over Admin,Cust: ── Phase 3: Voting ──

    Voter->>MACI: signup() + publishMessage(encryptedVote)
    Note right of MACI: Votes are encrypted<br/>(anti-collusion)

    Note over Admin,Cust: ── Phase 4: Tallying ──

    Note right of Coord: Poll voting period ends

    Coord->>MACI: merge state & message trees
    Coord->>Coord: genProofs (off-chain ZK proving)
    Note right of Coord: Produces process_*.json + tally.json

    Coord->>Tally: addTallyResults({tallyResults, proofs})
    loop For each project
        Tally->>Tally: verify ZK proof
        Tally->>Tally: store tallyResults[index]
        Tally->>Tally: totalVotesSquares += result²
        Tally-->>Sub: emit ResultAdded(index, result)
    end

    Note over Admin,Cust: ── Phase 5: Claims (QF Distribution) ──

    Recip->>Tally: claim({index, voiceCreditsPerOption, proofs...})

    alt First claim
        Tally->>Tally: calculateAlpha(budget)<br/>α = (budget - contributions) × 10¹⁸ / (vcf × (Σvotes² - totalSpent))
    end

    Tally->>Tally: getAllocatedAmount(index, voiceCreditsPerOption)
    Note right of Tally: quadratic = α × vcf × tallyResult²<br/>linear = vcf × voiceCreditsPerOption<br/>amount = (quadratic + linear×10¹⁸ - α×linear) / 10¹⁸<br/>cap at maxCap

    Tally->>Tally: verifyTallyResult (ZK proof check)
    Tally->>Tally: claimed[index] = true

    Tally->>Token: safeTransfer(recipient.payoutAddress, amount)
    Token-->>Recip: ERC20 tokens
    Tally-->>Sub: emit Claimed(index, recipient, amount)

    Note over Admin,Cust: ── Phase 6: Leftover Withdrawal ──

    Note right of Admin: cooldownTime elapses after poll ends

    Admin->>Tally: withdraw()
    Tally-->>Tally: afterCooldown ✓
    Tally->>Token: safeTransfer(custodian, remainingBalance)
    Token-->>Cust: leftover ERC20 tokens
```

## Development

To run locally follow these instructions:

```sh
git clone https://github.com/privacy-scaling-explorations/maci-platform

pnpm install

cp packages/interface/.env.example packages/interface/.env # and update .env variables

pnpm build

```

At the very minimum you need to configure the subgraph url, admin address, maci address and the voting periods. For more details head to [Setup & Deployment](./docs/01_setup.md). Once you have set everything run:

```sh
pnpm run dev:interface

open localhost:3000
```

## Credits

The interface started as a fork of [easy-rpgf](https://github.com/gitcoinco/easy-retro-pgf), but now has gone a completely different direction and thus we decided to detach the fork to clarify the new direction of the project, which is not focusing anymore on RPGF only, but other types of voting and funding.

We are very thankful to the developers and all contributors of the [easy-rpgf](https://github.com/gitcoinco/easy-retro-pgf) project, and we hope to continue collaborating and wish to see their project succeed and help more communities/projects get funded.
