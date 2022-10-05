import './InfoCell.css';
import LogoSmall from '../Intro/LogoSmall';
import SlotSpinner from '../SlotSpinner'
import IconArr from './IconArr';


// props should pass an object with a title entry, a content entry which is an array of paragraphs
// and one or 2 images, which are linked to the image in the object file
const InfoCellRight = ({ props }) => {

  return(
    <div className='infoOuterContainerRight'>
      <div className='slotContainer'>
        {/* <img id='highlightImage' src={props.image1} width='220px'/> */}
        <SlotSpinner winRate='4' IconArr={IconArr} />
      </div>
      <div className='textContainer'>
        <div className='cellTitleText'>
          {/* <LogoSmall /> */}
          <div className='fillLineHorizontal'></div>
          {props.title}
        </div>
        <div className='cellContentContainer'>
          <div className='cellContent'>
            {/* {props.content.map((el) => <p className='cellContentText' key={el[1] + el[2]}>{el}</p>)} */}
            <table className='skillTable'>
              <tbody>
                <tr>
                  <td>React</td>
                  <td>Redux</td>
                </tr>
                <tr>
                  <td>Javascript</td>
                  <td>Python</td>
                </tr>
                <tr>
                  <td>AWS</td>
                  <td>HTML</td>
                </tr>
                <tr>
                  <td>CSS</td>
                  <td>Express</td>
                </tr>
                <tr>
                  <td>Flask</td>
                  <td>SQL</td>
                </tr>
                <tr>
                  <td>PostgreSQL</td>
                  <td>SQLAlchemy</td>
                </tr>
                <tr>
                  <td>Sequelize</td>
                  <td>Docker</td>
                </tr>
                <tr>
                  <td>Node.js</td>
                  <td>Pug</td>
                </tr>
                <tr>
                  <td>Git</td>
                  <td>VS Code</td>
                </tr>
                <tr>
                  <td>Heroku</td>
                  <td>Mocha</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='fillLineVertical'></div>
        </div>
      </div>
    </div>
  )
};

export default InfoCellRight;
