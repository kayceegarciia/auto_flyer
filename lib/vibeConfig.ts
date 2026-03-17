import vibesData from '@/config/vibes.json';
import { VibeKey, Vibe, VibesConfig, ColorPalette } from './types';

const vibes: VibesConfig = vibesData as VibesConfig;

export function getVibe(key: VibeKey): Vibe {
  const vibe = vibes[key];
  if (!vibe) {
    throw new Error(`Vibe "${key}" not found`);
  }
  return vibe;
}

export function getAllVibes(): Record<VibeKey, Vibe> {
  return vibes as Record<VibeKey, Vibe>;
}

export function getVibeNames(): VibeKey[] {
  return Object.keys(vibes) as VibeKey[];
}

export function getColorPalette(vibeKey: VibeKey): ColorPalette {
  return getVibe(vibeKey).colorPalette;
}

export function getFonts(vibeKey: VibeKey) {
  return getVibe(vibeKey).fonts;
}

export function getImageKeywords(vibeKey: VibeKey): string[] {
  return getVibe(vibeKey).imageKeywords;
}

export function getTemplates(vibeKey: VibeKey): string[] {
  return getVibe(vibeKey).templates;
}
