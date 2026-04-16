import { EPortalStep } from "../types";

const STEPS = [
  { key: EPortalStep.LANDING, label: "Connect" },
  { key: EPortalStep.PATH_SELECTED, label: "Verify" },
  { key: EPortalStep.ATTESTING, label: "Attest" },
  { key: EPortalStep.COMPLETE, label: "Done" },
];

const STEP_ORDER = [EPortalStep.LANDING, EPortalStep.PATH_SELECTED, EPortalStep.ATTESTING, EPortalStep.COMPLETE];

interface IPortalStepIndicatorProps {
  currentStep: EPortalStep;
}

export const PortalStepIndicator = ({ currentStep }: IPortalStepIndicatorProps): JSX.Element => {
  const currentIndex = STEP_ORDER.indexOf(currentStep === EPortalStep.ATTESTED ? EPortalStep.ATTESTING : currentStep);

  return (
    <div className="flex items-center gap-2">
      {STEPS.map((step, i) => {
        const isDone = i < currentIndex;
        const isActive = i === currentIndex;

        return (
          <div key={step.key} className="flex items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={[
                  "flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs transition-colors",
                  isDone ? "bg-[#7D4698] text-white" : "",
                  isActive ? "border-2 border-[#7D4698] text-[#7D4698]" : "",
                  !isDone && !isActive ? "border border-gray-600 text-gray-600" : "",
                ].join(" ")}
              >
                {isDone ? "✓" : i + 1}
              </div>

              <span
                className={[
                  "font-mono text-xs uppercase tracking-wider",
                  // eslint-disable-next-line no-nested-ternary
                  isActive ? "text-[#7D4698]" : isDone ? "text-gray-400" : "text-gray-600",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div className={["mb-5 h-px w-8 transition-colors", isDone ? "bg-[#7D4698]" : "bg-gray-700"].join(" ")} />
            )}
          </div>
        );
      })}
    </div>
  );
};
