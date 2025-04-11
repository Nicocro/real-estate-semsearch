
import React, { useState, useRef, useCallback } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
  className?: string;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImagesSelected, 
  className = '', 
  maxImages = 5 
}) => {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (newFiles.length === 0) return;
    
    // Limit the number of images
    const totalImages = images.length + newFiles.length;
    const filesToAdd = newFiles.slice(0, Math.max(0, maxImages - images.length));
    
    if (filesToAdd.length > 0) {
      const newImages = filesToAdd.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      setImages(prev => [...prev, ...newImages]);
      onImagesSelected(filesToAdd);
    }
  }, [images, maxImages, onImagesSelected]);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [handleFileChange]);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const removeImage = useCallback((index: number) => {
    setImages(prev => {
      // Release object URL to avoid memory leaks
      URL.revokeObjectURL(prev[index].preview);
      
      const newImages = [...prev];
      newImages.splice(index, 1);
      
      // Pass the updated file list to the parent
      onImagesSelected(newImages.map(img => img.file));
      
      return newImages;
    });
  }, [onImagesSelected]);
  
  return (
    <div className={`w-full ${className}`}>
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
        />
        
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <div className="mb-3 rounded-full bg-gray-100 p-3">
            <ImageIcon className="h-6 w-6 text-gray-500" />
          </div>
          <p className="mb-1 text-sm font-medium text-gray-900">
            Drop inspiration images here
          </p>
          <p className="text-xs text-gray-500 mb-3">
            PNG, JPG or WEBP (max. {maxImages} images)
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Upload className="h-4 w-4 mr-2 text-gray-500" />
            Upload images
          </button>
        </div>
      </div>
      
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="relative group rounded-lg overflow-hidden shadow-sm border border-gray-100 aspect-square"
            >
              <img 
                src={image.preview} 
                alt={`Preview ${index + 1}`} 
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 p-1 rounded-full bg-gray-900/40 text-white hover:bg-gray-900/60 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
