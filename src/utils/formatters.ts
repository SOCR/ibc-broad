
/**
 * Formats a number as a currency string with dollar sign
 * @param value Number to format as currency
 * @returns Formatted currency string
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Formats a number as a percentage string
 * @param value Number to format as percentage (e.g., 0.05 for 5%)
 * @param digits Number of decimal digits to display
 * @returns Formatted percentage string
 */
export function formatPercent(value: number, digits: number = 1): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits
  }).format(value);
}

/**
 * Formats a date object or ISO date string to a readable format
 * @param date Date object or ISO date string
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(dateObj);
}
