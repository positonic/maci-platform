import { getProjectAddresses } from "~/config/projectAddresses";
import { DepositAddressCard } from "~/features/donate/components/DepositAddressCard";

interface IProjectDonateSectionProps {
  projectId: string;
  projectName?: string;
}

export const ProjectDonateSection = ({ projectId, projectName }: IProjectDonateSectionProps): JSX.Element | null => {
  const addresses = getProjectAddresses(projectId);

  if (addresses.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 border-t border-gray-200 pt-8 dark:border-gray-700">
      <div>
        <h3 className="font-sans text-lg font-bold uppercase leading-[27px] dark:text-white">
          Donate to support {projectName ?? "this project"}
        </h3>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          No wallet required — scan the QR code or copy an address. Your donation is your vote: matching funds are
          allocated proportionally to direct donations received per project.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {addresses.map((pool) => (
          <DepositAddressCard key={pool.symbol} pool={pool} />
        ))}
      </div>
    </div>
  );
};
