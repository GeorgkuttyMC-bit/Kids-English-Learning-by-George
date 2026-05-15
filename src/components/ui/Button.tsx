import { motion } from 'motion/react';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-2xl transition-colors select-none';
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-[0_4px_0_rgb(37,99,235)] active:shadow-[0_0px_0_rgb(37,99,235)] active:translate-y-1',
    secondary: 'bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700 shadow-[0_4px_0_rgb(147,51,234)] active:shadow-[0_0px_0_rgb(147,51,234)] active:translate-y-1',
    success: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-[0_4px_0_rgb(22,163,74)] active:shadow-[0_0px_0_rgb(22,163,74)] active:translate-y-1',
    warning: 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500 active:bg-yellow-600 shadow-[0_4px_0_rgb(202,138,4)] active:shadow-[0_0px_0_rgb(202,138,4)] active:translate-y-1',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-[0_4px_0_rgb(220,38,38)] active:shadow-[0_0px_0_rgb(220,38,38)] active:translate-y-1',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-lg',
    lg: 'px-8 py-4 text-2xl',
    xl: 'px-10 py-6 text-3xl',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
