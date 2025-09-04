'use client';

import { useState } from 'react';
import { Plus, Link, CheckCircle, XCircle } from 'lucide-react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { motion } from 'framer-motion';

interface SocialAccount {
  id: string;
  platform: string;
  username: string;
  connected: boolean;
  status: 'active' | 'error' | 'pending';
}

interface SocialConnectionManagerProps {
  variant?: 'add' | 'manage';
}

export function SocialConnectionManager({ variant = 'manage' }: SocialConnectionManagerProps) {
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    {
      id: '1',
      platform: 'Farcaster',
      username: '@username',
      connected: false,
      status: 'pending'
    }
  ]);

  const handleConnect = (accountId: string) => {
    setAccounts(prev =>
      prev.map(account =>
        account.id === accountId
          ? { ...account, connected: true, status: 'active' as const }
          : account
      )
    );
  };

  const handleDisconnect = (accountId: string) => {
    setAccounts(prev =>
      prev.map(account =>
        account.id === accountId
          ? { ...account, connected: false, status: 'pending' as const }
          : account
      )
    );
  };

  const getStatusIcon = (status: string, connected: boolean) => {
    if (!connected) return <XCircle className="w-4 h-4 text-red-400" />;
    
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-yellow-400" />;
    }
  };

  if (variant === 'add') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-6"
      >
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Connect Social Accounts
        </h3>
        <p className="text-text-secondary mb-6">
          Connect your social media accounts to auto-post ad variants
        </p>
        <button className="btn-primary">
          Add Account
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">
          Connected Accounts
        </h3>
        <button className="text-primary hover:text-blue-400 text-sm font-medium transition-colors">
          Add New
        </button>
      </div>

      <div className="space-y-3">
        {accounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-surface/50 rounded-lg border border-white/10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Link className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-text-primary">
                  {account.platform}
                </div>
                <div className="text-sm text-text-secondary">
                  {account.username}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {getStatusIcon(account.status, account.connected)}
              
              {!account.connected ? (
                <ConnectWallet className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  Connect
                </ConnectWallet>
              ) : (
                <button
                  onClick={() => handleDisconnect(account.id)}
                  className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                >
                  Disconnect
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {accounts.length === 0 && (
        <div className="text-center py-8 text-text-secondary">
          No accounts connected yet. Add your first account to start auto-posting.
        </div>
      )}
    </div>
  );
}
