import axios from 'axios';
import { ImageData } from './types';

const UNSPLASH_API = 'https://api.unsplash.com';
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || '';

/**
 * Fetch a random image from Unsplash based on keywords
 */
export async function fetchImageFromUnsplash(keywords: string[]): Promise<ImageData> {
  try {
    // Join keywords for search query
    const query = keywords.join(' ');

    const response = await axios.get(`${UNSPLASH_API}/photos/random`, {
      params: {
        query,
        count: 1,
        ...(ACCESS_KEY && { client_id: ACCESS_KEY }),
      },
    });

    const photo = response.data;

    return {
      url: photo.urls.regular,
      width: photo.width,
      height: photo.height,
      photographer: photo.user?.name || 'Unknown',
      attribution: photo.links?.html || '',
    };
  } catch (error) {
    console.error('Error fetching from Unsplash:', error);
    // Return a default placeholder
    return getPlaceholderImage();
  }
}

/**
 * Get a placeholder image when API fails
 */
function getPlaceholderImage(): ImageData {
  return {
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=900&fit=crop',
    width: 1200,
    height: 900,
    photographer: 'Unsplash',
    attribution: 'https://unsplash.com',
  };
}

/**
 * Fetch image based on vibe
 */
export async function fetchFlyerImage(vibe: string): Promise<ImageData> {
  // Map vibes to image keywords
  const vibeKeywords: Record<string, string[]> = {
    sporty: ['action', 'sports', 'dynamic', 'energetic'],
    retro: ['vintage', 'retro', 'nostalgia', 'warm'],
    minimalist: ['minimalist', 'simple', 'clean', 'modern'],
    energetic: ['vibrant', 'colorful', 'playful', 'fun'],
    professional: ['professional', 'corporate', 'business', 'elegant'],
  };

  const keywords = vibeKeywords[vibe] || vibeKeywords.sporty;
  return fetchImageFromUnsplash(keywords);
}
