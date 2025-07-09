import React from 'react';
import styled, { css } from 'styled-components';
import { useFocusable } from '../../hooks';

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
  onEnter?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = 'text',
  placeholder,
  label,
  error,
  disabled = false,
  fullWidth = false,
  icon,
  className,
  onFocus,
  onBlur,
  autoFocus = false,
  onEnter,
  onKeyDown,
}) => {
  const { ref, isFocused } = useFocusable({
    onEnter,
    focusOnMount: autoFocus,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onEnter) {
      onEnter();
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <InputContainer $fullWidth={fullWidth} className={className}>
      {label && <Label>{label}</Label>}
      
      <InputWrapper isFocused={isFocused} $hasError={!!error} disabled={disabled}>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        
        <StyledInput
          ref={ref as React.RefObject<HTMLInputElement>}
          type={type}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          hasIcon={!!icon}
        />
      </InputWrapper>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

interface InputContainerProps {
  $fullWidth: boolean;
}

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${props => (props.$fullWidth ? '100%' : '300px')};
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 8px;
`;

interface InputWrapperProps {
  isFocused: boolean;
  $hasError: boolean;
  disabled: boolean;
}

const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  background-color: var(--color-background-input);
  border-radius: 8px;
  border: 2px solid;
  transition: all 0.2s ease;
  
  ${props => {
    if (props.$hasError) {
      return css`
        border-color: var(--color-error);
      `;
    } else if (props.isFocused) {
      return css`
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2);
      `;
    } else {
      return css`
        border-color: var(--color-border);
      `;
    }
  }}
  
  ${props => props.disabled && css`
    background-color: var(--color-background-disabled);
    border-color: var(--color-border);
    opacity: 0.7;
    cursor: not-allowed;
  `}
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 12px;
  color: var(--color-text-secondary);
`;

interface StyledInputProps {
  hasIcon: boolean;
}

const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  padding-left: ${props => (props.hasIcon ? '8px' : '16px')};
  background: none;
  border: none;
  font-size: 16px;
  color: var(--color-text-primary);
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: var(--color-text-placeholder);
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--color-error);
`;

export default Input;