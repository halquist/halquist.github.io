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
        <div className="cellTitleText">
          <div className="fillLineHorizontal"></div>
          {props.title}
        </div>
        <div className="cellContentContainer">
          <div className="cellContent">
            <div className="skillsGrouped">
              {skillGroups.map((group) => (
                <div key={group.domain} className="skillGroup">
                  <h4 className="skillGroupTitle">{group.domain}</h4>
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
          <div className="fillLineVertical"></div>
        </div>
      </div>
    </div>
  );
};

export default InfoCellRight;
