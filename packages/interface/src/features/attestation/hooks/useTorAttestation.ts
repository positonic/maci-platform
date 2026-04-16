import { useCallback, useState } from "react";

interface IUseTorAttestationReturn {
  attest: () => Promise<string>;
  isAttesting: boolean;
  attestationUID: string | null;
}

const generateMockUID = (): string =>
  `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;

export const useTorAttestation = (): IUseTorAttestationReturn => {
  const [isAttesting, setIsAttesting] = useState(false);
  const [attestationUID, setAttestationUID] = useState<string | null>(null);

  const attest = useCallback(async (): Promise<string> => {
    setIsAttesting(true);
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 2000);
    });
    const uid = generateMockUID();
    setAttestationUID(uid);
    setIsAttesting(false);
    return uid;
    // To swap for real EAS:
    // const attestation = await createAttestation({ ... });
    // const result = await multiAttest([{ schema: TOR_SCHEMA_UID, data: [attestation] }]);
    // return result[0].uid;
  }, []);

  return { attest, isAttesting, attestationUID };
};
