import React, { useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { useKeyboardNavigation } from '../../hooks';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
  height?: string;
  showCloseButton?: boolean;
  closeOnEscape?: boolean;
  closeOnBackdropClick?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = '500px',
  height = 'auto',
  showCloseButton = true,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  className,
}) => {
  // Handle keyboard navigation
  useKeyboardNavigation({
    onBack: closeOnEscape ? onClose : undefined,
    onExit: closeOnEscape ? onClose : undefined,
  });
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Don't render anything if modal is not open
  if (!isOpen) return null;
  
  // Create portal to render modal outside of the component hierarchy
  return createPortal(
    <ModalBackdrop onClick={closeOnBackdropClick ? onClose : undefined}>
      <ModalContent
        width={width}
        height={height}
        className={className}
        onClick={e => e.stopPropagation()}
      >
        <ModalHeader>
          {title && <ModalTitle>{title}</ModalTitle>}
          {showCloseButton && (
            <CloseButton onClick={onClose}>
              ✕
            </CloseButton>
          )}
        </ModalHeader>
        
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </ModalBackdrop>,
    document.body
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

interface ModalContentProps {
  width: string;
  height: string;
}

const ModalContent = styled.div<ModalContentProps>`
  background-color: var(--color-background-modal);
  border-radius: 12px;
  width: ${props => props.width};
  height: ${props => props.height};
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text-primary);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  font-size: 24px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  
  &:hover, &:focus {
    color: var(--color-text-primary);
    background-color: rgba(255, 255, 255, 0.1);
    outline: none;
  }
`;

const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
`;

export default Modal;