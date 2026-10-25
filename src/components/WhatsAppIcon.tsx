import React from 'react';

interface WhatsAppIconProps {
  className?: string;
  size?: number;
}

/**
 * Official WhatsApp Vector Icon
 * Authentic green background circle (#25D366) with crisp white speech bubble & phone handset
 */
export const WhatsAppIcon: React.FC<WhatsAppIconProps> = ({
  className = 'w-6 h-6',
  size,
}) => {
  const width = size || undefined;
  const height = size || undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={width}
      height={height}
      className={className}
    >
      {/* Círculo verde oficial de WhatsApp */}
      <circle cx="16" cy="16" r="16" fill="#25D366" />
      
      {/* Auricular y bocadillo de WhatsApp en blanco puro */}
      <path
        fill="#FFFFFF"
        d="M23.5 8.5C21.5 6.5 18.9 5.4 16.1 5.4C10.2 5.4 5.5 10.1 5.5 15.9C5.5 17.8 6 19.6 6.9 21.2L5.4 26.6L11 25.1C12.5 25.9 14.3 26.4 16.1 26.4C21.9 26.4 26.7 21.7 26.7 15.9C26.7 13.1 25.6 10.5 23.5 8.5ZM16.1 24.6C14.5 24.6 12.9 24.2 11.6 23.4L11.2 23.2L7.9 24.1L8.8 20.9L8.6 20.5C7.7 19.1 7.2 17.5 7.2 15.9C7.2 11 11.2 7.1 16.1 7.1C18.5 7.1 20.7 8 22.4 9.7C24.1 11.4 25 13.6 25 15.9C25 20.7 21 24.6 16.1 24.6ZM21 18.1C20.7 18 19.4 17.4 19.2 17.3C18.9 17.2 18.8 17.1 18.6 17.4C18.4 17.7 17.9 18.2 17.8 18.4C17.6 18.6 17.5 18.6 17.2 18.5C17 18.4 16.1 18.1 15.1 17.2C14.3 16.5 13.7 15.6 13.6 15.3C13.4 15 13.6 14.9 13.7 14.7C13.8 14.6 14 14.4 14.1 14.3C14.2 14.1 14.3 14 14.4 13.8C14.5 13.6 14.4 13.5 14.4 13.4C14.3 13.3 13.8 12.1 13.6 11.6C13.4 11.1 13.2 11.2 13.1 11.2C13 11.2 12.8 11.2 12.6 11.2C12.4 11.2 12.2 11.3 12 11.5C11.7 11.8 11.1 12.4 11.1 13.6C11.1 14.8 11.9 16 12.1 16.2C12.2 16.3 13.8 18.9 16.3 19.9C16.9 20.2 17.4 20.3 17.7 20.4C18.3 20.6 18.9 20.6 19.3 20.5C19.8 20.4 20.8 19.9 21 19.3C21.2 18.7 21.2 18.2 21.1 18.1C21.1 18 21.2 18 21 18.1Z"
      />
    </svg>
  );
};
