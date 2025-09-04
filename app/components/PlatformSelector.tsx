'use client';

import { Instagram, Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onPlatformChange: (platforms: string[]) => void;
  variant?: 'checkbox' | 'dropdown';
}

const platforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'from-pink-500 to-purple-500',
    specs: 'Square & Stories (1:1, 9:16)'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: Music,
    color: 'from-red-500 to-pink-500',
    specs: 'Vertical (9:16)'
  }
];

export function PlatformSelector({ selectedPlatforms, onPlatformChange, variant = 'checkbox' }: PlatformSelectorProps) {
  const handlePlatformToggle = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      onPlatformChange(selectedPlatforms.filter(id => id !== platformId));
    } else {
      onPlatformChange([...selectedPlatforms, platformId]);
    }
  };

  if (variant === 'dropdown') {
    return (
      <div className="relative">
        <select
          multiple
          className="input w-full"
          value={selectedPlatforms}
          onChange={(e) => {
            const selected = Array.from(e.target.selectedOptions, option => option.value);
            onPlatformChange(selected);
          }}
        >
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {platforms.map((platform, index) => {
        const Icon = platform.icon;
        const isSelected = selectedPlatforms.includes(platform.id);

        return (
          <motion.div
            key={platform.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-300
              ${isSelected 
                ? 'border-primary bg-primary/10 shadow-lg' 
                : 'border-white/20 hover:border-white/40 bg-surface/50'
              }
            `}
            onClick={() => handlePlatformToggle(platform.id)}
          >
            {/* Selection Indicator */}
            {isSelected && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            )}

            <div className="flex items-start gap-3">
              {/* Platform Icon */}
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${platform.color}
              `}>
                <Icon className="w-5 h-5 text-white" />
              </div>

              {/* Platform Details */}
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary mb-1">
                  {platform.name}
                </h3>
                <p className="text-xs text-text-secondary">
                  {platform.specs}
                </p>
              </div>
            </div>

            {/* Hover Effect */}
            <div className={`
              absolute inset-0 rounded-lg transition-opacity duration-300
              ${isSelected ? 'bg-primary/5' : 'hover:bg-white/5'}
            `} />
          </motion.div>
        );
      })}
    </div>
  );
}
