import { useEffect, useState } from 'react';
import { WORK_CAROUSELS, WORK_CATEGORY_LOADERS, workSection } from '../../content/work';
import WorkCarousel from './WorkCarousel';
import './WorkSection.css';

const WorkCarouselAsync = ({ title, category }) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = WORK_CATEGORY_LOADERS[category];
    if (!load) return undefined;

    load().then((mod) => {
      if (!cancelled) setItems(mod.default);
    });

    return () => {
      cancelled = true;
    };
  }, [category]);

  if (!items) {
    return (
      <div
        className="workCarousel workCarousel--loading"
        aria-busy="true"
        aria-label={`Loading ${title}`}
      >
        <div className="workCarouselHeading">
          <h3 className="workCarouselTitle">{title}</h3>
        </div>
      </div>
    );
  }

  return <WorkCarousel title={title} items={items} />;
};

const WorkSection = () => {
  return (
    <section className="workSection">
      <h2 className="sectionHeading">{workSection.title}</h2>

      {WORK_CAROUSELS.map(({ id, title, category }) => (
        <WorkCarouselAsync key={id} title={title} category={category} />
      ))}
    </section>
  );
};

export default WorkSection;
