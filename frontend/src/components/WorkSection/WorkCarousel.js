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
        {hasMultiple && (
          <span className="workCarouselCounter">
            {safeIndex + 1} / {items.length}
          </span>
        )}
      </div>

      <CarouselSlideTrack
        className="workCarouselBleed"
        chevronSize="outer"
        ariaLabelPrefix={`${title} project`}
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
