import { useState } from 'react';
import CarouselSlideTrack from './CarouselSlideTrack';
import WorkCarouselCard from './WorkCarouselCard';
import './WorkCarousel.css';

const WorkCarousel = ({ title, items }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const hasMultiple = items.length > 1;
  const safeIndex = Math.min(cardIndex, Math.max(items.length - 1, 0));

  if (!items.length) {
    return null;
  }

  return (
    <div className="workCarousel">
      <div className="workCarouselHeading">
        <h3 className="workCarouselTitle">{title}</h3>
      </div>

      {hasMultiple && (
        <div
          className="workCarouselPagination"
          role="tablist"
          aria-label={`${title} projects`}
        >
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              className={`workCarouselDot ${i === safeIndex ? 'workCarouselDot--active' : ''}`}
              aria-label={`Go to project ${i + 1} of ${items.length}`}
              aria-selected={i === safeIndex}
              aria-current={i === safeIndex ? 'true' : undefined}
              onClick={() => setCardIndex(i)}
            />
          ))}
        </div>
      )}

      <CarouselSlideTrack
        className="workCarouselBleed"
        chevronSize="outer"
        ariaLabelPrefix={`${title} project`}
        index={cardIndex}
        onIndexChange={setCardIndex}
        slides={items.map((item) => ({
          key: item.id,
          node: <WorkCarouselCard item={item} />,
        }))}
      />
    </div>
  );
};

export default WorkCarousel;
