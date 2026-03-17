import { NextRequest, NextResponse } from 'next/server';
import { fetchFlyerImage } from '@/lib/unsplashClient';

export async function POST(request: NextRequest) {
  try {
    const { vibe } = await request.json();

    if (!vibe) {
      return NextResponse.json(
        { error: 'Vibe is required' },
        { status: 400 }
      );
    }

    const imageData = await fetchFlyerImage(vibe);

    return NextResponse.json(imageData);
  } catch (error) {
    console.error('Error in fetch-image API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    );
  }
}
