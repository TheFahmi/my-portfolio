import React from 'react';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const RetroButton = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}: RetroButtonProps) => {
  
  // Base styles
  const baseStyles = "relative inline-flex items-center justify-center font-['Merriweather',_serif] font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";
  
  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-5 py-2.5 text-base rounded-lg",
    lg: "px-7 py-3.5 text-lg rounded-xl"
  };
  
  // Variant styles
  const variantStyles = {
    primary: "bg-sepia text-cream border-2 border-gold hover:bg-sepia-light shadow-md hover:shadow-lg",
    secondary: "bg-cream text-sepia border-2 border-sepia hover:bg-cream-dark shadow-sm hover:shadow-md",
    outline: "bg-transparent text-sepia border-2 border-sepia hover:bg-sepia/10"
  };

  // Combine styles
  const combinedClassName = `
    ${baseStyles} 
    ${sizeStyles[size]} 
    ${variantStyles[variant]} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      className={combinedClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default RetroButton;
