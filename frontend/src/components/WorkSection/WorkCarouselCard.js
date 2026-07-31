import ImageSubCarousel from './ImageSubCarousel';
import './WorkCarouselCard.css';

const WorkCarouselCard = ({ item, cardKey }) => {
  return (
    <article className="workCarouselCard">
      <header className="workCarouselCardHeader">
        <h3 className="workCarouselCardTitle">{item.title}</h3>
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="workCarouselCardLink"
          >
            View live
          </a>
        )}
      </header>

      {item.tagline && <p className="workCarouselCardTagline">{item.tagline}</p>}

      <div className="workCarouselCardTags">
        {item.tags.map((tag) => (
          <span key={tag} className="projectTag">
            {tag}
          </span>
        ))}
      </div>

      <div className="workCarouselCardDescription">
        {item.description.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>

      <ImageSubCarousel
        key={cardKey}
        images={item.images}
        alt={item.title}
      />
    </article>
  );
};

export default WorkCarouselCard;
