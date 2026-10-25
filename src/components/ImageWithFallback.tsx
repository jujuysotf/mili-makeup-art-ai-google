import React, { useState } from 'react';
import { Sparkles, Camera } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackCategory?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Milimakeupart',
  fallbackTitle,
  fallbackCategory,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FBF4F6] via-[#F4E3E8] to-[#E7D5DB] text-[#1A1A1A] overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
        <div className="relative z-10 flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 text-[#1A1A1A] border border-[#E7D5DB]">
            <Sparkles className="w-6 h-6 text-[#F4A7C1]" />
          </div>
          {fallbackCategory && (
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#5C5558] mb-1">
              {fallbackCategory}
            </span>
          )}
          <span className="text-sm font-semibold tracking-wide text-[#1A1A1A] max-w-[200px]">
            {fallbackTitle || alt}
          </span>
          <span className="text-[11px] text-[#5C5558] mt-1 flex items-center gap-1">
            <Camera className="w-3 h-3 text-[#F4A7C1]" />
            Milimakeupart Studio
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#FBF4F6] animate-pulse flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-[#F4A7C1] animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
};
