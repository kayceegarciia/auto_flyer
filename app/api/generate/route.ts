import { NextRequest, NextResponse } from 'next/server';
import { renderTemplateToHTML } from '@/lib/templateRenderer';
import { renderToPNG, renderToPDF } from '@/lib/playgroundRenderer';
import { cropImageFromUrl, bufferToBase64 } from '@/lib/imageProcessor';
import { selectTemplate, getImageOrientation } from '@/lib/templateSelector';
import { getColorPalette } from '@/lib/vibeConfig';
import { FloorGenerationRequest } from '@/lib/types';

// Use non-local logo for now; in production, serve from /public/logos
const DEFAULT_LOGO_URL = '/logos/default-logo.png';

export async function POST(request: NextRequest) {
  try {
    const data: FloorGenerationRequest = await request.json();

    // Validate required fields (imageUrl is NO LONGER required - new templates use solid colors)
    if (
      !data.eventName ||
      !data.date ||
      !data.time ||
      !data.location ||
      !data.vibe ||
      !data.outputFormat
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get color palette (vibe or custom)
    const colorPalette =
      data.colorMode === 'custom' && data.customColors
        ? data.customColors
        : getColorPalette(data.vibe);

    // Get template (default to hero)
    const template = (data as any).template || 'hero';

    // Render template to HTML
    // New templates don't use imageUrl or cropData - they use solid colors and SVG decorations
    const htmlContent = await renderTemplateToHTML({
      event: data,
      colorPalette,
      logoUrl: DEFAULT_LOGO_URL,
      template,
      imageUrl: '',
      cropData: { x: 0, y: 0, width: 100, height: 100 },
    });

    // Render HTML to PNG or PDF
    let outputBuffer: Buffer;
    let mimeType: string;
    let fileExtension: string;

    if (data.outputFormat === 'pdf') {
      outputBuffer = await renderToPDF(htmlContent);
      mimeType = 'application/pdf';
      fileExtension = 'pdf';
    } else {
      outputBuffer = await renderToPNG(htmlContent);
      mimeType = 'image/png';
      fileExtension = 'png';
    }

    // Return file as response
    const filename = `${data.eventName.replace(/\s+/g, '_')}_flyer.${fileExtension}`;

    return new NextResponse(outputBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error in generate API:', error);
    return NextResponse.json(
      { error: `Failed to generate flyer: ${error}` },
      { status: 500 }
    );
  }
}
