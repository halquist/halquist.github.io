import './Intro.css';
// import me_headshot from '../../images/me_headshot.png';
// import skullPCB from '../../images/skullPCB.svg';
import circuitHorse from '../../images/circuit_horse.svg'
// import SlotSpinner from '../SlotSpinner/SlotSpinner';
// import IconArr from './IconArr';
import InfoCellLeft, {InfoCellRight, InfoCellProjects} from '../InfoCell';


import AboutMe from './ContentArrs/AboutMe';
import Skills from './ContentArrs/Skills';
import { Element } from 'react-scroll';

const Intro = () => {



  return (
    <div id='topContainer'>
      <div className='contentHero'>
        {/* <img id='meHeadshot' src={me_headshot} width='220px'/> */}
        <div className='subContentDiv'>
          <img id='circuitHorse' src={circuitHorse} width='150px'/>
          <div className='contentDiv'>
            <div id='titleName'>JON HALQUIST</div>
            <div id='subName'>Software Engineer | Interactive Design</div>
          </div>
        </div>
      </div>
      <div className='contentDiv2'>
        <div id='subName2'>Bringing curiosity and craft to every project, from production web applications to experimental hardware and generative art.</div>
      </div>
      <Element id='aboutScroll' name='aboutScroll'>
        <InfoCellLeft props={AboutMe}/>
      </Element>
        <div className='spacerDiv'></div>
      <Element id='skillsScroll' name='skillsScroll'>
        {/* <SlotSpinner winRate='4' IconArr={IconArr} /> */}
        <InfoCellRight props={Skills}/>
      </Element>
        <div className='spacerDiv'></div>
      <Element id='projectsScroll' name='projectsScroll'>
        <InfoCellProjects props={Skills}/>
      </Element>
      {/* <img id='meHeadshot' src={skullPCB} width='600px'/> */}
      <div id='slotContainer'>
      </div>
    </div>
  )
};

export default Intro;
