import './Intro.css';
import me_headshot from '../../images/me_headshot.png';
import skullPCB from '../../images/skullPCB.svg';
import circuitHorse from '../../images/circuit_horse.svg'
import SlotSpinner from '../SlotSpinner/SlotSpinner';
import IconArr from './IconArr';

const Intro = () => {
  return (
    <div id='topContainer'>
      <div className='contentHero'>
        {/* <img id='meHeadshot' src={me_headshot} width='220px'/> */}
        <div className='subContentDiv'>
          <img id='meHeadshot' src={circuitHorse} width='190px'/>
          <div className='contentDiv'>
            <div id='titleName'>JON HALQUIST</div>
            <div id='subName'>Software Engineer & Design</div>
          </div>
        </div>
      </div>
      <div className='contentDiv2'>
        <div id='subName2'>The most wonderful feeling I have ever known is the prickly glow of anxious joy as one of my creations spreads its wings and takes flight into the world.</div>
      </div>
      <div id='slotContainer'>
        <SlotSpinner winRate='1' IconArr={IconArr} />
      </div>
      {/* <img id='meHeadshot' src={skullPCB} width='600px'/> */}
    </div>
  )
};

export default Intro;
