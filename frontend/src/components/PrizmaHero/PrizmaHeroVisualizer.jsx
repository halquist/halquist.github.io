import { useEffect, useRef } from 'react';
import { createPrizmaEngine } from './prizmaEngine/createPrizmaEngine';
import './PrizmaHeroVisualizer.css';

function useReducedMotion() {
  const ref = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event) => {
      ref.current = event.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return ref;
}

const PrizmaHeroVisualizer = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const visibleRef = useRef(false);
  const reducedMotionRef = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return undefined;

    const isMobile = window.innerWidth <= 768;
    const engine = createPrizmaEngine(canvas, {
      isMobile,
      reducedMotion: reducedMotionRef.current,
    });
    engineRef.current = engine;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      engine.resize(rect.width, rect.height, window.devicePixelRatio || 1);
    };

    resize();
    engine.renderOnce();
    engine.start();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !document.hidden) {
          engine.start();
        } else {
          engine.stop();
        }
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    const onVisibility = () => {
      if (document.hidden || !visibleRef.current) {
        engine.stop();
      } else {
        engine.start();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      engine.dispose();
      engineRef.current = null;
    };
  }, [reducedMotionRef]);

  return (
    <div
      className="prizmaHeroCircle"
      ref={containerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="prizmaHeroCanvas" />
    </div>
  );
};

export default PrizmaHeroVisualizer;
