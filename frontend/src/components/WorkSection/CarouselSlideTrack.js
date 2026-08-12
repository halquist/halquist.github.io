import { useEffect, useRef, useState } from 'react';
import CarouselChevron from './CarouselChevron';
import './CarouselSlideTrack.css';

const SWIPE_THRESHOLD = 50;
const SLIDE_GAP_PX = 5;
const AXIS_THRESHOLD = 10;

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
  const safeIndexRef = useRef(0);
  const countRef = useRef(0);
  const hasMultipleRef = useRef(false);
  const goToRef = useRef(() => {});
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

  safeIndexRef.current = safeIndex;
  countRef.current = count;
  hasMultipleRef.current = hasMultiple;
  goToRef.current = goTo;

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    setAnnounce(true);
  }, [safeIndex]);

  const goPrev = () => goTo(safeIndex - 1);
  const goNext = () => goTo(safeIndex + 1);

  useEffect(() => {
    if (!isVertical || !viewportRef.current || !hasMultiple) {
      return undefined;
    }

    const viewport = viewportRef.current;
    const gesture = {
      startX: 0,
      startY: 0,
      lastY: 0,
      startIndex: 0,
      lock: null,
    };

    const onTouchStart = (e) => {
      const touch = e.touches[0];
      gesture.startX = touch.clientX;
      gesture.startY = touch.clientY;
      gesture.lastY = touch.clientY;
      gesture.startIndex = safeIndexRef.current;
      gesture.lock = null;
    };

    const onTouchMove = (e) => {
      const touch = e.touches[0];
      const dx = touch.clientX - gesture.startX;
      const dy = touch.clientY - gesture.startY;
      const stepDy = touch.clientY - gesture.lastY;
      gesture.lastY = touch.clientY;

      if (gesture.lock === null) {
        if (Math.abs(dy) < AXIS_THRESHOLD && Math.abs(dx) < AXIS_THRESHOLD) {
          return;
        }
        if (Math.abs(dy) <= Math.abs(dx)) {
          gesture.lock = 'page';
        } else if (dy < 0 && gesture.startIndex < countRef.current - 1) {
          gesture.lock = 'carousel';
        } else if (dy > 0 && gesture.startIndex > 0) {
          gesture.lock = 'carousel';
        } else {
          gesture.lock = 'page';
        }
      }

      if (gesture.lock === 'carousel') {
        e.preventDefault();
      } else if (gesture.lock === 'page') {
        e.preventDefault();
        window.scrollBy(0, -stepDy);
      }
    };

    const onTouchEnd = (e) => {
      const touch = e.changedTouches[0];
      const dx = touch.clientX - gesture.startX;
      const dy = touch.clientY - gesture.startY;

      if (
        gesture.lock === 'carousel' &&
        Math.abs(dy) > Math.abs(dx) &&
        Math.abs(dy) > SWIPE_THRESHOLD
      ) {
        const idx = gesture.startIndex;
        const slideCount = countRef.current;
        if (dy < 0 && idx < slideCount - 1) {
          goToRef.current(idx + 1);
        } else if (dy > 0 && idx > 0) {
          goToRef.current(idx - 1);
        }
      }

      gesture.lock = null;
    };

    const onTouchCancel = () => {
      gesture.lock = null;
    };

    viewport.addEventListener('touchstart', onTouchStart, { passive: true });
    viewport.addEventListener('touchmove', onTouchMove, { passive: false });
    viewport.addEventListener('touchend', onTouchEnd, { passive: true });
    viewport.addEventListener('touchcancel', onTouchCancel, { passive: true });

    return () => {
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchmove', onTouchMove);
      viewport.removeEventListener('touchend', onTouchEnd);
      viewport.removeEventListener('touchcancel', onTouchCancel);
    };
  }, [isVertical, hasMultiple, count]);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    if (!touchStart.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
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

  const viewportClassName = [
    'carouselSlideTrackViewport',
    isVertical && !hasMultiple ? 'carouselSlideTrackViewport--pageScroll' : '',
  ]
    .filter(Boolean)
    .join(' ');

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
        className={viewportClassName}
        tabIndex={hasMultiple ? 0 : undefined}
        onTouchStart={!isVertical ? handleTouchStart : undefined}
        onTouchEnd={!isVertical ? handleTouchEnd : undefined}
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
