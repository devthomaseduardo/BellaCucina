export type SupportedLanguage = "pt" | "en" | "it";

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ["pt", "en", "it"];

export function isSupportedLanguage(value: string | null | undefined): value is SupportedLanguage {
  return value === "pt" || value === "en" || value === "it";
}
