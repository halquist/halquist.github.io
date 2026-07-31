import './Intro.css';
import circuitHorse from '../../images/circuit_horse.svg';
import InfoCellLeft from '../InfoCell/InfoCellLeft';
import InfoCellRight from '../InfoCell/InfoCellRight';
import WorkSection from '../WorkSection';
import PrizmaSection from '../PrizmaSection';
import { hero, about } from '../../content/profile';
import { skillsSection } from '../../content/skills';
import { Element } from 'react-scroll';

const Intro = () => {
  return (
    <div id="topContainer">
      <div className="contentHero">
        <div className="subContentDiv">
          <div className="contentDiv">
          <img id="circuitHorse" src={circuitHorse} width="150px" alt="" />
            <div id="titleName">{hero.name}</div>
            <div id="subName">{hero.tagline}</div>
          </div>
        </div>
      </div>
      <div className="contentDiv2">
        <div id="subName2">{hero.subtext}</div>
      </div>

      <Element id="aboutScroll" name="aboutScroll">
        <InfoCellLeft props={about} />
      </Element>

      <div className="spacerDiv"></div>

      <Element id="workScroll" name="workScroll">
        <WorkSection />
      </Element>

      <div className="spacerDiv"></div>

      <PrizmaSection />

      <div className="spacerDiv"></div>

      <Element id="skillsScroll" name="skillsScroll">
        <InfoCellRight props={skillsSection} />
      </Element>
    </div>
  );
};

export default Intro;
