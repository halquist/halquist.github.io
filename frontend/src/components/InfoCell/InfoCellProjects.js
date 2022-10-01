import './InfoCell.css';
import LogoSmall from '../Intro/LogoSmall';
import audiohaze from '../../images/audiohaze.png'

// props should pass an object with a title entry, a content entry which is an array of paragraphs
// and one or 2 images, which are linked to the image in the object file
const InfoCellProjects = ({ props }) => {

  return(
    <div className='infoOuterContainerRight'>
          <div className='photoContainer'>
            <img id='highlightImage2' src={audiohaze} width='520px'/>
          </div>
      <div className='textContainer'>
        <div className='cellTitleText'>
          {/* <LogoSmall /> */}
          <div className='fillLineHorizontal'></div>
          Audiohaze
        </div>
        <div className='cellContentContainer'>
          <div className='cellContent2'>
            {/* {props.content.map((el) => <p className='cellContentText' key={el[1] + el[2]}>{el}</p>)} */}
            Audiohaze dfsdfasdfafsdasfdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfsadfasdf
          </div>
          <div className='fillLineVertical'></div>
        </div>
      </div>
    </div>
  )
};

export default InfoCellProjects;
