import { DateTime } from 'luxon';

export function generateRandomDate(): Date {
  return DateTime.fromMillis(generateRandomNumber()).toJSDate();
}

/**
 *
 * @param digitLength Please enter a natural number (>= 1).
 * @returns
 */
export function generateRandomNumber(
  digitLength: number = 3,
): number {
  const multiplicand = Math.random();
  const multiplier = Number('1' + '0'.repeat(digitLength));

  return Math.ceil(multiplicand * multiplier);
}
