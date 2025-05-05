import { useRef, useEffect, useState } from 'react';
import { KeyCode } from '../utils';

/**
 * Hook to make an element focusable and handle keyboard navigation
 * @param options Configuration options
 * @returns Object with ref and focus state
 */
export const useFocusable = (options: {
  onEnter?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
  initialFocus?: boolean;
  focusOnMount?: boolean;
  disabled?: boolean;
} = {}) => {
  const {
    onEnter,
    onLeft,
    onRight,
    onUp,
    onDown,
    initialFocus = false,
    focusOnMount = false,
    disabled = false
  } = options;
  
  const ref = useRef<HTMLElement>(null);
  const [isFocused, setIsFocused] = useState(initialFocus);
  
  useEffect(() => {
    const element = ref.current;
    if (!element || disabled) return;
    
    // Make element focusable
    if (element.tabIndex === -1) {
      element.tabIndex = 0;
    }
    
    // Focus element on mount if requested
    if (focusOnMount) {
      element.focus();
    }
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isFocused) return;
      
      switch (event.keyCode) {
        case KeyCode.ENTER:
          if (onEnter) {
            event.preventDefault();
            onEnter();
          }
          break;
        case KeyCode.LEFT:
          if (onLeft) {
            event.preventDefault();
            onLeft();
          }
          break;
        case KeyCode.RIGHT:
          if (onRight) {
            event.preventDefault();
            onRight();
          }
          break;
        case KeyCode.UP:
          if (onUp) {
            event.preventDefault();
            onUp();
          }
          break;
        case KeyCode.DOWN:
          if (onDown) {
            event.preventDefault();
            onDown();
          }
          break;
      }
    };
    
    const handleFocus = () => {
      setIsFocused(true);
    };
    
    const handleBlur = () => {
      setIsFocused(false);
    };
    
    element.addEventListener('keydown', handleKeyDown);
    element.addEventListener('focus', handleFocus);
    element.addEventListener('blur', handleBlur);
    
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
      element.removeEventListener('focus', handleFocus);
      element.removeEventListener('blur', handleBlur);
    };
  }, [
    isFocused,
    onEnter,
    onLeft,
    onRight,
    onUp,
    onDown,
    focusOnMount,
    disabled
  ]);
  
  return {
    ref,
    isFocused,
    focus: () => {
      if (ref.current && !disabled) {
        ref.current.focus();
      }
    }
  };
};