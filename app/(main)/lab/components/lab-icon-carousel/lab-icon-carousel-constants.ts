// ============================================
// LAB ICON CAROUSEL CONSTANTS (0.5x scale of original)
// ============================================

// Main size constants - scaled down for lab container
export const LAB_ICON_SIZE_FOCUSED = 60;
export const LAB_CIRCLE_RADIUS = 180;

// Pill dimensions - derived from icon size
export const LAB_PILL_PADDING = 4;
export const LAB_PILL_GAP = 26;
export const LAB_PILL_WIDTH = (LAB_ICON_SIZE_FOCUSED * 2) + (LAB_PILL_PADDING * 2) + LAB_PILL_GAP;
export const LAB_PILL_HEIGHT = LAB_ICON_SIZE_FOCUSED + (LAB_PILL_PADDING * 2);

// Container dimensions
export const LAB_CONTAINER_WIDTH = 500;
export const LAB_CONTAINER_HEIGHT = 350;

// Logo size inside carousel icons
export const LAB_LOGO_SIZE = Math.round(LAB_ICON_SIZE_FOCUSED * 0.5);

// Lab item metadata
export const LAB_ITEM_TITLE = 'Icon Carousel';
export const LAB_ITEM_DESCRIPTION = 'Orbiting icons with shine effects';
