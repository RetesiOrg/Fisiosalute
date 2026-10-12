export const CONSENT_KEY = 'fisiosalute-consent-v1';
export const CONSENT_VERSION = 1;
export type Consent = { version: number; maps: boolean; expires: number };
export function parseConsent(raw: string | null, now = Date.now()): Consent | null {
  try {
    const value = JSON.parse(raw ?? 'null');
    return value?.version === CONSENT_VERSION && typeof value.maps === 'boolean'
      && Number.isFinite(value.expires) && value.expires > now ? value : null;
  } catch { return null; }
}
export function newConsent(maps: boolean, now = new Date()): Consent {
  const expires = new Date(now);
  expires.setMonth(expires.getMonth() + 6);
  return { version: CONSENT_VERSION, maps, expires: expires.getTime() };
}
