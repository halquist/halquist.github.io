import { Element } from 'react-scroll';
import PrizmaHeroVisualizer from '../PrizmaHero/PrizmaHeroVisualizer';
import { prizmaSection } from '../../content/prizma';
import './PrizmaSection.css';

const PrizmaSection = () => {
  return (
    <Element id="prizmaScroll" name="prizmaScroll">
      <section className="prizmaSection">
        <h2 className="sectionHeading">{prizmaSection.title}</h2>
        <div className="prizmaVisualizerRow">
          <PrizmaHeroVisualizer />
        </div>
        <div className="prizmaDescription">
          {prizmaSection.description.map((paragraph) => (
            <p className="prizmaDescriptionText" key={paragraph.slice(0, 40)}>
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </Element>
  );
};

export default PrizmaSection;
