import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return formatter.format(date); // 1 January 2021
}

/**
 * @param {number} number Bytes to convert
 * @returns {string} Converted bytes
 * */
export const ConvertBytes = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (!bytes) return 'n/a';
  const i = parseInt(
    Math.floor(Math.log(bytes) / Math.log(1000)).toString()
  );
  return `${(bytes / Math.pow(1000, i)).toFixed(1)} ${sizes[i]}`;
};

/**
 * @param {number} number Number to convert
 * @returns {string} Converted number
 * */
export const ConvertNumber = (number) => {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    style: 'decimal',
    maximumFractionDigits: 2,
  }).format(number);
};
