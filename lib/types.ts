// Vibe system types
export type VibeKey = 'sporty' | 'retro' | 'minimalist' | 'energetic' | 'professional';
export type TemplateType = 'hero' | 'split';

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface FontPair {
  primary: string;
  secondary: string;
}

export interface Vibe {
  name: string;
  description: string;
  colorPalette: ColorPalette;
  fonts: FontPair;
  imageKeywords: string[];
  templates: TemplateType[];
}

export interface VibesConfig {
  [key: string]: Vibe;
}

// Event form types
export interface EventData {
  eventName: string;
  date: string;
  time: string;
  location: string;
  description: string;
  vibe: VibeKey;
  colorMode: 'vibe' | 'custom';
  customColors?: ColorPalette;
}

export interface CropData {
  x: number;
  y: number;
  width: number;
  height: number;
  aspect?: number; // For tracking aspect ratio
  unit?: 'px' | '%'; // pixel or percentage
}

export interface ImageData {
  url: string;
  width: number;
  height: number;
  photographer?: string;
  attribution?: string;
}

export interface FloorGenerationRequest extends EventData {
  imageUrl: string;
  cropData: CropData;
  outputFormat: 'png' | 'pdf';
}

export interface FloorGenerationResponse {
  success: boolean;
  imageUrl?: string;
  imageData?: string; // base64 encoded image data
  format: 'png' | 'pdf';
  filename?: string;
  error?: string;
}

// Template props types
export interface TemplateProps {
  event: EventData;
  imageUrl: string;
  cropData: CropData;
  colorPalette: ColorPalette;
  logoUrl: string;
  template: TemplateType;
}
