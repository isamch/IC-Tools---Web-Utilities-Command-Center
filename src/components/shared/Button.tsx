
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  className = "",
}) => {
  const variantClasses = {
    primary: "tactical-button",
    secondary: "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80",
    danger: "bg-destructive text-destructive-foreground border border-destructive/20 hover:bg-destructive/90",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded font-mono text-sm transition-colors duration-200 ${variantClasses[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {children}
    </button>
  );
};
