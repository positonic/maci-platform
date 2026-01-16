import { config } from "~/config";

/**
 * WAAP SDK Configuration
 * See: https://docs.wallet.human.tech/quick-start
 */
export const waapConfig = {
  // App name displayed in WAAP modal
  appName: config.eventName,

  // Authentication methods to enable
  authMethods: ["email", "phone", "social"] as const,

  // Allowed social login providers
  allowedSocialProviders: ["google", "twitter", "discord", "github"] as const,

  // UI configuration
  darkMode: false,

  // Use production environment
  useStaging: false,
};

/**
 * Type for WAAP configuration
 */
export type WaaPConfig = typeof waapConfig;
