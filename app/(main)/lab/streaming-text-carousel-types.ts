export interface StreamingConfig {
  streamingSpeed: number;
  maxWidth: number;
  maxLines: number;
  scaleFactorPerLine: number;
}

export interface CompletedLine {
  text: string;
  id: number;
}

export interface AnimatedChar {
  char: string;
  id: number;
}
