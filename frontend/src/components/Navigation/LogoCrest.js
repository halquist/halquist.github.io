import './Navigation.css'
import Logo from './Logo';

const LogoCrest = () => {
  return (
    <div id='logoCombo'>
    <svg version="1.1" id="logoCrest" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      width="80px" height="119px" viewBox="0 -32 200 200" enableBackground="new 0 0 200 200">
      <polygon fill="#42484D" points="0.056,0 0.056,137.76 99.999,195.462 199.944,137.76 200,137.76 200,0 "/>
      {/* <polyline id='logoStroke' fill="none" stroke="#181B1E" strokeWidth="7.0866" strokeLinecap="round" strokeMiterlimit="10" points="0.056,137.76
        99.999,195.462 199.944,137.76 200,137.76 "/> */}
    </svg>
    <Logo />
  </div>
  )
}

export default LogoCrest;
