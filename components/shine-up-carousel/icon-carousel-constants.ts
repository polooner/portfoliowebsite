import type { CarouselIcon } from './icon-carousel-types';

// ============================================
// MAIN SIZE CONSTANT - adjust this to resize everything
// ============================================
export const ICON_SIZE_FOCUSED = 120;

// Derived constants - automatically adjust based on ICON_SIZE_FOCUSED
export const PILL_PADDING = 8; // padding inside the pill around icons
export const PILL_GAP = 52; // gap between the two icons in the pill
export const PILL_WIDTH = (ICON_SIZE_FOCUSED * 2) + (PILL_PADDING * 2) + PILL_GAP;
export const PILL_HEIGHT = ICON_SIZE_FOCUSED + (PILL_PADDING * 2);

// Glow effect sizes (relative to icon size)
export const GLOW_RING_SIZE = ICON_SIZE_FOCUSED + 20;
export const GLOW_RING_OFFSET = 10; // how much larger than the icon (half of the difference)

// Logo size inside the Minerva button (slightly smaller than button)
export const LOGO_SIZE = Math.round(ICON_SIZE_FOCUSED * 0.55);

// Default placeholder icons
export const DEFAULT_ICONS: CarouselIcon[] = [
  { id: '1', label: 'Integration 1', icon: '?' },
  { id: '2', label: 'Integration 2', icon: '?' },
  { id: '3', label: 'Integration 3', icon: '?' },
  { id: '4', label: 'Integration 4', icon: '?' },
  { id: '5', label: 'Integration 5', icon: '?' },
  { id: '6', label: 'Integration 6', icon: '?' },
];

// Display text for each icon label in the animated text pill
export const ICON_DISPLAY_TEXT: Record<string, string> = {
  'Employment': 'Verified employment',
  'Location': 'Confirmed location',
  'Housing': 'Housing verified',
  'Experience': 'Work experience',
  'Education': 'Education verified',
  'Financial': 'Found credit score',
  'Vehicle': 'Vehicle ownership',
  'Health': 'Health profile',
  'Shopping': 'Purchase history',
  'Travel': 'Travel patterns',
  'Mobile': 'Mobile verified',
  'Family': 'Family composition',
  'Income': 'Estimated net worth',
  'Address': 'Address confirmed',
  'Age': 'Age verified',
  'Wealth': 'Assessed wealth',
};
