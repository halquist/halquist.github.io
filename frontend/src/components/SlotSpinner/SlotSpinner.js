import './SlotSpinner.css';
import { useEffect, useState } from 'react';
import IconArr from './IconArr';


const SlotSpinner = () => {
  const [displayIconOne, setDisplayIconOne] = useState(IconArr[Math.floor(Math.random() * 15)]);
  const [displayIconTwo, setDisplayIconTwo] = useState(IconArr[Math.floor(Math.random() * 15)]);
  const [displayIconThree, setDisplayIconThree] = useState(IconArr[Math.floor(Math.random() * 15)]);
  const [rerunAnim, setRerunAnim] = useState(false);
  const [iconElementOne, setIconElementOne] = useState(<img id='spinnerIconOne' src={displayIconOne} width='64px'/>);
  const [iconElementTwo, setIconElementTwo] = useState(<img id='spinnerIconTwo' src={displayIconTwo} width='64px'/>);
  const [iconElementThree, setIconElementThree] = useState(<img id='spinnerIconThree' src={displayIconThree} width='64px'/>);
  const [trigger, setTrigger] = useState(false);

  const winFunc = () => {
    console.log('win')
    
  }

  useEffect(() => {
    setRerunAnim(true);
    let spinnerTimeout
    let spinnerTimeout2
    let counter = 0;
    spinnerTimeout = setInterval(()=> {
      setDisplayIconOne(IconArr[Math.floor(Math.random() * 15)]);
      setDisplayIconTwo(IconArr[Math.floor(Math.random() * 15)]);
      setDisplayIconThree(IconArr[Math.floor(Math.random() * 15)]);
      counter++;
      if (counter === 6) {
        const bigWin = Math.floor(Math.random() * 6);
        if (bigWin === 3) {
          setDisplayIconOne(displayIconOne);
          setDisplayIconTwo(displayIconOne);
          setDisplayIconThree(displayIconOne);
          clearInterval(spinnerTimeout);
          winFunc();
        }
        clearInterval(spinnerTimeout);
        spinnerTimeout2 = setTimeout(() => {
          setRerunAnim(false);
          setTrigger(prev => !prev);
          clearTimeout(spinnerTimeout2)
        }, 2000)
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
            {rerunAnim &&
              <img id='spinnerIconOne' src={displayIconOne} width='64px'/>
            }
            {!rerunAnim &&
              <img src={displayIconOne} width='64px'/>
            }
          </div>
        </div>
      </div>
      <div className='spinnerContainer'>
        {/* <BpmCoin classPass={classPass}/> */}
        <div className='bpmValueDisplaySpinner'>
        <div className='spinnerHighlight'></div>
          <div id='el2'>
            {rerunAnim &&
              <img id='spinnerIconTwo' src={displayIconTwo} width='64px'/>
            }
            {!rerunAnim &&
              <img src={displayIconTwo} width='64px'/>
            }
          </div>
        </div>
      </div>
      <div className='spinnerContainer'>
        {/* <BpmCoin classPass={classPass}/> */}
        <div className='bpmValueDisplaySpinner'>
        <div className='spinnerHighlight'></div>
          <div id='el3'>
            {rerunAnim &&
              <img id='spinnerIconThree' src={displayIconThree} width='64px'/>
            }
            {!rerunAnim &&
              <img src={displayIconThree} width='64px'/>
            }
          </div>
        </div>
      </div>
    </div>
  )
};

export default SlotSpinner;
