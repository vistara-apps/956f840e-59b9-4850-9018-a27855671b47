'use client';

import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Avatar, Name, Identity } from '@coinbase/onchainkit/identity';
import { Sparkles, Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full bg-surface/80 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">RemixAi</h1>
              <p className="text-xs text-text-secondary">AI Ad Variants</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              Campaigns
            </a>
            <a href="#" className="text-text-secondary hover:text-text-primary transition-colors">
              Analytics
            </a>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-accent/20 rounded-lg border border-accent/30">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">5 Credits</span>
            </div>
            
            <Wallet>
              <ConnectWallet className="bg-primary hover:bg-blue-600 text-white">
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </div>
    </header>
  );
}
