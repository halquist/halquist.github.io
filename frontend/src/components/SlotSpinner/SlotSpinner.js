import './SlotSpinner.css';
import { useEffect, useRef, useState } from 'react';

// the prop winRate determines approximately how often the slot will hit a win
// (3 matching symbols). A value of 1 will win on every spin, a value of 5 will
// will win once every 5 spins
const SlotSpinner = ({ winRate, IconArr }) => {
  const [displayIconOne, setDisplayIconOne] = useState(() =>
    IconArr[Math.floor(Math.random() * IconArr.length)]
  );
  const [displayIconTwo, setDisplayIconTwo] = useState(() =>
    IconArr[Math.floor(Math.random() * IconArr.length)]
  );
  const [displayIconThree, setDisplayIconThree] = useState(() =>
    IconArr[Math.floor(Math.random() * IconArr.length)]
  );
  const [rerunAnim, setRerunAnim] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const timersRef = useRef({
    spinnerInterval: null,
    loseTimeout: null,
    winIconTimeout: null,
    winTimeout: null,
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => setReducedMotion(event.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    const pickIcon = () => IconArr[Math.floor(Math.random() * IconArr.length)];
    const timers = timersRef.current;

    const clearAllTimers = () => {
      if (timers.spinnerInterval) clearInterval(timers.spinnerInterval);
      if (timers.loseTimeout) clearTimeout(timers.loseTimeout);
      if (timers.winIconTimeout) clearTimeout(timers.winIconTimeout);
      if (timers.winTimeout) clearTimeout(timers.winTimeout);
      timers.spinnerInterval = null;
      timers.loseTimeout = null;
      timers.winIconTimeout = null;
      timers.winTimeout = null;
    };

    clearAllTimers();
    setRerunAnim(true);

    let counter = 0;

    timers.spinnerInterval = setInterval(() => {
      let iconOne = pickIcon();
      let iconTwo = pickIcon();
      let iconThree = pickIcon();

      if (iconTwo === iconThree && iconThree === iconOne) {
        iconThree = pickIcon();
      }

      counter++;

      if (counter === 6) {
        const bigWin = Math.floor(Math.random() * winRate);
        if (bigWin === 0) {
          const winIcon = pickIcon();
          setDisplayIconOne(winIcon);
          setDisplayIconTwo(winIcon);
          setDisplayIconThree(winIcon);
          clearInterval(timers.spinnerInterval);
          timers.spinnerInterval = null;
          clearTimeout(timers.loseTimeout);
          timers.loseTimeout = null;
          timers.winIconTimeout = setTimeout(() => {
            setRerunAnim(false);
          }, 700);
          timers.winTimeout = setTimeout(() => {
            setTrigger((prev) => !prev);
          }, 5600);
          return;
        }

        clearInterval(timers.spinnerInterval);
        timers.spinnerInterval = null;

        timers.loseTimeout = setTimeout(() => {
          setRerunAnim(false);
          setTrigger((prev) => !prev);
        }, 2000);
      }

      setDisplayIconOne(iconOne);
      setDisplayIconTwo(iconTwo);
      setDisplayIconThree(iconThree);
    }, 500);

    return clearAllTimers;
  }, [trigger, winRate, IconArr, reducedMotion]);

  return (
    <div id="slotMachineContainer" aria-hidden="true">
      <div id="fullSpinnerRow">
        <div className="spinnerContainer">
          <div className="bpmValueDisplaySpinner">
            <div className="spinnerHighlight"></div>
            <div id="el1">
              {rerunAnim ? (
                <img id="spinnerIconOne" src={displayIconOne} width="80" alt="" />
              ) : (
                <img id="spinnerIconOneWin" src={displayIconOne} width="80" alt="" />
              )}
            </div>
          </div>
        </div>
        <div className="spinnerContainer">
          <div className="bpmValueDisplaySpinner">
            <div className="spinnerHighlight"></div>
            <div id="el2">
              {rerunAnim ? (
                <img id="spinnerIconTwo" src={displayIconTwo} width="80" alt="" />
              ) : (
                <img id="spinnerIconTwoWin" src={displayIconTwo} width="80" alt="" />
              )}
            </div>
          </div>
        </div>
        <div className="spinnerContainer">
          <div className="bpmValueDisplaySpinner">
            <div className="spinnerHighlight"></div>
            <div id="el3">
              {rerunAnim ? (
                <img id="spinnerIconThree" src={displayIconThree} width="80" alt="" />
              ) : (
                <img id="spinnerIconThreeWin" src={displayIconThree} width="80" alt="" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotSpinner;
