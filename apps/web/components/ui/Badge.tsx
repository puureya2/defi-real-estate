import React from 'react';

type BadgeProps = {
  children: React.ReactNode;
  color?: 'green' | 'red' | 'blue' | 'yellow' | 'orange' | 'purple';
  variant?: 'solid' | 'subtle';
};

export function Badge({
  children,
  color = 'blue',
  variant = 'solid'
}: BadgeProps) {
  const colorStyles = {
    solid: {
      green: 'bg-emerald-900/60 text-emerald-200',
      red: 'bg-rose-900/60 text-rose-200',
      blue: 'bg-blue-900/60 text-blue-200',
      yellow: 'bg-amber-900/60 text-amber-200',
      orange: 'bg-orange-900/60 text-orange-200',
      purple: 'bg-purple-900/60 text-purple-200'
    },
    subtle: {
      green: 'bg-emerald-400/10 text-emerald-400',
      red: 'bg-rose-400/10 text-rose-400',
      blue: 'bg-blue-400/10 text-blue-400',
      yellow: 'bg-amber-400/10 text-amber-400',
      orange: 'bg-orange-400/10 text-orange-400',
      purple: 'bg-purple-400/10 text-purple-400'
    }
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorStyles[variant][color]}`}>
      {children}
    </span>;
}