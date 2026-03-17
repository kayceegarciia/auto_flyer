'use client';

import { useState } from 'react';
import { ColorPalette } from '@/lib/types';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  onChange: (colors: ColorPalette) => void;
  defaultColors?: ColorPalette;
}

export default function ColorPicker({ onChange, defaultColors }: ColorPickerProps) {
  const [colors, setColors] = useState<ColorPalette>(
    defaultColors || {
      primary: '#FF6B35',
      secondary: '#004E89',
      accent: '#F7B801',
      background: '#FFFFFF',
    }
  );

  const [activeColor, setActiveColor] = useState<keyof ColorPalette>('primary');

  const handleColorChange = (color: string) => {
    const updated = { ...colors, [activeColor]: color };
    setColors(updated);
    onChange(updated);
  };

  const colorLabels: Record<keyof ColorPalette, string> = {
    primary: 'Primary Color',
    secondary: 'Secondary Color',
    accent: 'Accent Color',
    background: 'Background Color',
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {colorLabels[activeColor]}
        </label>
        <div className="flex gap-4">
          <div className="flex-1">
            <HexColorPicker color={colors[activeColor]} onChange={handleColorChange} />
          </div>
          <div className="space-y-2">
            {(Object.keys(colors) as Array<keyof ColorPalette>).map((colorKey) => (
              <button
                key={colorKey}
                onClick={() => setActiveColor(colorKey)}
                className={`w-20 h-10 rounded border-2 transition-all flex items-center justify-center text-xs font-mono ${
                  activeColor === colorKey
                    ? 'border-blue-500 ring-2 ring-blue-300'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: colors[colorKey] }}
                title={colorLabels[colorKey]}
              >
                {colorKey === activeColor && '✓'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hex Values</label>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(colors) as Array<keyof ColorPalette>).map((colorKey) => (
            <div key={colorKey}>
              <label className="text-xs text-gray-600 capitalize block mb-1">
                {colorLabels[colorKey]}
              </label>
              <input
                type="text"
                value={colors[colorKey]}
                onChange={(e) => {
                  const color = e.target.value;
                  if (color.match(/^#[0-9A-Fa-f]{6}$/)) {
                    const updated = { ...colors, [colorKey]: color };
                    setColors(updated);
                    onChange(updated);
                    setActiveColor(colorKey);
                  }
                }}
                className="w-full px-2 py-1 border border-gray-300 rounded font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="#000000"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
