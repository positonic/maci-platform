export enum EPortalStep {
  LANDING = "LANDING",
  PATH_SELECTED = "PATH_SELECTED",
  ATTESTING = "ATTESTING",
  ATTESTED = "ATTESTED",
  COMPLETE = "COMPLETE",
}

export enum EVerificationPath {
  GITLAB = "gitlab",
  RELAY = "relay",
  MAILING_LIST = "mailing_list",
  VOUCH = "vouch",
  EVENT = "event",
}

export interface IPathProps {
  onVerified: () => void;
}
