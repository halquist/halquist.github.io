import { useState } from 'react';
import CarouselChevron from './CarouselChevron';
import WorkCarouselCard from './WorkCarouselCard';
import './WorkCarousel.css';

const WorkCarousel = ({ title, items }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const safeIndex = Math.min(cardIndex, Math.max(items.length - 1, 0));
  const hasMultiple = items.length > 1;
  const currentItem = items[safeIndex];

  if (!items.length) {
    return null;
  }

  return (
    <div className="workCarousel">
      <div className="workCarouselHeading">
        <h3 className="workCarouselTitle">{title}</h3>
        {hasMultiple && (
          <span className="workCarouselCounter">
            {safeIndex + 1} / {items.length}
          </span>
        )}
      </div>

      <div className="workCarouselTrack">
        <CarouselChevron
          direction="left"
          size="outer"
          hidden={!hasMultiple || safeIndex === 0}
          onClick={() => setCardIndex((i) => Math.max(0, i - 1))}
          ariaLabel={`Previous ${title} project`}
        />

        <WorkCarouselCard item={currentItem} cardKey={currentItem.id} />

        <CarouselChevron
          direction="right"
          size="outer"
          hidden={!hasMultiple || safeIndex === items.length - 1}
          onClick={() => setCardIndex((i) => Math.min(items.length - 1, i + 1))}
          ariaLabel={`Next ${title} project`}
        />
      </div>
    </div>
  );
};

export default WorkCarousel;
