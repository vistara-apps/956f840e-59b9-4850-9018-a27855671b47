'use client';

import { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
  variant?: 'default';
}

export function ImageUploader({ onImageUpload, variant = 'default' }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      handleFileUpload(imageFile);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    
    try {
      // Create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      
      // In a real app, upload to Pinata/IPFS here
      // const uploadedUrl = await uploadToPinata(file);
      
      // For demo, use the local URL
      onImageUpload(imageUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
  };

  if (uploadedImage) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-md mx-auto"
      >
        <div className="relative">
          <img
            src={uploadedImage}
            alt="Uploaded product"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-text-primary mb-2">Image Uploaded Successfully!</h3>
          <p className="text-sm text-text-secondary">
            Select your target platforms to generate ad variants.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-md mx-auto"
    >
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${isDragging ? 'border-primary bg-primary/10' : 'border-white/20'}
          ${isUploading ? 'pointer-events-none opacity-50' : 'hover:border-primary/50'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="space-y-4">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="text-text-secondary">Uploading image...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              {isDragging ? (
                <Upload className="w-12 h-12 text-primary" />
              ) : (
                <ImageIcon className="w-12 h-12 text-text-secondary" />
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Upload Product Image
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Drag and drop your product image here, or click to select
              </p>
            </div>

            <div className="space-y-3">
              <label className="btn-primary cursor-pointer inline-block">
                Choose File
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
              
              <p className="text-xs text-text-secondary">
                Supports JPG, PNG, GIF up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
