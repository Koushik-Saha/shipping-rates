'use client';

import { BeatLoader } from 'react-spinners';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
  loading?: boolean;
  text?: string;
}

export function LoadingSpinner({ 
  size = 15, 
  color = '#3b82f6', 
  loading = true,
  text = 'Loading...'
}: LoadingSpinnerProps) {
  if (!loading) return null;

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <BeatLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      {text && (
        <p className="text-gray-600 text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
}

export function FullPageLoader({ 
  text = 'Loading...',
  bgColor = 'bg-white' 
}: { 
  text?: string;
  bgColor?: string;
}) {
  return (
    <div className={`fixed inset-0 ${bgColor} flex items-center justify-center z-50`}>
      <div className="text-center">
        <LoadingSpinner text={text} size={20} />
      </div>
    </div>
  );
}