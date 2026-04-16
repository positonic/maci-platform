import { type ReactNode } from "react";

interface IVerificationPathCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const VerificationPathCard = ({
  icon,
  title,
  description,
  badge = undefined,
  onClick,
  disabled = false,
}: IVerificationPathCardProps): JSX.Element => (
  <button
    className={[
      "group w-full rounded-lg border bg-[#111111] p-5 text-left transition-all",
      disabled
        ? "cursor-not-allowed border-gray-800 opacity-40"
        : "cursor-pointer border-gray-700 hover:border-[#7D4698] hover:bg-[#1a1a1a]",
    ].join(" ")}
    disabled={disabled}
    type="button"
    onClick={onClick}
  >
    <div className="flex items-start gap-4">
      <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-[#1a1a1a] text-[#7D4698] transition-colors group-hover:border-[#7D4698]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span className="font-mono text-sm font-semibold text-white">{title}</span>

          {badge && (
            <span className="rounded bg-[#7D4698]/20 px-1.5 py-0.5 font-mono text-xs text-[#7D4698]">{badge}</span>
          )}
        </div>

        <p className="text-xs leading-relaxed text-gray-400">{description}</p>
      </div>

      <svg
        className="mt-1 h-4 w-4 flex-shrink-0 text-gray-600 transition-colors group-hover:text-[#7D4698]"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  </button>
);
