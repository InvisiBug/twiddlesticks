import type { CookieConsent } from "@/types";
const COOKIE_CONSENT_STORAGE_KEY = "twiddlesticks-cookie-consent";

export const getInitialCookieConsent = (): CookieConsent | null => {
  const savedConsent = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  if (savedConsent === "accepted" || savedConsent === "essential") {
    return savedConsent;
  }

  return null;
};

export const persistCookieConsent = (choice: CookieConsent) => {
  localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice);
};
