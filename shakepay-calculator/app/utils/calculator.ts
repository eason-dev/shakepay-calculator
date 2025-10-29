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
 * Official Shakepay rewards lookup table for days 1-364
 * Source: https://legal.shakepay.com/master/rewards
 */
const REWARDS_TABLE: { [key: number]: number } = {
  1: 21, 2: 29, 3: 34, 4: 38, 5: 41, 6: 45, 7: 48, 8: 51, 9: 54, 10: 56,
  11: 59, 12: 62, 13: 64, 14: 67, 15: 69, 16: 71, 17: 74, 18: 76, 19: 78, 20: 80,
  21: 82, 22: 85, 23: 87, 24: 89, 25: 91, 26: 93, 27: 95, 28: 97, 29: 99, 30: 100,
  31: 105, 32: 108, 33: 110, 34: 112, 35: 114, 36: 116, 37: 118, 38: 120, 39: 122, 40: 123,
  41: 125, 42: 126, 43: 128, 44: 129, 45: 131, 46: 132, 47: 133, 48: 135, 49: 136, 50: 137,
  51: 139, 52: 140, 53: 141, 54: 142, 55: 144, 56: 145, 57: 146, 58: 147, 59: 148, 60: 150,
  61: 151, 62: 152, 63: 153, 64: 154, 65: 155, 66: 156, 67: 157, 68: 158, 69: 159, 70: 160,
  71: 162, 72: 163, 73: 164, 74: 165, 75: 166, 76: 167, 77: 168, 78: 169, 79: 170, 80: 171,
  81: 172, 82: 173, 83: 174, 84: 175, 85: 175, 86: 176, 87: 177, 88: 178, 89: 179, 90: 180,
  91: 181, 92: 182, 93: 183, 94: 184, 95: 185, 96: 186, 97: 187, 98: 187, 99: 188, 100: 189,
  101: 190, 102: 191, 103: 192, 104: 193, 105: 194, 106: 195, 107: 195, 108: 196, 109: 197, 110: 198,
  111: 199, 112: 200, 113: 200, 114: 201, 115: 202, 116: 203, 117: 204, 118: 205, 119: 206, 120: 206,
  121: 207, 122: 208, 123: 209, 124: 210, 125: 210, 126: 211, 127: 212, 128: 213, 129: 214, 130: 214,
  131: 215, 132: 216, 133: 217, 134: 218, 135: 218, 136: 219, 137: 220, 138: 221, 139: 222, 140: 222,
  141: 223, 142: 224, 143: 225, 144: 225, 145: 226, 146: 227, 147: 228, 148: 228, 149: 229, 150: 230,
  151: 231, 152: 231, 153: 232, 154: 233, 155: 234, 156: 234, 157: 235, 158: 236, 159: 237, 160: 237,
  161: 238, 162: 239, 163: 240, 164: 240, 165: 241, 166: 242, 167: 243, 168: 243, 169: 244, 170: 245,
  171: 245, 172: 246, 173: 247, 174: 248, 175: 248, 176: 249, 177: 250, 178: 250, 179: 251, 180: 252,
  181: 253, 182: 253, 183: 254, 184: 255, 185: 255, 186: 256, 187: 257, 188: 257, 189: 258, 190: 259,
  191: 260, 192: 260, 193: 261, 194: 262, 195: 262, 196: 263, 197: 264, 198: 264, 199: 265, 200: 266,
  201: 266, 202: 267, 203: 268, 204: 268, 205: 269, 206: 270, 207: 270, 208: 271, 209: 272, 210: 272,
  211: 273, 212: 274, 213: 274, 214: 275, 215: 276, 216: 276, 217: 277, 218: 278, 219: 278, 220: 279,
  221: 280, 222: 280, 223: 281, 224: 282, 225: 282, 226: 283, 227: 284, 228: 284, 229: 285, 230: 286,
  231: 286, 232: 287, 233: 288, 234: 288, 235: 289, 236: 289, 237: 290, 238: 291, 239: 291, 240: 292,
  241: 293, 242: 293, 243: 294, 244: 295, 245: 295, 246: 296, 247: 296, 248: 297, 249: 298, 250: 298,
  251: 299, 252: 300, 253: 300, 254: 301, 255: 301, 256: 302, 257: 303, 258: 303, 259: 304, 260: 305,
  261: 305, 262: 306, 263: 306, 264: 307, 265: 308, 266: 308, 267: 309, 268: 310, 269: 310, 270: 311,
  271: 311, 272: 312, 273: 313, 274: 313, 275: 314, 276: 314, 277: 315, 278: 316, 279: 316, 280: 317,
  281: 317, 282: 318, 283: 319, 284: 319, 285: 320, 286: 320, 287: 321, 288: 322, 289: 322, 290: 323,
  291: 323, 292: 324, 293: 325, 294: 325, 295: 326, 296: 326, 297: 327, 298: 328, 299: 328, 300: 329,
  301: 329, 302: 330, 303: 331, 304: 331, 305: 332, 306: 332, 307: 333, 308: 334, 309: 334, 310: 335,
  311: 335, 312: 336, 313: 336, 314: 337, 315: 338, 316: 338, 317: 339, 318: 339, 319: 340, 320: 341,
  321: 341, 322: 342, 323: 342, 324: 343, 325: 343, 326: 344, 327: 345, 328: 345, 329: 345, 330: 346,
  331: 346, 332: 347, 333: 347, 334: 348, 335: 349, 336: 349, 337: 350, 338: 350, 339: 351, 340: 351,
  341: 352, 342: 352, 343: 352, 344: 353, 345: 353, 346: 354, 347: 355, 348: 355, 349: 356, 350: 357,
  351: 357, 352: 358, 353: 358, 354: 359, 355: 359, 356: 360, 357: 360, 358: 361, 359: 362, 360: 362,
  361: 363, 362: 363, 363: 364, 364: 364,
};

/**
 * Calculate sats earned for a specific day based on the streak
 * - Days 1-364: Use official rewards table
 * - Days 365-1000: Sats equal the day number
 * - Day 1000+: Constant 1000 sats per day
 */
export function getSatsForDay(day: number): number {
  if (day <= 0) return 0;
  if (day >= 1000) return 1000;

  // Days 1-364: use lookup table
  if (day <= 364) {
    return REWARDS_TABLE[day] || 0;
  }

  // Days 365-999: sats = day number
  return day;
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
