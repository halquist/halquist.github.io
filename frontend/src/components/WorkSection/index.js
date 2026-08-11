import { WORK_CAROUSELS, WORK_ITEMS, workSection } from '../../content/work';
import WorkCarousel from './WorkCarousel';
import './WorkSection.css';

const WorkSection = () => {
  return (
    <section className="workSection">
      <h2 className="sectionHeading">{workSection.title}</h2>

      {WORK_CAROUSELS.map(({ id, title, category }) => (
        <WorkCarousel
          key={id}
          title={title}
          items={WORK_ITEMS.filter((item) => item.category === category)}
        />
      ))}
    </section>
  );
};

export default WorkSection;
