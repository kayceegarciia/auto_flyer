'use client';

import { useState } from 'react';
import { EventData, CropData, ColorPalette, ImageData } from '@/lib/types';
import { getVibe, getVibeNames } from '@/lib/vibeConfig';
import Preview from './Preview';
import ColorPicker from './ColorPicker';

interface EventFormProps {
  onSubmit?: (data: EventData) => void;
}

export default function EventForm({ onSubmit }: EventFormProps) {
  const vibeNames = getVibeNames();
  
  const [formData, setFormData] = useState<EventData>({
    eventName: '',
    date: '',
    time: '',
    location: '',
    description: '',
    vibe: 'sporty',
    colorMode: 'vibe',
  });

  const [cropData, setCropData] = useState<CropData>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    unit: '%',
  });

  const [image, setImage] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVibeChange = (vibe: string) => {
    setFormData((prev) => ({
      ...prev,
      vibe: vibe as any,
    }));
  };

  const handleColorModeChange = (mode: 'vibe' | 'custom') => {
    setFormData((prev) => ({
      ...prev,
      colorMode: mode,
    }));
  };

  const handleCustomColorsChange = (colors: ColorPalette) => {
    setFormData((prev) => ({
      ...prev,
      customColors: colors,
    }));
  };

  const handleCropChange = (crop: CropData) => {
    setCropData(crop);
  };

  const handleFetchImage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/fetch-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vibe: formData.vibe }),
      });

      if (!response.ok) throw new Error('Failed to fetch image');
      const data = await response.json();
      setImage(data);
      setShowPreview(true);
    } catch (error) {
      alert(`Error fetching image: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold mb-8 text-gray-900">Create Your Flyer</h1>

            <form className="space-y-6">
              {/* Event Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  placeholder="e.g., Summer Music Festival"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Central Park, NYC"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of your event"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              {/* Vibe Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Vibe
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {vibeNames.map((vibe) => {
                    const vibeDetails = getVibe(vibe);
                    return (
                      <button
                        key={vibe}
                        type="button"
                        onClick={() => handleVibeChange(vibe)}
                        className={`p-3 text-left rounded-lg border-2 transition-all ${
                          formData.vibe === vibe
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{vibeDetails.name}</div>
                        <div className="text-xs text-gray-500">{vibeDetails.description}</div>
                        <div className="flex gap-1 mt-2">
                          {Object.values(vibeDetails.colorPalette).map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 rounded border border-gray-300"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Mode Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Colors</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="colorMode"
                      value="vibe"
                      checked={formData.colorMode === 'vibe'}
                      onChange={() => handleColorModeChange('vibe')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Use Vibe Colors</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="colorMode"
                      value="custom"
                      checked={formData.colorMode === 'custom'}
                      onChange={() => handleColorModeChange('custom')}
                      className="mr-2"
                    />
                    <span className="text-gray-700">Custom Colors</span>
                  </label>
                </div>
              </div>

              {/* Color Picker */}
              {formData.colorMode === 'custom' && (
                <ColorPicker onChange={handleCustomColorsChange} />
              )}

              {/* Fetch Image Button */}
              <button
                type="button"
                onClick={handleFetchImage}
                disabled={isLoading || !formData.eventName}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                {isLoading ? 'Fetching Image...' : 'Fetch Image & Preview'}
              </button>
            </form>
          </div>

          {/* Preview Section */}
          {showPreview && image && (
            <Preview
              event={formData}
              image={image}
              cropData={cropData}
              onCropChange={handleCropChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
