export interface StreamingConfig {
  streamingSpeed: number;
  maxWidth: number;
  maxLines: number;
  scaleFactorPerLine: number;
  maxVisibleCompletedLines: number; // Range: 2-6
}

export interface CompletedLine {
  text: string;
  id: number;
}

export interface AnimatedChar {
  char: string;
  id: number;
}
