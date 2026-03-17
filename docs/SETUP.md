# Setup Guide - Event Flyer Generator

## Prerequisites

- Node.js 18+ (recommended: 20.x LTS)
- npm or yarn package manager
- Unsplash API key (free tier available)

## Local Development Setup

### 1. Clone or Initialize the Project

```bash
cd auto_flyer
npm install
```

### 2. Get Unsplash API Key

1. Go to [https://unsplash.com/oauth/applications](https://unsplash.com/oauth/applications)
2. Create a new application (register if needed)
3. Accept the guidelines and create the app
4. Copy the **Access Key**

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
UNSPLASH_ACCESS_KEY=your-unsplash-api-key-here
VERCEL_URL=http://localhost:3000
```

Replace `your-unsplash-api-key-here` with your actual API key.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
auto_flyer/
├── app/
│   ├── api/
│   │   ├── generate/              # Flyer generation endpoint
│   │   └── fetch-image/           # Image fetching endpoint
│   ├── components/
│   │   ├── EventForm.tsx          # Main form component
│   │   ├── Preview.tsx            # Preview component
│   │   ├── ColorPicker.tsx        # Color picker UI
│   │   └── CropTool.tsx           # Image cropping tool
│   ├── page.tsx                   # Home page
│   └── layout.tsx                 # Root layout
├── config/
│   └── vibes.json                # Vibe configuration
├── lib/
│   ├── types.ts                  # TypeScript type definitions
│   ├── vibeConfig.ts             # Vibe utilities
│   ├── unsplashClient.ts         # Unsplash API client
│   ├── templateSelector.ts       # Template selection logic
│   ├── imageProcessor.ts         # Image processing (sharp)
│   ├── playgroundRenderer.ts     # Playwright rendering
│   └── templateRenderer.ts       # Template to HTML conversion
├── templates/
│   ├── HeroTemplate.tsx          # Hero template
│   └── SplitTemplate.tsx         # Split template
├── public/
│   └── logos/                    # Club logos directory
└── docs/
    └── SETUP.md                  # This file
```

## Features

✅ **Dynamic Vibe System**: 5 predefined vibes (Sporty, Retro, Minimalist, Energetic, Professional)
✅ **Color Customization**: Independent color picker for custom palettes
✅ **Image Fetching**: Automatic image fetching from Unsplash based on vibe
✅ **Interactive Cropping**: Real-time image crop tool with preview
✅ **Multiple Templates**: Hero and Split layout templates
✅ **Format Export**: PNG and PDF flyer generation
✅ **Live Preview**: Real-time preview of flyer design
✅ **Responsive Design**: Works on desktop and tablet

## API Endpoints

### POST `/api/fetch-image`

Fetch an image from Unsplash based on vibe.

**Request:**
```json
{
  "vibe": "sporty"
}
```

**Response:**
```json
{
  "url": "https://images.unsplash.com/...",
  "width": 1200,
  "height": 900,
  "photographer": "John Doe",
  "attribution": "https://unsplash.com/..."
}
```

### POST `/api/generate`

Generate and download a flyer as PNG or PDF.

**Request:**
```json
{
  "eventName": "Summer Festival",
  "date": "2026-06-21",
  "time": "18:00",
  "location": "Central Park, NYC",
  "description": "Join us for an amazing summer celebration",
  "vibe": "energetic",
  "colorMode": "custom",
  "customColors": {
    "primary": "#FF006E",
    "secondary": "#FB5607",
    "accent": "#FFBE0B",
    "background": "#F8F9FA"
  },
  "imageUrl": "https://images.unsplash.com/...",
  "cropData": {
    "x": 0,
    "y": 0,
    "width": 100,
    "height": 100,
    "unit": "%"
  },
  "outputFormat": "png"
}
```

**Response:**
Binary PNG or PDF file with appropriate headers.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"

### 3. Add Environment Variables

In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add: `UNSPLASH_ACCESS_KEY=your-key-here`
3. Click "Save"

### 4. Deploy

```bash
vercel deploy
```

Or push to main branch for automatic deployment.

## Troubleshooting

### Playwright Issues on Vercel

If you encounter Playwright errors on Vercel, you may need to install system dependencies or use a managed browser service like Browserless.

**Option 1: Add @playwright/test**
```bash
npm install --save-dev @playwright/test
```

**Option 2: Use Browserless API**
Install and configure the `browserless` package:
```bash
npm install browserless
```

### Unsplash API Rate Limits

The free tier of Unsplash allows:
- 50 requests/hour without authentication
- Unlimited with authentication (use your API key)

If hitting rate limits, ensure you've added your `UNSPLASH_ACCESS_KEY` to `.env.local` and Vercel.

### Image Cropping Not Working

Ensure `sharp` is installed:
```bash
npm install sharp
```

If issues persist on Vercel, it may require native module compilation. Consider using server-side image optimization.

## Development Tips

- **Hot Reload**: The dev server supports fast refresh. Edit components and see changes instantly.
- **Font Loading**: Templates use Google Fonts via `@import`. Ensure Font URLs are accessible.
- **Logo Placement**: Place logo images in `/public/logos/` and reference them in templates.
- **Custom Vibes**: Edit `/config/vibes.json` to add or modify vibes.

## Next Steps

- Add database persistence (save user flyers)
- Implement user authentication
- Add more templates (circular, modern, etc.)
- Create template editor UI
- Implement email delivery of flyers
- Add advanced image editing (filters, effects)

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Unsplash API Documentation](https://unsplash.com/napi/documentation)
- [Playwright Documentation](https://playwright.dev)

