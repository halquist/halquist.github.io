import './InfoCell.css';
import LogoSmall from '../Intro/LogoSmall';

// props should pass an object with a title entry, a content entry which is an array of paragraphs
// and one or 2 images, which are linked to the image in the object file
const InfoCellRight = ({ props }) => {

  return(
    <div className='infoOuterContainerRight'>
      <div className='photoContainer'>
        <img id='highlightImage' src={props.image1} width='290px'/>
      </div>
      <div className='textContainer'>
        <div className='cellTitleText'>
          {/* <LogoSmall /> */}
          <div className='fillLineHorizontal'></div>
          {props.title}
        </div>
        <div className='cellContentContainer'>
          <div className='cellContent'>
            {props.content.map((el) => <p className='cellContentText' key={el[1] + el[2]}>{el}</p>)}
          </div>
          <div className='fillLineVertical'></div>
        </div>
      </div>
    </div>
  )
};

export default InfoCellRight;
