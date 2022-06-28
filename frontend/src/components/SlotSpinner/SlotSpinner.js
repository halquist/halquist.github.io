import './SlotSpinner.css';
import { useEffect, useState } from 'react';

// the prop winRate determines approximately how often the slot will hit a win
// (3 matching symbols). A value of 1 will win on every spin, a value of 5 will
// will win once every 5 spins
const SlotSpinner = ({ winRate, IconArr}) => {

  //function used to select randomly from icon array
  const randomArrFunc = () => {
    return IconArr[Math.floor(Math.random() * IconArr.length)];
  };

  const [displayIconOne, setDisplayIconOne] = useState(randomArrFunc());
  const [displayIconTwo, setDisplayIconTwo] = useState(randomArrFunc());
  const [displayIconThree, setDisplayIconThree] = useState(randomArrFunc());
  const [rerunAnim, setRerunAnim] = useState(false);
  const [prizeTrigger, setPrizeTrigger] = useState(false);
  const [trigger, setTrigger] = useState(false);

  // main slot animation
  useEffect(() => {

    // starts animation by rendering icon div
    setRerunAnim(true);
    let spinnerInterval
    let spinnerTimeout2

    // counter will determine how many times the icon will scroll by
    // there will be 2 extra scrolls, the starting and ending animations
    let counter = 0;

    // spinnerInterval runs once for every animation, currently set for half a second
    // if you change this interval here you will also need to change the duration of
    //css animation spinner_start, spinner, or spinner_end
    // (which would all need to be the same length as eachother)

    spinnerInterval = setInterval(()=> {
      let iconOne = randomArrFunc();
      let iconTwo = randomArrFunc();
      let iconThree = randomArrFunc();
      if (iconTwo === iconThree && iconThree === iconOne) {
        console.log('intervene')
        iconThree = randomArrFunc();
      }
      setDisplayIconOne(iconOne);
      setDisplayIconTwo(iconTwo);
      setDisplayIconThree(iconThree);
      counter++;
      if (counter === 6) {
        const bigWin = Math.floor(Math.random() * winRate);
        if (bigWin === 0) {
          const winIcon = randomArrFunc();
          setDisplayIconOne(winIcon);
          setDisplayIconTwo(winIcon);
          setDisplayIconThree(winIcon);
          clearInterval(spinnerInterval);
          clearTimeout(spinnerTimeout2)
          const shortTimeout = setTimeout(() => {
            setPrizeTrigger(true);
            clearTimeout(shortTimeout);
          }, 500)
          const winTimeout = setTimeout(() => {
            setPrizeTrigger(false);
            setRerunAnim(false);
            setTrigger(prev => !prev);
            clearTimeout(winTimeout);
          }, 9000)
          return;
        }
        clearInterval(spinnerInterval);
        spinnerTimeout2 = setTimeout(() => {
          setRerunAnim(false);
          setTrigger(prev => !prev);
          clearTimeout(spinnerTimeout2)
        }, 2000)
      }
    }, 500);
  },[trigger])

  return (
    <div id='slotMachineContainer'>
      <div id='fullSpinnerRow'>
        {prizeTrigger &&
          <>
            <img src={displayIconOne} width="100" className='prizeIcon' id='prize1'/>
            <img src={displayIconOne} width="100" className='prizeIcon' id='prize2'/>
            <img src={displayIconOne} width="100" className='prizeIcon' id='prize3'/>
            <img src={displayIconOne} width="100" className='prizeIcon' id='prize4'/>
            <img src={displayIconOne} width="100" className='prizeIcon' id='prize5'/>
            <img src={displayIconOne} width="100" className='prizeIcon' id='prize6'/>
          </>
        }
        <div className='spinnerContainer'>
          {/* <BpmCoin classPass={classPass}/> */}
          <div className='bpmValueDisplaySpinner'>
          <div className='spinnerHighlight'></div>
            <div id='el1'>
              {rerunAnim &&
                <img id='spinnerIconOne' src={displayIconOne} width='80px'/>
              }
              {!rerunAnim &&
                <img src={displayIconOne} width='80px'/>
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
                <img id='spinnerIconTwo' src={displayIconTwo} width='80px'/>
              }
              {!rerunAnim &&
                <img src={displayIconTwo} width='80px'/>
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
                <img id='spinnerIconThree' src={displayIconThree} width='80px'/>
              }
              {!rerunAnim &&
                <img src={displayIconThree} width='80px'/>
              }
            </div>
          </div>
        </div>
      </div>
      {/* <div id='slotBottom'>Always a winning combination!</div> */}
    </div>
  )
};

export default SlotSpinner;
