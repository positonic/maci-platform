import { useCallback, useState } from "react";

interface IUseMockVerificationProps {
  delayMs?: number;
}

interface IUseMockVerificationReturn {
  isVerifying: boolean;
  isVerified: boolean;
  startVerification: () => void;
  reset: () => void;
}

export const useMockVerification = ({ delayMs = 2500 }: IUseMockVerificationProps = {}): IUseMockVerificationReturn => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const startVerification = useCallback(() => {
    setIsVerifying(true);
    setIsVerified(false);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, delayMs);
  }, [delayMs]);

  const reset = useCallback(() => {
    setIsVerifying(false);
    setIsVerified(false);
  }, []);

  return { isVerifying, isVerified, startVerification, reset };
};
