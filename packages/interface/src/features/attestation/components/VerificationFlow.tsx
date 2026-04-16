import { EVerificationPath, type IPathProps } from "../types";

import { CommunityVouchPath } from "./paths/CommunityVouchPath";
import { EventAttendancePath } from "./paths/EventAttendancePath";
import { GitLabPath } from "./paths/GitLabPath";
import { MailingListPath } from "./paths/MailingListPath";
import { RelayOperatorPath } from "./paths/RelayOperatorPath";

interface IVerificationFlowProps extends IPathProps {
  path: EVerificationPath;
  onBack: () => void;
}

export const VerificationFlow = ({ path, onVerified, onBack }: IVerificationFlowProps): JSX.Element => {
  const PathComponent = {
    [EVerificationPath.GITLAB]: GitLabPath,
    [EVerificationPath.RELAY]: RelayOperatorPath,
    [EVerificationPath.MAILING_LIST]: MailingListPath,
    [EVerificationPath.VOUCH]: CommunityVouchPath,
    [EVerificationPath.EVENT]: EventAttendancePath,
  }[path];

  return (
    <div className="flex flex-col gap-6">
      <button
        className="flex w-fit items-center gap-1.5 font-mono text-xs text-gray-500 transition-colors hover:text-gray-300"
        type="button"
        onClick={onBack}
      >
        <svg fill="none" height="14" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" width="14">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Choose different path
      </button>

      <PathComponent onVerified={onVerified} />
    </div>
  );
};
