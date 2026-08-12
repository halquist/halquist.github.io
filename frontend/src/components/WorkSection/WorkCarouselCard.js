import ImageSubCarousel from './ImageSubCarousel';
import './WorkCarouselCard.css';

const WorkCarouselCard = ({ item }) => {
  return (
    <article className="workCarouselCard">
      <div className="workCarouselCardText">
        <div className="workCarouselCardMeta">
          <header className="workCarouselCardHeader">
            <h4 className="workCarouselCardTitle">{item.title}</h4>
          </header>

          {item.tagline && <p className="workCarouselCardTagline">{item.tagline}</p>}

          <div className="workCarouselCardTags">
            {item.tags.map((tag) => (
              <span key={tag} className="projectTag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="workCarouselCardDescription">
          {item.description.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="workCarouselCardVisitBtn"
            >
              Visit Site
            </a>
          )}
        </div>
      </div>

      <div className="workCarouselCardMedia">
        <ImageSubCarousel images={item.images} alt={item.title} />
      </div>
    </article>
  );
};

export default WorkCarouselCard;
