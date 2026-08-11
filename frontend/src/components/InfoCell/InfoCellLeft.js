import './InfoCell.css';

const InfoCellLeft = ({ props }) => {
  return (
    <div className="infoOuterContainer">
      <div className="photoContainer">
        <div className="headshotFrame">
          <img
            id="meHeadshot"
            src={props.image || props.image1}
            alt="Jon Halquist"
          />
        </div>
      </div>
      <div className="textContainer">
        <div className="cellTitleText">
          {props.title}
          <div className="fillLineHorizontal"></div>
        </div>
        <div className="cellContentContainer">
          <div className="fillLineVertical"></div>
          <div className="cellContent">
            {props.content.map((el, index) => (
              <p className="cellContentText" key={index}>
                {el}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCellLeft;
