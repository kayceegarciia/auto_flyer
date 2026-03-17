import sharp from 'sharp';
import axios from 'axios';
import { CropData } from './types';

/**
 * Download image from URL and crop it
 */
export async function cropImageFromUrl(
  imageUrl: string,
  cropData: CropData,
  targetWidth: number = 1080,
  targetHeight: number = 1350
): Promise<Buffer> {
  try {
    // Download image
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });

    const imageBuffer = Buffer.from(response.data);

    // Get image metadata to calculate crop dimensions
    const metadata = await sharp(imageBuffer).metadata();
    const imgWidth = metadata.width || targetWidth;
    const imgHeight = metadata.height || targetHeight;

    // Calculate crop dimensions in pixels based on percentage
    let cropX = 0;
    let cropY = 0;
    let cropW = imgWidth;
    let cropH = imgHeight;

    if (cropData.unit === '%') {
      cropX = Math.round((cropData.x / 100) * imgWidth);
      cropY = Math.round((cropData.y / 100) * imgHeight);
      cropW = Math.round((cropData.width / 100) * imgWidth);
      cropH = Math.round((cropData.height / 100) * imgHeight);
    } else {
      cropX = cropData.x;
      cropY = cropData.y;
      cropW = cropData.width;
      cropH = cropData.height;
    }

    // Ensure crop stays within bounds
    cropX = Math.max(0, Math.min(cropX, imgWidth - 1));
    cropY = Math.max(0, Math.min(cropY, imgHeight - 1));
    cropW = Math.min(cropW, imgWidth - cropX);
    cropH = Math.min(cropH, imgHeight - cropY);

    // Crop image and resize to target dimensions
    const croppedImage = await sharp(imageBuffer)
      .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
      .resize(targetWidth, targetHeight, {
        fit: 'cover',
        position: 'center',
      })
      .toBuffer();

    return croppedImage;
  } catch (error) {
    console.error('Error cropping image:', error);
    throw new Error('Failed to process image');
  }
}

/**
 * Convert image buffer to data URL
 */
export function bufferToDataUrl(buffer: Buffer, mimeType: string = 'image/png'): string {
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

/**
 * Convert image buffer to base64 string
 */
export function bufferToBase64(buffer: Buffer): string {
  return buffer.toString('base64');
}
