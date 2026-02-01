import { useEffect, useRef } from 'react';

interface TouchGesture {
  type: 'tap' | 'double-tap' | 'long-press' | 'swipe';
  direction?: 'left' | 'right' | 'up' | 'down';
  position: { x: number; y: number };
}

export function useTouch(
  elementRef: React.RefObject<HTMLElement>,
  onGesture: (gesture: TouchGesture) => void
) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0];
      const start = touchStartRef.current;

      if (!start) return;

      const deltaX = touchEnd.clientX - start.x;
      const deltaY = touchEnd.clientY - start.y;
      const deltaTime = Date.now() - start.time;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance < 10 && deltaTime < 300) {
        if (tapTimeoutRef.current) {
          clearTimeout(tapTimeoutRef.current);
          tapTimeoutRef.current = null;
          onGesture({
            type: 'double-tap',
            position: { x: touchEnd.clientX, y: touchEnd.clientY },
          });
        } else {
          tapTimeoutRef.current = setTimeout(() => {
            onGesture({
              type: 'tap',
              position: { x: touchEnd.clientX, y: touchEnd.clientY },
            });
            tapTimeoutRef.current = null;
          }, 300);
        }
      } else if (distance < 10 && deltaTime > 500) {
        onGesture({
          type: 'long-press',
          position: { x: touchEnd.clientX, y: touchEnd.clientY },
        });
      } else if (distance > 50) {
        const direction =
          Math.abs(deltaX) > Math.abs(deltaY)
            ? deltaX > 0
              ? 'right'
              : 'left'
            : deltaY > 0
              ? 'down'
              : 'up';

        onGesture({
          type: 'swipe',
          direction,
          position: { x: touchEnd.clientX, y: touchEnd.clientY },
        });
      }

      touchStartRef.current = null;
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      if (tapTimeoutRef.current) {
        clearTimeout(tapTimeoutRef.current);
      }
    };
  }, [elementRef, onGesture]);
}
