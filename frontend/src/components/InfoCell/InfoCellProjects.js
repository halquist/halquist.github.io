import './InfoCell.css';
import LogoSmall from '../Intro/LogoSmall';
import audiohaze from '../../images/audiohaze.png'
import pulse from '../../images/pulse_image.png'
import wineaux from '../../images/wineaux.png'
import oraql from '../../images/oraql.png'

// props should pass an object with a title entry, a content entry which is an array of paragraphs
// and one or 2 images, which are linked to the image in the object file
const InfoCellProjects = ({ props }) => {

  return(
    <>
      <div id='subNameCenter'>Projects</div>

      <div className='infoOuterContainerRight'>
            <div className='photoContainer'>
              <a id='image2container' href='https://audiohaze.herokuapp.com/' target="_blank">
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


      <div className='spacerDivSmall'></div>


      <div className='infoOuterContainer'>
        <div className='photoContainer'>
          <a id='image2container' href='https://pulsepolls.herokuapp.com/' target="_blank">
            <img id='highlightImage2' src={pulse}/>
          </a>
        </div>
        <div className='textContainer'>
          <div className='cellTitleText'>
          <a href='https://pulsepolls.herokuapp.com/' target="_blank">
              Pulse
            </a>
            <div className='fillLineHorizontal'></div>
          </div>
          <div className='cellContentContainer'>
            <div className='fillLineVertical'></div>
            <div className='cellContent'>
              <p className='cellContentText'>
                Pulse is a social polling site where users can create quick, 2 choice polls on any topic. They can also view and vote on any other user's polls in a few different poll feeds.
              </p>
              <p className='cellContentText'>
                Voting on polls gives you bpm, the currency of Pulse. You can spend bpm to create polls or in the store to change your profile picture!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='spacerDivSmall'></div>

      <div className='infoOuterContainerRight'>
            <div className='photoContainer'>
              <a id='image2container' href='https://wineauxapp.herokuapp.com/login' target="_blank">
                <img id='highlightImage2' src={wineaux} />
              </a>
            </div>
        <div className='textContainer'>
          <div className='cellTitleText'>
            {/* <LogoSmall /> */}
            <div className='fillLineHorizontal'></div>
            <a href='https://wineauxapp.herokuapp.com/login' target="_blank">
              Wineaux
            </a>
          </div>
          <div className='cellContentContainer'>
            <div className='cellContent'>
              {/* {props.content.map((el) => <p className='cellContentText' key={el[1] + el[2]}>{el}</p>)} */}
              <p className='cellContentText'>
              Wineaux is an app that takes inspiration from Untappd.
              Users can share their impressions of various wines and browse
              the wine discoveries and reviews of other users.
              </p>
            </div>
            <div className='fillLineVertical'></div>
          </div>
        </div>
      </div>

      <div className='spacerDivSmall'></div>

      <div className='infoOuterContainer'>
        <div className='photoContainer'>
          <a id='image2container' href='https://oraql.herokuapp.com/' target="_blank">
            <img id='highlightImage2' src={oraql}/>
          </a>
        </div>
        <div className='textContainer'>
          <div className='cellTitleText'>
          <a href='https://oraql.herokuapp.com/' target="_blank">
              Oraql
            </a>
            <div className='fillLineHorizontal'></div>
          </div>
          <div className='cellContentContainer'>
            <div className='fillLineVertical'></div>
            <div className='cellContent'>
              <p className='cellContentText'>
              Oraql is a website for users to ask and answer
              questions about supernatural phenomena. It is
              inspired by Quora.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className='spacerDivSmall'></div>



    </>
  )
};

export default InfoCellProjects;
