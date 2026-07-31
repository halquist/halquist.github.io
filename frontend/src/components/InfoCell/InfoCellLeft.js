import './InfoCell.css';

// props should pass an object with a title entry, a content entry which is an array of paragraphs
// and one or 2 images, which are linked to the image in the object file
const InfoCellLeft = ({ props }) => {

  return(
    <div className='infoOuterContainer'>
      <div className='photoContainer'>
        <img id='meHeadshot' src={props.image || props.image1} width='290px' alt="Jon Halquist"/>
      </div>
      <div className='textContainer'>
        <div className='cellTitleText'>
          {/* <LogoSmall /> */}
          {props.title}
          <div className='fillLineHorizontal'></div>
        </div>
        <div className='cellContentContainer'>
          <div className='fillLineVertical'></div>
          <div className='cellContent'>
            {props.content.map((el) => <p className='cellContentText' key={el[1] + el[2]}>{el}</p>)}
          </div>
        </div>
      </div>
    </div>
  )
};

export default InfoCellLeft;
