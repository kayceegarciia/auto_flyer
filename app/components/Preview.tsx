'use client';

import { EventData, CropData, ImageData, TemplateType } from '@/lib/types';
import { getVibe } from '@/lib/vibeConfig';
import { useState } from 'react';

interface PreviewProps {
  event: EventData;
  image: ImageData;
  cropData: CropData;
  onCropChange: (crop: CropData) => void;
}

function getTextColor(color: string): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#1A1A1A' : '#FFFFFF';
}

export default function Preview({ event, image, cropData, onCropChange }: PreviewProps) {
  const vibe = getVibe(event.vibe);
  const colorPalette = event.colorMode === 'custom' && event.customColors
    ? event.customColors
    : vibe.colorPalette;

  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('hero');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...event,
          template: selectedTemplate,
          outputFormat: 'png',
        }),
      });

      if (!response.ok) throw new Error('Failed to generate flyer');
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${event.eventName.replace(/\s+/g, '_')}_flyer.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      alert(`Error generating flyer: ${error}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 sticky top-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Preview & Customize</h2>

      {/* Template Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Template</label>
        <div className="flex gap-4">
          {['hero', 'split'].map((tmpl) => (
            <button
              key={tmpl}
              onClick={() => setSelectedTemplate(tmpl as TemplateType)}
              className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium transition-all capitalize ${
                selectedTemplate === tmpl
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {tmpl}
            </button>
          ))}
        </div>
      </div>

      {/* Live Preview - Shows color palette and flyer details */}
      <div className="mb-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Flyer Preview Info</h3>
        <div
          className="aspect-[9/13.5] bg-white rounded-lg overflow-hidden shadow-md mx-auto p-6 flex flex-col justify-between"
          style={{
            maxWidth: '280px',
            backgroundColor: colorPalette.background,
            color: getTextColor(colorPalette.background),
          }}
        >
          <div>
            <h4 className="font-bold text-lg line-clamp-2">{event.eventName}</h4>
            <p className="text-xs opacity-90 line-clamp-2 mt-2">{event.description}</p>
          </div>

          <div className="space-y-2 text-xs">
            <p>
              <strong>📅 Date:</strong> {event.date}
            </p>
            <p>
              <strong>⏰ Time:</strong> {event.time}
            </p>
            <p>
              <strong>📍 Location:</strong> {event.location}
            </p>
          </div>

          <div className="text-center text-xs opacity-75">
            <strong>Vibe:</strong> {vibe.name}
          </div>
        </div>
      </div>

      {/* Color Palette Display */}
      <div className="mb-6 bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Vibe Colors (Your flyer will use 2-3 of these)</h3>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(colorPalette).map(([key, color]) => (
            <div key={key} className="text-center">
              <div
                className="w-full h-12 rounded border border-gray-300 mb-1"
                style={{ backgroundColor: color }}
              />
              <p className="text-xs text-gray-600 capitalize">{key}</p>
              <p className="text-xs font-mono text-gray-500">{color}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating || !event.eventName}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors"
      >
        {isGenerating ? 'Generating Flyer...' : '✨ Generate & Download Flyer'}
      </button>
      
      <p className="text-xs text-gray-500 text-center mt-3">
        💡 Each flyer uses a random layout (4 variants) with event-specific emojis and decorative elements!
      </p>
    </div>
  );
}
