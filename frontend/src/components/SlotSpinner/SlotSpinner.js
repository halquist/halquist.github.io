import './SlotSpinner.css';
import { useEffect, useState } from 'react';
import IconArr from './IconArr';


const SlotSpinner = () => {
  const [displayIconOne, setDisplayIconOne] = useState("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg");
  const [displayIconTwo, setDisplayIconTwo] = useState("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg");
  const [displayIconThree, setDisplayIconThree] = useState("https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg");
  const [iconElementOne, setIconElementOne] = useState(<img id='spinnerIconOne' src={displayIconOne} width='64px'/>);
  const [iconElementTwo, setIconElementTwo] = useState(<img id='spinnerIconTwo' src={displayIconTwo} width='64px'/>);
  const [iconElementThree, setIconElementThree] = useState(<img id='spinnerIconThree' src={displayIconThree} width='64px'/>);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    let spinnerTimeout
    let counter = 0;
    spinnerTimeout = setInterval(()=> {
      setDisplayIconOne(IconArr[Math.floor(Math.random() * 15)])
      setDisplayIconTwo(IconArr[Math.floor(Math.random() * 15)])
      setDisplayIconThree(IconArr[Math.floor(Math.random() * 15)])
      counter++;
      if (counter === 5) {
        clearInterval(spinnerTimeout);
        // setDisplayIcon(number);
        // setTrigger(prev => !prev);
      }
    }, 500);
  },[])

  useEffect(() => {
    let spinnerTimeout
    let counter = 0;
    spinnerTimeout = setInterval(()=> {
      setDisplayIconOne(IconArr[Math.floor(Math.random() * 15)])
      setDisplayIconTwo(IconArr[Math.floor(Math.random() * 15)])
      setDisplayIconThree(IconArr[Math.floor(Math.random() * 15)])
      counter++;
      if (counter === 5) {
        clearInterval(spinnerTimeout);
        // setDisplayIcon(number);
        // setTrigger(prev => !prev);
      }
    }, 500);
  },[trigger])

  // setBpmValue(PrizeArr[Math.floor(Math.random() * 100)]);
  // setSpinnerTrigger(true);

  return (
    <div id='fullSpinnerRow'>
      <div className='spinnerContainer'>
        {/* <BpmCoin classPass={classPass}/> */}
        <div className='bpmValueDisplaySpinner'>
        <div className='spinnerHighlight'></div>
          <div id='el1'>
            <img id='spinnerIconOne' src={displayIconOne} width='64px'/>
          </div>
        </div>
      </div>
      <div className='spinnerContainer'>
        {/* <BpmCoin classPass={classPass}/> */}
        <div className='bpmValueDisplaySpinner'>
        <div className='spinnerHighlight'></div>
          <div id='el2'>
            <img id='spinnerIconTwo' src={displayIconTwo} width='64px'/>
          </div>
        </div>
      </div>
      <div className='spinnerContainer'>
        {/* <BpmCoin classPass={classPass}/> */}
        <div className='bpmValueDisplaySpinner'>
        <div className='spinnerHighlight'></div>
          <div id='el3'>
            <img id='spinnerIconThree' src={displayIconThree} width='64px'/>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SlotSpinner;
