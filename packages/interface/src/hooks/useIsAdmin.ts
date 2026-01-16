import { config } from "~/config";
import { useWaaP } from "~/hooks/useWaaP";

export function useIsAdmin(): boolean {
  const { address } = useWaaP();

  return config.admin === address;
}
