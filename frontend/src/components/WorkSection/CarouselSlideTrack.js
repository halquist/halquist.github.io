import { useEffect, useRef, useState } from 'react';
import CarouselChevron from './CarouselChevron';
import './CarouselSlideTrack.css';

const SWIPE_THRESHOLD = 50;

const CarouselSlideTrack = ({
  slides,
  chevronSize = 'outer',
  direction = 'horizontal',
  ariaLabelPrefix = 'Slide',
  className = '',
  onIndexChange,
}) => {
  const [index, setIndex] = useState(0);
  const [slideSize, setSlideSize] = useState(null);
  const touchStart = useRef(null);
  const viewportRef = useRef(null);
  const isVertical = direction === 'vertical';

  const count = slides.length;
  const safeIndex = Math.min(index, Math.max(count - 1, 0));
  const hasMultiple = count > 1;

  const goTo = (nextIndex) => {
    const clamped = Math.max(0, Math.min(count - 1, nextIndex));
    setIndex(clamped);
    onIndexChange?.(clamped);
  };

  const goPrev = () => goTo(safeIndex - 1);
  const goNext = () => goTo(safeIndex + 1);

  useEffect(() => {
    if (!isVertical || !viewportRef.current) {
      setSlideSize(null);
      return undefined;
    }

    const viewport = viewportRef.current;

    const updateSlideSize = () => {
      setSlideSize(viewport.clientHeight);
    };

    updateSlideSize();

    const observer = new ResizeObserver(updateSlideSize);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [isVertical, count]);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;

    if (isVertical) {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > SWIPE_THRESHOLD) {
        if (deltaY < 0 && safeIndex < count - 1) goNext();
        if (deltaY > 0 && safeIndex > 0) goPrev();
      }
    } else if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
      if (deltaX < 0 && safeIndex < count - 1) goNext();
      if (deltaX > 0 && safeIndex > 0) goPrev();
    }

    touchStart.current = null;
  };

  if (!count) {
    return null;
  }

  const stripTransform = isVertical
    ? slideSize
      ? `translateY(-${safeIndex * slideSize}px)`
      : `translateY(-${safeIndex * 100}%)`
    : `translateX(-${safeIndex * 100}%)`;

  const prevChevronDirection = isVertical ? 'up' : 'left';
  const nextChevronDirection = isVertical ? 'down' : 'right';

  return (
    <div
      className={`carouselSlideTrackOuter carouselSlideTrackOuter--${chevronSize} carouselSlideTrackOuter--${direction} ${className}`.trim()}
    >
      <CarouselChevron
        direction={prevChevronDirection}
        size={chevronSize}
        hidden={!hasMultiple || safeIndex === 0}
        onClick={goPrev}
        ariaLabel={`Previous ${ariaLabelPrefix}`}
      />

      <div
        ref={viewportRef}
        className="carouselSlideTrackViewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="carouselSlideTrackStrip"
          style={{ transform: stripTransform }}
        >
          {slides.map((slide) => (
            <div
              className="carouselSlideTrackSlide"
              key={slide.key}
              style={
                isVertical && slideSize
                  ? { height: slideSize, flexBasis: slideSize }
                  : undefined
              }
            >
              {slide.node}
            </div>
          ))}
        </div>
      </div>

      <CarouselChevron
        direction={nextChevronDirection}
        size={chevronSize}
        hidden={!hasMultiple || safeIndex === count - 1}
        onClick={goNext}
        ariaLabel={`Next ${ariaLabelPrefix}`}
      />
    </div>
  );
};

export default CarouselSlideTrack;
