import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const [imageError, setImageError] = useState(false);

  const heightClasses = {
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <a href="#inicio" className={`flex items-center gap-2.5 group select-none ${className}`}>
      {!imageError ? (
        <img
          src="/assets/logo/logo-v1.jpeg"
          alt="Milimakeupart - Milagros Arce"
          className={`${heightClasses[size]} w-auto object-contain rounded-md transition-transform duration-200 group-hover:scale-105`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex flex-col">
          <div className="flex items-baseline tracking-tight font-sans">
            <span className="font-serif italic text-2xl font-bold text-[#1A1A1A] mr-1 font-['Playfair_Display',serif]">
              Mili
            </span>
            <span className="text-xl font-extrabold uppercase tracking-widest text-[#F4A7C1]">
              makeup
            </span>
            <span className="text-xl font-extrabold uppercase tracking-widest text-[#1A1A1A] ml-0.5">
              art
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#5C5558] font-medium -mt-1">
              Milagros Arce · Tucumán
            </span>
          )}
        </div>
      )}
    </a>
  );
};
