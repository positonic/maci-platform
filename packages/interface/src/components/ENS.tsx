import { Avatar } from "~/components/ui/Avatar";
import { useENS } from "~/hooks/useENS";
import { truncate } from "~/utils/truncate";

import type { Address } from "viem";

interface IENSProps {
  address?: Address;
}

export const AvatarENS = ({ address = "0x" }: IENSProps): JSX.Element => {
  const { name, avatar } = useENS(address);

  return (
    <div className="flex items-center gap-2">
      <Avatar rounded="full" size="xs" src={avatar || undefined} />

      <div>{name ?? truncate(address)}</div>
    </div>
  );
};

export const NameENS = ({ address = "0x" }: IENSProps): JSX.Element => {
  const { name } = useENS(address);

  return <div>{name ?? truncate(address)}</div>;
};
