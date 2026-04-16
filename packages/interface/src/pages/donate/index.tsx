import { Heading } from "~/components/ui/Heading";
import { POOL_ADDRESSES } from "~/config/poolAddresses";
import { DepositAddressCard } from "~/features/donate/components/DepositAddressCard";
import { Layout } from "~/layouts/DefaultLayout";

const DonatePage = (): JSX.Element => (
  <Layout>
    <div className="mx-auto max-w-screen-lg px-4 py-12">
      <Heading className="text-center" size="4xl">
        Contribute to the Matching Pool
      </Heading>

      <p className="mx-auto mt-4 max-w-prose text-center text-lg text-gray-500 dark:text-gray-400">
        Send any amount to any address below — no wallet connection required. Scan the QR code or copy the address.
        Contributions are periodically consolidated into the quadratic funding pool.
      </p>

      {POOL_ADDRESSES.length === 0 ? (
        <p className="mt-12 text-center text-gray-400">Deposit addresses have not been configured yet.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POOL_ADDRESSES.map((pool) => (
            <DepositAddressCard key={pool.symbol} pool={pool} />
          ))}
        </div>
      )}

      <p className="mt-10 text-center text-sm italic text-gray-400">
        All pool addresses are publicly verifiable. Funds are consolidated via THORChain / Chainflip.
      </p>
    </div>
  </Layout>
);

export default DonatePage;
