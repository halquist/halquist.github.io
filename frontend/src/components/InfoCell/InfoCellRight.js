import './InfoCell.css';
import SlotSpinner from '../SlotSpinner';
import IconArr from './IconArr';
import { skillGroups } from '../../content/skills';

const InfoCellRight = ({ props }) => {
  return (
    <div className="infoOuterContainerRight">
      <div className="slotContainer">
        <SlotSpinner winRate="4" IconArr={IconArr} />
      </div>
      <div className="textContainer">
        <h2 className="cellTitleText">
          <div className="fillLineHorizontal" aria-hidden="true"></div>
          {props.title}
        </h2>
        <div className="cellContentContainer">
          <div className="cellContent">
            <div className="skillsGrouped">
              {skillGroups.map((group) => (
                <div key={group.domain} className="skillGroup">
                  <h3 className="skillGroupTitle">{group.domain}</h3>
                  <div className="skillGroupList">
                    {group.skills.map((skill) => (
                      <span key={skill} className="skillChip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="fillLineVertical" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  );
};

export default InfoCellRight;
