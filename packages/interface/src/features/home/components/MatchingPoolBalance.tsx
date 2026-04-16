import { ZeroAddress } from "ethers";
import Link from "next/link";
import { useMemo } from "react";
import { formatUnits } from "viem";
import { useReadContract } from "wagmi";

import { config } from "~/config";
import { useRound } from "~/contexts/Round";

const TALLY_TOTAL_AMOUNT_ABI = [
  {
    name: "totalAmount",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const MatchingPoolBalance = (): JSX.Element => {
  const { rounds } = useRound();

  const tallyAddress = useMemo(
    () => rounds?.find((r) => r.tallyAddress && r.tallyAddress !== ZeroAddress)?.tallyAddress,
    [rounds],
  );

  const { data: totalAmount } = useReadContract({
    address: tallyAddress as `0x${string}`,
    abi: TALLY_TOTAL_AMOUNT_ABI,
    functionName: "totalAmount",
    query: { enabled: Boolean(tallyAddress) },
  });

  const formattedAmount = totalAmount !== undefined ? formatUnits(totalAmount, 18) : null;

  return (
    <p className="mt-6 text-center text-sm italic text-gray-500 dark:text-gray-400">
      {formattedAmount ? (
        <>
          {"Total matching pool: "}

          {formattedAmount}

          {` ${config.tokenName} — `}
        </>
      ) : (
        "Accepting donations — "
      )}

      <Link className="text-blue-500 hover:underline" href="/donate">
        Contribute to the matching pool
      </Link>
    </p>
  );
};
