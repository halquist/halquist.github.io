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

  // variables for animation intervals and timeouts, need to be in function scope for
  // access outside of where the timeouts are declared
  let spinnerInterval;
  let loseTimeout;
  let winIconTimeout;
  let shortTimeout;
  let winTimeout;

  // main slot animation
  useEffect(() => {
    // clearInterval(spinnerInterval);
    // clearTimeout(loseTimeout);
    // clearTimeout(winIconTimeout);
    // clearTimeout(shortTimeout);
    // clearTimeout(winTimeout);

    // starts animation by rendering icon div
    setRerunAnim(true);

    // counter will determine how many times the icon will scroll by
    // there will be 2 extra scrolls, the starting and ending animations
    // counter increments below in spinnerInterval
    let counter = 0;

    // spinnerInterval runs once for every animation, currently set for half a second
    // if you change this interval here you will also need to change the duration of
    //css animation spinner_start, spinner, or spinner_end
    // (which would all need to be the same length as each other)

    spinnerInterval = setInterval(()=> {
      let iconOne = randomArrFunc();
      let iconTwo = randomArrFunc();
      let iconThree = randomArrFunc();

      // conditional makes it very unlikely that it will organically land 3 matched symbols
      // since making the prizeTrigger run in this case breaks other parts of the component

      if (iconTwo === iconThree && iconThree === iconOne) {
        iconThree = randomArrFunc();
      }

      // sets each icon to the randomly selected variables above

      setDisplayIconOne(iconOne);
      setDisplayIconTwo(iconTwo);
      setDisplayIconThree(iconThree);

      // increments counter which determines how many times to run the spinner
      counter++;

      // once this conditional is met by the counter we determine if the spin will be a win or not
      // a series of timeouts will run the win animation, or reset the reel to spin again on a
      // non-win

      if (counter === 6) {
        const bigWin = Math.floor(Math.random() * winRate);
        if (bigWin === 0) {
          const winIcon = randomArrFunc();
          setDisplayIconOne(winIcon);
          setDisplayIconTwo(winIcon);
          setDisplayIconThree(winIcon);
          clearInterval(spinnerInterval);
          clearTimeout(loseTimeout);
          winIconTimeout = setTimeout(() => {
            setRerunAnim(false);
            clearTimeout(winIconTimeout);
          }, 700)
          shortTimeout = setTimeout(() => {
            setPrizeTrigger(true);
            clearTimeout(shortTimeout);
          }, 500)
          winTimeout = setTimeout(() => {
            setPrizeTrigger(false);
            setTrigger(prev => !prev);
            clearTimeout(winTimeout);
          }, 9500)
          return;
        }
        clearInterval(spinnerInterval);

        // this timeout runs if there isn't a win to start the spinner again
        loseTimeout = setTimeout(() => {
          setRerunAnim(false);
          setTrigger(prev => !prev);
          clearTimeout(loseTimeout)
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
                <img id='spinnerIconOneWin' src={displayIconOne} width='80px'/>
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
                <img id='spinnerIconTwoWin' src={displayIconTwo} width='80px'/>
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
                <img id='spinnerIconThreeWin' src={displayIconThree} width='80px'/>
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
