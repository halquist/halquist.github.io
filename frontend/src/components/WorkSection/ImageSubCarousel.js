import CarouselSlideTrack from './CarouselSlideTrack';
import './ImageSubCarousel.css';

const ImageSubCarousel = ({ images, alt }) => {
  if (!images.length) {
    return <div className="imageSubCarousel imageSubCarouselEmpty">No images</div>;
  }

  return (
    <div className="imageSubCarousel">
      <CarouselSlideTrack
        chevronSize="inner"
        direction="vertical"
        ariaLabelPrefix="image"
        slides={images.map((src, i) => ({
          key: `${src}-${i}`,
          node: (
            <img
              src={src}
              alt={`${alt}, ${i + 1} of ${images.length}`}
              className="imageSubCarouselImg"
            />
          ),
        }))}
      />
    </div>
  );
};

export default ImageSubCarousel;
