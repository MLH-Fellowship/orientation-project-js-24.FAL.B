import React from "react";
import "./AddedSkillCards.css";

function AddedSkillCards({ skill }) {
  return (
    <div className="skill-card">
      <div className="skill-info">
        <img src={skill.logo} alt={`${skill.name} logo`} />
        <div className="skill-details">
          <p>{skill.name}: </p>
          <p>{skill.proficiency}</p>
        </div>
      </div>
      <div className="edit-remove">
        <button className="btn">Edit</button>
        <button className="btn">Remove</button>
      </div>
    </div>
  );
}

export default AddedSkillCards;
