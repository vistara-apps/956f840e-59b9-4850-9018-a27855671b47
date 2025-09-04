'use client';

import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ImageUploader } from './components/ImageUploader';
import { CreativePreview } from './components/CreativePreview';
import { PlatformSelector } from './components/PlatformSelector';
import { SocialConnectionManager } from './components/SocialConnectionManager';
import { MetricCard } from './components/MetricCard';
import { motion, AnimatePresence } from 'framer-motion';

interface AdVariant {
  id: string;
  imageUrl: string;
  textOverlay: string;
  platformSpec: string;
  selected: boolean;
}

interface Campaign {
  id: string;
  originalImage: string;
  variants: AdVariant[];
  platforms: string[];
  status: 'draft' | 'generating' | 'ready' | 'posted';
}

export default function Home() {
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      originalImage: imageUrl,
      variants: [],
      platforms: [],
      status: 'draft'
    };
    setCurrentCampaign(newCampaign);
  };

  const handleGenerateVariants = async () => {
    if (!currentCampaign || selectedPlatforms.length === 0) return;
    
    setIsGenerating(true);
    try {
      // Simulate API call to generate variants
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockVariants: AdVariant[] = [
        {
          id: '1',
          imageUrl: currentCampaign.originalImage,
          textOverlay: 'Try this Amazing Product!',
          platformSpec: 'instagram',
          selected: false
        },
        {
          id: '2',
          imageUrl: currentCampaign.originalImage,
          textOverlay: 'Limited Time Offer - 50% Off!',
          platformSpec: 'tiktok',
          selected: false
        },
        {
          id: '3',
          imageUrl: currentCampaign.originalImage,
          textOverlay: 'Join Thousands of Happy Customers',
          platformSpec: 'instagram',
          selected: false
        },
        {
          id: '4',
          imageUrl: currentCampaign.originalImage,
          textOverlay: 'Transform Your Life Today',
          platformSpec: 'tiktok',
          selected: false
        }
      ];

      setCurrentCampaign(prev => prev ? {
        ...prev,
        variants: mockVariants,
        platforms: selectedPlatforms,
        status: 'ready'
      } : null);
    } catch (error) {
      console.error('Error generating variants:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVariantSelect = (variantId: string) => {
    setCurrentCampaign(prev => {
      if (!prev) return null;
      return {
        ...prev,
        variants: prev.variants.map(variant =>
          variant.id === variantId
            ? { ...variant, selected: !variant.selected }
            : variant
        )
      };
    });
  };

  const handlePostToSocial = async () => {
    if (!currentCampaign) return;
    
    const selectedVariants = currentCampaign.variants.filter(v => v.selected);
    if (selectedVariants.length === 0) return;

    // Simulate posting to social media
    setCurrentCampaign(prev => prev ? { ...prev, status: 'posted' } : null);
    
    // Here you would integrate with Neynar API for Farcaster posting
    console.log('Posting variants:', selectedVariants);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-slate-900 to-purple-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <AnimatePresence mode="wait">
          {!currentCampaign ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSection />
              <div className="mt-12 max-w-2xl mx-auto">
                <ImageUploader onImageUpload={handleImageUpload} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="campaign"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Campaign Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">
                    Campaign Dashboard
                  </h1>
                  <p className="text-text-secondary mt-2">
                    Status: <span className="capitalize font-medium text-accent">{currentCampaign.status}</span>
                  </p>
                </div>
                <button
                  onClick={() => setCurrentCampaign(null)}
                  className="btn-secondary"
                >
                  Start New Campaign
                </button>
              </div>

              {/* Platform Selection */}
              {currentCampaign.status === 'draft' && (
                <div className="card">
                  <h2 className="text-xl font-semibold mb-4">Select Target Platforms</h2>
                  <PlatformSelector
                    selectedPlatforms={selectedPlatforms}
                    onPlatformChange={setSelectedPlatforms}
                  />
                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={handleGenerateVariants}
                      disabled={selectedPlatforms.length === 0 || isGenerating}
                      className="btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? 'Generating Variants...' : 'Generate Ad Variants'}
                    </button>
                  </div>
                </div>
              )}

              {/* Creative Preview */}
              {currentCampaign.variants.length > 0 && (
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Generated Variants</h2>
                    <div className="text-sm text-text-secondary">
                      {currentCampaign.variants.filter(v => v.selected).length} selected
                    </div>
                  </div>
                  <CreativePreview
                    variants={currentCampaign.variants}
                    onVariantSelect={handleVariantSelect}
                    variant="gallery"
                  />
                  
                  {currentCampaign.status === 'ready' && (
                    <div className="mt-6 flex gap-4">
                      <button
                        onClick={handlePostToSocial}
                        disabled={currentCampaign.variants.filter(v => v.selected).length === 0}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Post Selected Variants
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Social Connection */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card">
                  <SocialConnectionManager />
                </div>
                
                {/* Performance Metrics */}
                {currentCampaign.status === 'posted' && (
                  <div className="card">
                    <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
                    <div className="space-y-4">
                      <MetricCard
                        title="Total Views"
                        value="1,234"
                        change="+12%"
                        variant="default"
                      />
                      <MetricCard
                        title="Engagement Rate"
                        value="3.2%"
                        change="+0.8%"
                        variant="default"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
