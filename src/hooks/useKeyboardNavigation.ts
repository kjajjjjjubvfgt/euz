import { useEffect } from 'react';
import { KeyCode, registerKeyHandlers } from '../utils';

/**
 * Hook to handle keyboard navigation at a global level
 * @param handlers Object with key handlers
 */
export const useKeyboardNavigation = (handlers: {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  onEnter?: () => void;
  onBack?: () => void;
  onPlayPause?: () => void;
  onInfo?: () => void;
  onRed?: () => void;
  onGreen?: () => void;
  onYellow?: () => void;
  onBlue?: () => void;
  onMenu?: () => void;
  onExit?: () => void;
  onFastForward?: () => void;
  onRewind?: () => void;
  onNumbers?: (num: number) => void;
}) => {
  useEffect(() => {
    const keyHandlers: Record<number, (event: KeyboardEvent) => void> = {};
    
    if (handlers.onUp) keyHandlers[KeyCode.UP] = handlers.onUp;
    if (handlers.onDown) keyHandlers[KeyCode.DOWN] = handlers.onDown;
    if (handlers.onLeft) keyHandlers[KeyCode.LEFT] = handlers.onLeft;
    if (handlers.onRight) keyHandlers[KeyCode.RIGHT] = handlers.onRight;
    if (handlers.onEnter) keyHandlers[KeyCode.ENTER] = handlers.onEnter;
    if (handlers.onBack) keyHandlers[KeyCode.BACK] = handlers.onBack;
    if (handlers.onPlayPause) keyHandlers[KeyCode.PLAY_PAUSE] = handlers.onPlayPause;
    if (handlers.onInfo) keyHandlers[KeyCode.INFO] = handlers.onInfo;
    if (handlers.onRed) keyHandlers[KeyCode.RED] = handlers.onRed;
    if (handlers.onGreen) keyHandlers[KeyCode.GREEN] = handlers.onGreen;
    if (handlers.onYellow) keyHandlers[KeyCode.YELLOW] = handlers.onYellow;
    if (handlers.onBlue) keyHandlers[KeyCode.BLUE] = handlers.onBlue;
    if (handlers.onMenu) keyHandlers[KeyCode.MENU] = handlers.onMenu;
    if (handlers.onExit) keyHandlers[KeyCode.EXIT] = handlers.onExit;
    if (handlers.onFastForward) keyHandlers[KeyCode.FAST_FORWARD] = handlers.onFastForward;
    if (handlers.onRewind) keyHandlers[KeyCode.REWIND] = handlers.onRewind;
    
    // Number keys
    if (handlers.onNumbers) {
      for (let i = 0; i <= 9; i++) {
        keyHandlers[KeyCode.NUMBER_0 + i] = () => handlers.onNumbers!(i);
      }
    }
    
    const cleanup = registerKeyHandlers(keyHandlers);
    return cleanup;
  }, [handlers]);
};