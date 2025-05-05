import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  color = 'var(--color-primary)',
  text,
  fullScreen = false,
  className,
}) => {
  return (
    <LoadingContainer fullScreen={fullScreen} className={className}>
      <Spinner size={size} color={color} />
      {text && <LoadingText>{text}</LoadingText>}
    </LoadingContainer>
  );
};

interface LoadingContainerProps {
  fullScreen: boolean;
}

const LoadingContainer = styled.div<LoadingContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  ${props => props.fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999;
  `}
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

interface SpinnerProps {
  size: 'small' | 'medium' | 'large';
  color: string;
}

const getSpinnerSize = (size: string) => {
  switch (size) {
    case 'small':
      return '24px';
    case 'medium':
      return '48px';
    case 'large':
      return '72px';
    default:
      return '48px';
  }
};

const Spinner = styled.div<SpinnerProps>`
  width: ${props => getSpinnerSize(props.size)};
  height: ${props => getSpinnerSize(props.size)};
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top: 4px solid ${props => props.color};
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 16px;
  font-size: 16px;
  color: var(--color-text-primary);
`;

export default Loading;