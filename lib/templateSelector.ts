import { TemplateType, VibeKey } from './types';

/**
 * Select template based on vibe and image orientation
 */
export function selectTemplate(vibe: VibeKey, imageOrientation: 'portrait' | 'landscape'): TemplateType {
  // Vibe-based primary templates
  const vibeTemplates: Record<VibeKey, TemplateType[]> = {
    sporty: ['hero', 'split'],
    retro: ['split', 'hero'],
    minimalist: ['hero', 'split'],
    energetic: ['split', 'hero'],
    professional: ['hero', 'split'],
  };

  const templates = vibeTemplates[vibe] || ['hero', 'split'];

  // For portrait images, prefer split; for landscape, prefer hero
  if (imageOrientation === 'portrait') {
    return templates.includes('split') ? 'split' : 'hero';
  } else {
    return templates.includes('hero') ? 'hero' : 'split';
  }
}

/**
 * Detect image orientation from dimensions
 */
export function getImageOrientation(
  width: number,
  height: number
): 'portrait' | 'landscape' {
  const aspectRatio = width / height;
  // Portrait if aspect ratio < 1 (height > width)
  return aspectRatio < 1 ? 'portrait' : 'landscape';
}
