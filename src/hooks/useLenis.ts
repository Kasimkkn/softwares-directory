import { useEffect } from 'react';

const useLenis = () => {
  useEffect(() => {
    let lenis: any;

    const initLenis = async () => {
      const Lenis = (await import('@studio-freight/lenis')).default;
      
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);
};

export default useLenis;