/**
 * Shakepay ShakingSats Calculator Utilities
 * Based on: https://legal.shakepay.com/master/rewards
 */

export interface DayData {
  day: number;
  dailySats: number;
  totalSats: number;
  totalUSD: number;
  totalCAD: number;
}

export interface CalculationResult {
  totalSats: number;
  totalValueUSD: number;
  totalValueCAD: number;
  averageSatsPerDay: number;
  averageValuePerDayUSD: number;
  averageValuePerDayCAD: number;
  dailyData: DayData[];
}

/**
 * Calculate sats earned for a specific day based on the streak
 * Formula: Linear progression from 21 sats (day 1) to 1000 sats (day 1000)
 * After day 1000: constant 1000 sats per day
 */
export function getSatsForDay(day: number): number {
  if (day <= 0) return 0;
  if (day >= 1000) return 1000;

  // Linear interpolation: 21 sats on day 1, 1000 sats on day 1000
  // Formula: sats = 21 + (day - 1) * (1000 - 21) / (1000 - 1)
  const sats = 21 + (day - 1) * (979 / 999);
  return Math.round(sats);
}

/**
 * Calculate cumulative rewards for a given streak length
 */
export function calculateRewards(
  days: number,
  btcPriceUSD: number,
  usdToCAD: number = 1.35
): CalculationResult {
  let totalSats = 0;
  const dailyData: DayData[] = [];

  for (let day = 1; day <= days; day++) {
    const dailySats = getSatsForDay(day);
    totalSats += dailySats;

    const totalValueUSD = (totalSats / 100000000) * btcPriceUSD;
    const totalValueCAD = totalValueUSD * usdToCAD;

    dailyData.push({
      day,
      dailySats,
      totalSats,
      totalUSD: totalValueUSD,
      totalCAD: totalValueCAD,
    });
  }

  const averageSatsPerDay = totalSats / days;
  const totalValueUSD = (totalSats / 100000000) * btcPriceUSD;
  const totalValueCAD = totalValueUSD * usdToCAD;
  const averageValuePerDayUSD = totalValueUSD / days;
  const averageValuePerDayCAD = totalValueCAD / days;

  return {
    totalSats,
    totalValueUSD,
    totalValueCAD,
    averageSatsPerDay,
    averageValuePerDayUSD,
    averageValuePerDayCAD,
    dailyData,
  };
}

/**
 * Format number as currency
 */
export function formatCurrency(value: number, currency: 'USD' | 'CAD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format number with commas
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
