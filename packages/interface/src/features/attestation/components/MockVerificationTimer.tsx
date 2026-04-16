import { useEffect, useState } from "react";

import { Spinner } from "~/components/ui/Spinner";

interface IMockVerificationTimerProps {
  message: string;
}

export const MockVerificationTimer = ({ message }: IMockVerificationTimerProps): JSX.Element => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 12;
      });
    }, 200);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3 py-4">
      <div className="flex items-center gap-3 text-gray-300">
        <Spinner className="h-4 w-4" />

        <span className="font-mono text-sm">{message}</span>
      </div>

      <div className="h-1 w-full overflow-hidden rounded-full bg-gray-700">
        <div
          className="h-1 rounded-full bg-[#7D4698] transition-all duration-300"
          style={{ width: `${Math.min(progress, 90)}%` }}
        />
      </div>
    </div>
  );
};
