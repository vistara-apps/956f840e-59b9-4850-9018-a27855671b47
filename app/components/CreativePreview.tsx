'use client';

import { motion } from 'framer-motion';
import { Check, Instagram, Music } from 'lucide-react';

interface AdVariant {
  id: string;
  imageUrl: string;
  textOverlay: string;
  platformSpec: string;
  selected: boolean;
}

interface CreativePreviewProps {
  variants: AdVariant[];
  onVariantSelect: (variantId: string) => void;
  variant: 'single' | 'gallery';
}

export function CreativePreview({ variants, onVariantSelect, variant = 'gallery' }: CreativePreviewProps) {
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'tiktok':
        return <Music className="w-4 h-4" />;
      default:
        return <Instagram className="w-4 h-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return 'from-pink-500 to-purple-500';
      case 'tiktok':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-blue-500 to-purple-500';
    }
  };

  if (variant === 'single' && variants.length > 0) {
    const singleVariant = variants[0];
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-sm mx-auto"
      >
        <div className="relative bg-surface rounded-lg overflow-hidden shadow-card">
          <img
            src={singleVariant.imageUrl}
            alt="Ad variant"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-4 text-white">
              <p className="font-medium">{singleVariant.textOverlay}</p>
              <div className="flex items-center gap-2 mt-2">
                {getPlatformIcon(singleVariant.platformSpec)}
                <span className="text-xs capitalize">{singleVariant.platformSpec}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {variants.map((adVariant, index) => (
        <motion.div
          key={adVariant.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`
            relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300
            ${adVariant.selected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'}
          `}
          onClick={() => onVariantSelect(adVariant.id)}
        >
          {/* Selection Indicator */}
          {adVariant.selected && (
            <div className="absolute top-2 right-2 z-10 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}

          {/* Platform Badge */}
          <div className={`
            absolute top-2 left-2 z-10 px-2 py-1 rounded-full text-xs font-medium text-white
            bg-gradient-to-r ${getPlatformColor(adVariant.platformSpec)}
          `}>
            <div className="flex items-center gap-1">
              {getPlatformIcon(adVariant.platformSpec)}
              <span className="capitalize">{adVariant.platformSpec}</span>
            </div>
          </div>

          {/* Image */}
          <div className="aspect-square bg-surface">
            <img
              src={adVariant.imageUrl}
              alt={`Ad variant ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
            <div className="p-3 text-white w-full">
              <p className="text-sm font-medium line-clamp-2">
                {adVariant.textOverlay}
              </p>
            </div>
          </div>

          {/* Hover Effect */}
          <div className={`
            absolute inset-0 transition-opacity duration-300
            ${adVariant.selected ? 'bg-primary/20' : 'bg-transparent hover:bg-white/5'}
          `} />
        </motion.div>
      ))}
    </div>
  );
}
