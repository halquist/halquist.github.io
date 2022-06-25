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


  // useEffect(() => {
  //   let displayIconOne = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
  //   let displayIconTwo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
  //   let displayIconThree = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
  //   let spinnerTimeout
  //   let counter = 0;
  //   spinnerTimeout = setInterval(()=> {
  //     setDisplayIconOne(IconArr[Math.floor(Math.random() * 15)])
  //     setDisplayIconTwo(IconArr[Math.floor(Math.random() * 15)])
  //     setDisplayIconThree(IconArr[Math.floor(Math.random() * 15)])
  //     counter++;
  //     if (counter === 5) {
  //       clearInterval(spinnerTimeout);
  //       // setDisplayIcon(number);
  //       setTrigger(true);
  //     }
  //   }, 500);
  //   const el1 = document.getElementById('el1');
  //   const el2 = document.getElementById('el2');
  //   const el3 = document.getElementById('el3');
  //   el1.addEventListener('webkitAnimationEnd', (e) => {
  //     if (e.animationName === 'spinner_end') {
  //       setTrigger(false);
  //       const el1Timeout = setTimeout(() => {
  //         el1.innerHTML = null
  //         el1.innerHTML = `<img id='spinnerIconOne' src=${displayIconOne} width='64px'/>`
  //         clearTimeout(el1Timeout)
  //       }, 390)
  //     }
  //   });
  //   el2.addEventListener('webkitAnimationEnd', (e) => {
  //     if (e.animationName === 'spinner_end') {
  //       setTrigger(false);
  //       const el2Timeout = setTimeout(() => {
  //       el2.innerHTML = null
  //       el2.innerHTML = `<img id='spinnerIconTwo' src=${displayIconTwo} width='64px'/>`
  //       clearTimeout(el2Timeout)
  //       }, 190)
  //     }
  //   });
  //   el3.addEventListener('webkitAnimationEnd', (e) => {
  //     if (e.animationName === 'spinner_end') {
  //       setTrigger(false);
  //       el3.innerHTML = null
  //       el3.innerHTML = `<img id='spinnerIconThree' src=${displayIconThree} width='64px'/>`
  //     }
  //   });
  // },[])

  useEffect(() => {
    const el1 = document.getElementById('el1');
    const el2 = document.getElementById('el2');
    const el3 = document.getElementById('el3');
    let displayIconOne = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg";
    let displayIconTwo = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
    let displayIconThree = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
    setTrigger(prev => !prev);
    let respinTimeout;
    respinTimeout = setInterval(() => {
      el1.innerHTML = null;
      el2.innerHTML = null;
      el3.innerHTML = null;
      // setIconElementOne(<img id='' src={displayIconOne} width='64px'/>)
      // setIconElementTwo(<img id='' src={displayIconTwo} width='64px'/>)
      // setIconElementThree(<img id='' src={displayIconThree} width='64px'/>)
      el1.scrollBy();
      el2.scrollBy();
      el3.scrollBy();
      el1.innerHTML = `<img id='spinnerIconOne' src=${displayIconOne} width='64px'/>`
      el2.innerHTML = `<img id='spinnerIconTwo' src=${displayIconTwo} width='64px'/>`
      el3.innerHTML = `<img id='spinnerIconThree' src=${displayIconThree} width='64px'/>`
      // setIconElementOne(<img id='spinnerIconOne' src={displayIconOne} width='64px'/>);
      // setIconElementTwo(<img id='spinnerIconTwo' src={displayIconTwo} width='64px'/>);
      // setIconElementThree(<img id='spinnerIconThree' src={displayIconThree} width='64px'/>);
      // setTrigger(false);
    }, 5000)
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
        setTrigger(prev => !prev);
      }
    }, 500);
  },[])

  // setBpmValue(PrizeArr[Math.floor(Math.random() * 100)]);
  // setSpinnerTrigger(true);

  return (
    <div id='fullSpinnerRow'>
      <div className='spinnerContainer'>
        {/* <BpmCoin classPass={classPass}/> */}
        <div className='bpmValueDisplaySpinner'>
        <div className='spinnerHighlight'></div>
          <div id='el1'>
            {iconElementOne}
          </div>
        </div>
      </div>
      <div className='spinnerContainer'>
        {/* <BpmCoin classPass={classPass}/> */}
        <div className='bpmValueDisplaySpinner'>
        <div className='spinnerHighlight'></div>
          <div id='el2'>
            {iconElementTwo}
          </div>
        </div>
      </div>
      <div className='spinnerContainer'>
        {/* <BpmCoin classPass={classPass}/> */}
        <div className='bpmValueDisplaySpinner'>
        <div className='spinnerHighlight'></div>
          <div id='el3'>
            {iconElementThree}
          </div>
        </div>
      </div>
    </div>
  )
};

export default SlotSpinner;
