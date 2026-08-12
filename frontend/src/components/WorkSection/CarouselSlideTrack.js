import { useEffect, useRef, useState } from 'react';
import CarouselChevron from './CarouselChevron';
import './CarouselSlideTrack.css';

const SWIPE_THRESHOLD = 50;
const SLIDE_GAP_PX = 5;

const CarouselSlideTrack = ({
  slides,
  chevronSize = 'outer',
  direction = 'horizontal',
  ariaLabelPrefix = 'Slide',
  className = '',
  index: controlledIndex,
  onIndexChange,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const [announce, setAnnounce] = useState(false);
  const touchStart = useRef(null);
  const viewportRef = useRef(null);
  const didMountRef = useRef(false);
  const isVertical = direction === 'vertical';
  const isControlled = controlledIndex !== undefined;
  // Outer horizontal cards and vertical image strips both use a 5px flex gap.
  const useGap = chevronSize === 'outer' || isVertical;

  const count = slides.length;
  const index = isControlled ? controlledIndex : internalIndex;
  const safeIndex = Math.min(index, Math.max(count - 1, 0));
  const hasMultiple = count > 1;

  const goTo = (nextIndex) => {
    const clamped = Math.max(0, Math.min(count - 1, nextIndex));
    if (!isControlled) {
      setInternalIndex(clamped);
    }
    onIndexChange?.(clamped);
  };

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    setAnnounce(true);
  }, [safeIndex]);

  const goPrev = () => goTo(safeIndex - 1);
  const goNext = () => goTo(safeIndex + 1);

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

  const handleKeyDown = (e) => {
    if (!hasMultiple) return;

    if (isVertical) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(count - 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(count - 1);
    }
  };

  if (!count) {
    return null;
  }

  const stripTransform = isVertical
    ? useGap
      ? `translateY(calc(-${safeIndex} * (100% + ${SLIDE_GAP_PX}px)))`
      : `translateY(-${safeIndex * 100}%)`
    : useGap
      ? `translateX(calc(-${safeIndex} * (100% + ${SLIDE_GAP_PX}px)))`
      : `translateX(-${safeIndex * 100}%)`;

  const prevChevronDirection = isVertical ? 'up' : 'left';
  const nextChevronDirection = isVertical ? 'down' : 'right';
  const liveStatus = `${ariaLabelPrefix} ${safeIndex + 1} of ${count}`;

  // At carousel edges, let the browser scroll the page in the direction
  // that can't change slides (pan-down at first, pan-up at last).
  let verticalTouchAction = 'none';
  if (isVertical) {
    if (!hasMultiple) {
      verticalTouchAction = 'pan-y';
    } else if (safeIndex === 0) {
      verticalTouchAction = 'pan-down';
    } else if (safeIndex === count - 1) {
      verticalTouchAction = 'pan-up';
    }
  }

  return (
    <div
      className={`carouselSlideTrackOuter carouselSlideTrackOuter--${chevronSize} carouselSlideTrackOuter--${direction} ${className}`.trim()}
      role="group"
      aria-roledescription="carousel"
      aria-label={`${ariaLabelPrefix} carousel`}
    >
      <div className="carouselSlideTrackLive" aria-live="polite" aria-atomic="true">
        {announce && hasMultiple ? liveStatus : null}
      </div>

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
        style={isVertical ? { touchAction: verticalTouchAction } : undefined}
        tabIndex={hasMultiple ? 0 : undefined}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        aria-label={hasMultiple ? liveStatus : undefined}
      >
        <div
          className="carouselSlideTrackStrip"
          style={{ transform: stripTransform }}
        >
          {slides.map((slide, slideIndex) => {
            const isActive = slideIndex === safeIndex;
            return (
              <div
                className="carouselSlideTrackSlide"
                key={slide.key}
                aria-hidden={!isActive}
                ref={(el) => {
                  if (el) {
                    el.inert = !isActive;
                  }
                }}
              >
                {slide.node}
              </div>
            );
          })}
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
