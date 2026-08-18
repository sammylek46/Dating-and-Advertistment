export const MINIMUM_AGE = 18;

export function isAtLeastAge(dateOfBirth: Date, minimumAge = MINIMUM_AGE, today = new Date()): boolean {
  const birthDate = Date.UTC(dateOfBirth.getUTCFullYear(), dateOfBirth.getUTCMonth(), dateOfBirth.getUTCDate());
  const threshold = Date.UTC(today.getUTCFullYear() - minimumAge, today.getUTCMonth(), today.getUTCDate());
  return birthDate <= threshold;
}
