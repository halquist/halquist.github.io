import './LinksSlider.css'

import linkedin from '../../images/linkedin.svg'
import github from '../../images/github.svg'

const LinksSlider = () => {
  return (
    <>
    <aside className='linksSliderContainer' aria-label="Social links">
      <div className='rotateContainer'>
        <a
          className='sideAnchor'
          href='https://github.com/halquist'
          target="_blank"
          rel="noopener noreferrer"
        >
        <img className='icon' src={github} width='30' height='30' alt="" />
          <div className='sideText'>
            Github
          </div>
        </a>
        <div className='fillLineVertical' aria-hidden="true"></div>
        <a
          className='sideAnchor'
          href='https://www.linkedin.com/in/jonhalquist/'
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className='icon' src={linkedin} width='30' height='30' alt="" />
          <div className='sideText'>
            LinkedIn
          </div>
        </a>
        <div className='fillLineVertical' aria-hidden="true"></div>
        <a className='sideAnchor' href='mailto:jon.halquist@gmail.com'>
          <div className='sideText'>
            Email
          </div>
        </a>
      </div>
    </aside>


    <footer className='linksSliderFooter' aria-label="Social links">
      <div className='footerContainer'>
        <a
          className='sideAnchor'
          href='https://github.com/halquist'
          target="_blank"
          rel="noopener noreferrer"
        >
        <img className='icon' src={github} width='30' height='30' alt="" />
          <div className='sideText'>
            Github
          </div>
        </a>
        <a
          className='sideAnchor'
          href='https://www.linkedin.com/in/jonhalquist/'
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className='icon' src={linkedin} width='30' height='30' alt="" />
          <div className='sideText'>
            LinkedIn
          </div>
        </a>
        <a className='sideAnchor' href='mailto:jon.halquist@gmail.com'>
          <div className='sideText'>
            Email
          </div>
        </a>
      </div>
    </footer>
    </>
  )
}

export default LinksSlider
