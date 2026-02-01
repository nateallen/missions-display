/**
 * Calculate years of service from a start date to now
 */
export function calculateYearsOfService(startDate: Date): number {
  const now = new Date();
  const start = new Date(startDate);

  // Calculate the difference in years
  let years = now.getFullYear() - start.getFullYear();

  // Adjust if the anniversary hasn't occurred yet this year
  const monthDiff = now.getMonth() - start.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < start.getDate())) {
    years--;
  }

  return Math.max(0, years); // Ensure non-negative
}
