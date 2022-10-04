import './InfoCell.css';
import LogoSmall from '../Intro/LogoSmall';
import audiohaze from '../../images/audiohaze.png'

// props should pass an object with a title entry, a content entry which is an array of paragraphs
// and one or 2 images, which are linked to the image in the object file
const InfoCellProjects = ({ props }) => {

  return(
    <>
      <div id='subName'>Projects</div>

      <div className='infoOuterContainerRight'>
            <div className='photoContainer'>
              <a id='image2container' href='https://audiohaze.herokuapp.com/' target="_blank" style={{maxWidth:'400px'}}>
                <img id='highlightImage2' src={audiohaze} />
              </a>
            </div>
        <div className='textContainer'>
          <div className='cellTitleText'>
            {/* <LogoSmall /> */}
            <div className='fillLineHorizontal'></div>
            <a href='https://audiohaze.herokuapp.com/' target="_blank">
              Audiohaze
            </a>
          </div>
          <div className='cellContentContainer'>
            <div className='cellContent'>
              {/* {props.content.map((el) => <p className='cellContentText' key={el[1] + el[2]}>{el}</p>)} */}
              <p className='cellContentText'>
              Audiohaze is a Retrowave themed clone of soundcloud.
              Users can browse original Synthwave, Darkwave, and
              Chillwave music uploaded by other users, participate
              in a discussion about the songs, and upload their
              own music.
              </p>
            </div>
            <div className='fillLineVertical'></div>
          </div>
        </div>
      </div>
    </>
  )
};

export default InfoCellProjects;
