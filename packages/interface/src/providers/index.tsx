import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useMemo, type PropsWithChildren } from "react";

import { Toaster } from "~/components/Toaster";
import * as appConfig from "~/config";
import { BallotProvider } from "~/contexts/Ballot";
import { MaciProvider } from "~/contexts/Maci";
import { RoundProvider } from "~/contexts/Round";
import { WaaPProvider } from "~/contexts/WaaP";

export const Providers = ({ children }: PropsWithChildren): JSX.Element => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <ThemeProvider attribute="class" forcedTheme={appConfig.theme.colorMode}>
      <WaaPProvider>
        <QueryClientProvider client={queryClient}>
          <RoundProvider>
            <MaciProvider>
              <BallotProvider>{children}</BallotProvider>

              <Toaster />
            </MaciProvider>
          </RoundProvider>
        </QueryClientProvider>
      </WaaPProvider>
    </ThemeProvider>
  );
};
