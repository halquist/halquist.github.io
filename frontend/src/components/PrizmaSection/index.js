import { lazy, Suspense } from 'react';
import { Element } from 'react-scroll';
import { prizmaSection } from '../../content/prizma';
import './PrizmaSection.css';

const PrizmaVisualizer = lazy(() => import('./PrizmaVisualizer'));

const PrizmaSection = () => {
  return (
    <Element id="prizmaScroll" name="prizmaScroll">
      <section className="prizmaSection">
        <h2 className="sectionHeading">{prizmaSection.title}</h2>
        <div className="prizmaDescription">
          {prizmaSection.description.map((paragraph) => (
            <p className="prizmaDescriptionText" key={paragraph.slice(0, 40)}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="prizmaCanvasContainer">
          <Suspense
            fallback={
              <div className="prizmaVisualizerPlaceholder">
                <span className="prizmaPlaceholderText">Loading...</span>
              </div>
            }
          >
            <PrizmaVisualizer />
          </Suspense>
        </div>
      </section>
    </Element>
  );
};

export default PrizmaSection;
