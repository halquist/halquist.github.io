import { useState } from 'react';
import CarouselChevron from './CarouselChevron';
import './ImageSubCarousel.css';

const ImageSubCarousel = ({ images, alt }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const safeIndex = Math.min(imageIndex, Math.max(images.length - 1, 0));
  const hasMultiple = images.length > 1;

  const goPrev = () => setImageIndex((i) => Math.max(0, i - 1));
  const goNext = () => setImageIndex((i) => Math.min(images.length - 1, i + 1));

  if (!images.length) {
    return <div className="imageSubCarousel imageSubCarouselEmpty">No images</div>;
  }

  return (
    <div className="imageSubCarousel">
      <CarouselChevron
        direction="left"
        size="inner"
        hidden={!hasMultiple || safeIndex === 0}
        onClick={goPrev}
        ariaLabel="Previous image"
      />
      <div className="imageSubCarouselViewport">
        <img
          src={images[safeIndex]}
          alt={`${alt}, ${safeIndex + 1} of ${images.length}`}
          className="imageSubCarouselImg"
        />
      </div>
      <CarouselChevron
        direction="right"
        size="inner"
        hidden={!hasMultiple || safeIndex === images.length - 1}
        onClick={goNext}
        ariaLabel="Next image"
      />
    </div>
  );
};

export default ImageSubCarousel;
