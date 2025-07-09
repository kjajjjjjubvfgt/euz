import React from 'react';
import styled, { css } from 'styled-components';
import { useFocusable } from '../../hooks';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  icon,
  className,
  onFocus,
  onBlur,
  autoFocus = false,
}) => {
  const { ref, isFocused } = useFocusable({
    onEnter: !disabled ? onClick : undefined,
    focusOnMount: autoFocus,
  });

  return (
    <StyledButton
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={!disabled ? onClick : undefined}
      variant={variant}
      size={size}
      $fullWidth={fullWidth}
      disabled={disabled}
      isFocused={isFocused}
      className={className}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={0}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </StyledButton>
  );
};

const getVariantStyles = (variant: string, isFocused: boolean) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: var(--color-primary);
        color: white;
        border: 2px solid var(--color-primary);
        
        ${isFocused && css`
          background-color: var(--color-primary-dark);
          border-color: var(--color-primary-light);
          transform: scale(1.05);
          box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.5);
        `}
        
        &:hover:not(:disabled) {
          background-color: var(--color-primary-dark);
        }
        
        &:disabled {
          background-color: var(--color-disabled);
          border-color: var(--color-disabled);
          color: var(--color-text-disabled);
        }
      `;
    case 'secondary':
      return css`
        background-color: var(--color-secondary);
        color: white;
        border: 2px solid var(--color-secondary);
        
        ${isFocused && css`
          background-color: var(--color-secondary-dark);
          border-color: var(--color-secondary-light);
          transform: scale(1.05);
          box-shadow: 0 0 10px rgba(var(--color-secondary-rgb), 0.5);
        `}
        
        &:hover:not(:disabled) {
          background-color: var(--color-secondary-dark);
        }
        
        &:disabled {
          background-color: var(--color-disabled);
          border-color: var(--color-disabled);
          color: var(--color-text-disabled);
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: var(--color-primary);
        border: 2px solid var(--color-primary);
        
        ${isFocused && css`
          background-color: rgba(var(--color-primary-rgb), 0.1);
          border-color: var(--color-primary-light);
          transform: scale(1.05);
          box-shadow: 0 0 10px rgba(var(--color-primary-rgb), 0.3);
        `}
        
        &:hover:not(:disabled) {
          background-color: rgba(var(--color-primary-rgb), 0.1);
        }
        
        &:disabled {
          border-color: var(--color-disabled);
          color: var(--color-text-disabled);
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: var(--color-primary);
        border: 2px solid transparent;
        
        ${isFocused && css`
          background-color: rgba(var(--color-primary-rgb), 0.1);
          transform: scale(1.05);
        `}
        
        &:hover:not(:disabled) {
          background-color: rgba(var(--color-primary-rgb), 0.1);
        }
        
        &:disabled {
          color: var(--color-text-disabled);
        }
      `;
    default:
      return '';
  }
};

const getSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return css`
        padding: 8px 16px;
        font-size: 14px;
      `;
    case 'medium':
      return css`
        padding: 12px 24px;
        font-size: 16px;
      `;
    case 'large':
      return css`
        padding: 16px 32px;
        font-size: 18px;
      `;
    default:
      return '';
  }
};

interface StyledButtonProps {
  variant: string;
  size: string;
  $fullWidth: boolean;
  disabled: boolean;
  isFocused: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${props => (props.$fullWidth ? '100%' : 'auto')};
  
  ${props => getSizeStyles(props.size)}
  ${props => getVariantStyles(props.variant, props.isFocused)}
  
  &:disabled {
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
  }
`;

const IconWrapper = styled.span`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

export default Button;