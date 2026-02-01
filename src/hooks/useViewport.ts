import { useEffect, useState } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4k' | '8k';

export function useViewport() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getBreakpoint = (): Breakpoint => {
    if (width >= 7680) return '8k';
    if (width >= 3840) return '4k';
    if (width >= 1536) return '2xl';
    if (width >= 1280) return 'xl';
    if (width >= 1024) return 'lg';
    if (width >= 768) return 'md';
    return 'sm';
  };

  return {
    width,
    height,
    breakpoint: getBreakpoint(),
    is1080p: width <= 1920,
    is4k: width >= 3840 && width < 7680,
    is8k: width >= 7680,
  };
}
