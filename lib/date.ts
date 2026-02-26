/**
 * Format a Date as "Weekday, DD Mon YYYY" in Dutch.
 * Example: "Zondag, 18 jan 2024"
 */
export function formatDutchDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

/**
 * Format a Date as "DD-MM-YYYY".
 * Example: "10-02-2024"
 */
export function formatShortDate(date: Date = new Date()): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}
