'use client';

import { useState, useRef, useEffect } from 'react';
import { CropData, ImageData } from '@/lib/types';
import ReactImageCrop, { Crop } from 'react-image-crop';

interface CropToolProps {
  image: ImageData;
  cropData: CropData;
  onChange: (crop: CropData) => void;
}

export default function CropTool({ image, cropData, onChange }: CropToolProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // Initialize crop from cropData
    setCrop({
      unit: (cropData.unit || '%') as '%' | 'px',
      width: cropData.width,
      height: cropData.height,
      x: cropData.x,
      y: cropData.y,
    });
  }, [cropData]);

  const handleCropChange = (newCrop: Crop) => {
    setCrop(newCrop);
    onChange({
      x: Math.round(newCrop.x ?? 0),
      y: Math.round(newCrop.y ?? 0),
      width: Math.round(newCrop.width ?? 100),
      height: Math.round(newCrop.height ?? 100),
      unit: (newCrop.unit as 'px' | '%') || '%',
    });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Crop Image</h3>
      <div className="bg-white rounded-lg overflow-hidden">
        <ReactImageCrop
          crop={crop}
          onChange={handleCropChange}
          aspect={1.2} // Portrait flyer aspect ratio
        >
          <img src={image.url} alt="Crop preview" />
        </ReactImageCrop>
      </div>
      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <p>
          X: {crop.x}%, Y: {crop.y}%
        </p>
        <p>
          Width: {crop.width}%, Height: {crop.height}%
        </p>
      </div>
    </div>
  );
}
