import './LinksSlider.css'

import linkedin from '../../images/linkedin.svg'
import github from '../../images/github.svg'

const LinksSlider = () => {
  return (
    <div className='linksSliderContainer'>
      <div className='rotateContainer'>
        <a className='sideAnchor' href='https://github.com/halquist' target="_blank">
        <img className='icon' src={github} width='30px'/>
          <div className='sideText'>
            Github
          </div>
        </a>
        <div className='fillLineVertical'></div>
        <a className='sideAnchor' href='https://www.linkedin.com/in/jonhalquist/' target="_blank">
          <img className='icon' src={linkedin} width='30px'/>
          <div className='sideText'>
            LinkedIn
          </div>
        </a>
        <div className='fillLineVertical'></div>
        <a className='sideAnchor' href='mailto: jon.halquist@gmail.com' target="_blank">
          <div className='sideText'>
            jon.halquist@gmail.com
          </div>
        </a>
      </div>
    </div>
  )
}

export default LinksSlider
