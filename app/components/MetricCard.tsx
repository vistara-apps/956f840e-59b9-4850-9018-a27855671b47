'use client';

import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  variant?: 'default';
}

export function MetricCard({ title, value, change, variant = 'default' }: MetricCardProps) {
  const isPositive = change.startsWith('+');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface/50 rounded-lg p-4 border border-white/10"
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-text-secondary">{title}</h4>
        <div className={`flex items-center gap-1 text-xs ${
          isPositive ? 'text-green-400' : 'text-red-400'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {change}
        </div>
      </div>
      
      <div className="text-2xl font-bold text-text-primary mb-1">
        {value}
      </div>
      
      <div className="w-full bg-surface rounded-full h-1">
        <div 
          className={`h-1 rounded-full transition-all duration-1000 ${
            isPositive ? 'bg-green-400' : 'bg-red-400'
          }`}
          style={{ width: '65%' }}
        />
      </div>
    </motion.div>
  );
}
