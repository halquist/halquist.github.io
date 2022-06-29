import './InfoCell.css';
import me_headshot from '../../images/me_headshot.png';


const InfoCell = () => {
  return(
    <div className='infoOuterContainer'>
      <div className='textContainer'>
        <div className='cellTitleText'>
          About Me
        </div>
        <p className='cellContentText'>
        I am a creative and passionate software engineer who grew up in a B&B on the shores of lake Superior.
        </p>
        <p className='cellContentText'>
        I have trained in classical and jazz music, as well as art and graphic design. I studied coding independently
        starting in high school.
        Earlier this year I completed a 6 month full-time full-stack engineering boot camp at App Academy.
        I was more energized by studying, learning, and applying software engineering concepts and skills than I have
        in many years!
        </p>
        <p className='cellContentText'>
        Software engineering is a fantastic intersection of the skills I have built over my life.
        </p>
      </div>
      <div className='photoContainer'>
        <img id='meHeadshot' src={me_headshot} width='260px'/>
      </div>
    </div>
  )
};

export default InfoCell;
