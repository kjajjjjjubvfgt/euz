/**
 * Utility functions for handling keyboard navigation in a TV environment
 */

// Key codes for TV remote control
export enum KeyCode {
  UP = 38,
  DOWN = 40,
  LEFT = 37,
  RIGHT = 39,
  ENTER = 13,
  BACK = 8,
  PLAY_PAUSE = 179,
  PLAY = 415,
  PAUSE = 19,
  STOP = 413,
  FAST_FORWARD = 417,
  REWIND = 412,
  INFO = 457,
  CHANNEL_UP = 427,
  CHANNEL_DOWN = 428,
  RED = 403,
  GREEN = 404,
  YELLOW = 405,
  BLUE = 406,
  MENU = 18,
  EXIT = 27, // ESC
  VOLUME_UP = 447,
  VOLUME_DOWN = 448,
  MUTE = 449,
  NUMBER_0 = 48,
  NUMBER_1 = 49,
  NUMBER_2 = 50,
  NUMBER_3 = 51,
  NUMBER_4 = 52,
  NUMBER_5 = 53,
  NUMBER_6 = 54,
  NUMBER_7 = 55,
  NUMBER_8 = 56,
  NUMBER_9 = 57
}

/**
 * Register global key event handlers
 * @param handlers Object with key handlers
 * @returns Cleanup function to remove event listeners
 */
export const registerKeyHandlers = (handlers: Record<number, (event: KeyboardEvent) => void>): () => void => {
  const handleKeyDown = (event: KeyboardEvent) => {
    const handler = handlers[event.keyCode];
    if (handler) {
      handler(event);
      event.preventDefault();
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Create a spatial navigation system for TV remote control
 * @param containerId ID of the container element
 * @param focusableSelector CSS selector for focusable elements
 * @param initialFocusIndex Initial focus index (default: 0)
 * @returns Object with navigation methods
 */
export const createSpatialNavigation = (
  containerId: string,
  focusableSelector: string,
  initialFocusIndex: number = 0
) => {
  let currentFocusIndex = initialFocusIndex;
  let focusableElements: HTMLElement[] = [];
  
  const updateFocusableElements = () => {
    const container = document.getElementById(containerId);
    if (!container) return [];
    
    const elements = Array.from(container.querySelectorAll(focusableSelector)) as HTMLElement[];
    return elements;
  };
  
  const init = () => {
    focusableElements = updateFocusableElements();
    if (focusableElements.length > 0 && currentFocusIndex < focusableElements.length) {
      focusElement(currentFocusIndex);
    }
  };
  
  const focusElement = (index: number) => {
    if (index >= 0 && index < focusableElements.length) {
      focusableElements[index].focus();
      currentFocusIndex = index;
      
      // Scroll element into view if needed
      focusableElements[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  };
  
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case KeyCode.UP:
        navigateUp();
        event.preventDefault();
        break;
      case KeyCode.DOWN:
        navigateDown();
        event.preventDefault();
        break;
      case KeyCode.LEFT:
        navigateLeft();
        event.preventDefault();
        break;
      case KeyCode.RIGHT:
        navigateRight();
        event.preventDefault();
        break;
    }
  };
  
  const navigateUp = () => {
    focusableElements = updateFocusableElements();
    if (focusableElements.length === 0) return;
    
    // Simple implementation - move to previous element
    const newIndex = Math.max(0, currentFocusIndex - 1);
    focusElement(newIndex);
  };
  
  const navigateDown = () => {
    focusableElements = updateFocusableElements();
    if (focusableElements.length === 0) return;
    
    // Simple implementation - move to next element
    const newIndex = Math.min(focusableElements.length - 1, currentFocusIndex + 1);
    focusElement(newIndex);
  };
  
  const navigateLeft = () => {
    // This is a simplified implementation
    // In a real app, you would need to calculate the element to the left
    // based on the position of elements in the UI
    navigateUp();
  };
  
  const navigateRight = () => {
    // This is a simplified implementation
    // In a real app, you would need to calculate the element to the right
    // based on the position of elements in the UI
    navigateDown();
  };
  
  // Register key handlers
  window.addEventListener('keydown', handleKeyDown);
  
  // Initialize
  init();
  
  // Return public API
  return {
    init,
    focusElement,
    navigateUp,
    navigateDown,
    navigateLeft,
    navigateRight,
    getCurrentFocusIndex: () => currentFocusIndex,
    getFocusableElements: () => focusableElements,
    refresh: () => {
      focusableElements = updateFocusableElements();
      return focusableElements;
    },
    cleanup: () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  };
};