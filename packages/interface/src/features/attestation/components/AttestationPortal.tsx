import { useCallback, useState } from "react";
import { useAccount } from "wagmi";

import { useTorAttestation } from "../hooks/useTorAttestation";
import { EPortalStep, EVerificationPath } from "../types";

import { AttestationLanding } from "./AttestationLanding";
import { AttestationSuccess } from "./AttestationSuccess";
import { MockVerificationTimer } from "./MockVerificationTimer";
import { PortalComplete } from "./PortalComplete";
import { PortalHeader } from "./PortalHeader";
import { PortalStepIndicator } from "./PortalStepIndicator";
import { VerificationFlow } from "./VerificationFlow";

export const AttestationPortal = (): JSX.Element => {
  const { address } = useAccount();
  const { attest, isAttesting } = useTorAttestation();

  const [step, setStep] = useState<EPortalStep>(EPortalStep.LANDING);
  const [selectedPath, setSelectedPath] = useState<EVerificationPath | null>(null);
  const [attestationUID, setAttestationUID] = useState<string | null>(null);

  const handleSelectPath = useCallback((path: EVerificationPath) => {
    setSelectedPath(path);
    setStep(EPortalStep.PATH_SELECTED);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedPath(null);
    setStep(EPortalStep.LANDING);
  }, []);

  const handleVerified = useCallback(async () => {
    setStep(EPortalStep.ATTESTING);
    const uid = await attest();
    setAttestationUID(uid);
    setStep(EPortalStep.ATTESTED);
  }, [attest]);

  const handleContinue = useCallback(() => {
    setStep(EPortalStep.COMPLETE);
  }, []);

  const handleRestart = useCallback(() => {
    setStep(EPortalStep.LANDING);
    setSelectedPath(null);
    setAttestationUID(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <PortalHeader />

      <main className="mx-auto max-w-2xl px-4 py-10">
        <div className="mb-8 flex justify-center">
          <PortalStepIndicator currentStep={step} />
        </div>

        {step === EPortalStep.LANDING && <AttestationLanding onSelectPath={handleSelectPath} />}

        {step === EPortalStep.PATH_SELECTED && selectedPath && (
          <VerificationFlow path={selectedPath} onBack={handleBack} onVerified={handleVerified} />
        )}

        {(step === EPortalStep.ATTESTING || isAttesting) && (
          <div className="flex flex-col items-center gap-6 py-12">
            <div className="w-full max-w-sm">
              <MockVerificationTimer message="Issuing attestation on-chain…" />
            </div>

            <p className="font-mono text-xs text-gray-600">Submitting EAS attestation to your wallet address</p>
          </div>
        )}

        {step === EPortalStep.ATTESTED && attestationUID && (
          <AttestationSuccess attestationUID={attestationUID} onContinue={handleContinue} />
        )}

        {step === EPortalStep.COMPLETE && address && attestationUID && (
          <PortalComplete address={address} attestationUID={attestationUID} onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
};
