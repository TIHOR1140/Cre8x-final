import React from 'react';

interface SurakshaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SurakshaLogo: React.FC<SurakshaLogoProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 p-1',
    md: 'w-8.5 h-8.5 p-1.5',
    lg: 'w-11 h-11 p-2',
  };

  return (
    <div 
      className={`rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 text-white shadow-xs flex items-center justify-center shrink-0 relative overflow-hidden group ${sizeClasses[size]} ${className}`}
      title="සුරක්ෂා Logo: Shield of Privacy & Heart of Care"
    >
      {/* Subtle ambient light ray effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/20 pointer-events-none" />

      {/* Suraksha Bespoke Logo Mark: Protective Shield + Caring Heart + Ambient Beacon */}
      <svg
        className="w-full h-full text-white drop-shadow-xs relative z-10 transition-transform duration-300 group-hover:scale-105"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Guardian Shield Outline & Translucent Fill */}
        <path
          d="M12 2.5L4.5 5.8V11.2C4.5 16.5 7.8 20.8 12 22C16.2 20.8 19.5 16.5 19.5 11.2V5.8L12 2.5Z"
          fill="white"
          fillOpacity="0.22"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Central Caring Heart */}
        <path
          d="M12 8.2C10.5 6.6 8 7.3 8 9.6C8 12.2 12 15.2 12 15.2C12 15.2 16 12.2 16 9.6C16 7.3 13.5 6.6 12 8.2Z"
          fill="white"
          stroke="white"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Ambient Center Beacon Light Dot */}
        <circle
          cx="12"
          cy="10.4"
          r="1.4"
          fill="#fef3c7"
          className="animate-pulse"
        />
      </svg>
    </div>
  );
};

