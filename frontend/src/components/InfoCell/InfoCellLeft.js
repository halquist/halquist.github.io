import './InfoCell.css';

const InfoCellLeft = ({ props }) => {
  return (
    <div className="infoOuterContainer infoOuterContainer--about">
      <div className="photoContainer">
        <div className="headshotFrame">
          <div className="headshotFlip">
            <img
              id="meHeadshot"
              src={props.image || props.image1}
              alt="Jon Halquist"
            />
          </div>
        </div>
      </div>
      <div className="textContainer">
        <h2 className="cellTitleText">
          {props.title}
          <div className="fillLineHorizontal" aria-hidden="true"></div>
        </h2>
        <div className="cellContent">
          {props.content.map((el, index) => (
            <p className="cellContentText" key={index}>
              {el}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCellLeft;
