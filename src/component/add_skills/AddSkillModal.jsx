import { useState } from "react";
import "./AddSkillModal.css"

function AddSkillModal({onClose}){
    const [numberOfSkills, setNumberOfSkills] = useState(0);

    return (
        <div className="modal-background" onClick={onClose}>
            <div className="modal-container">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h2 className="modal-title">Add New Skill</h2>
                    <div className="skill-description">
                        <div className="description">
                            <label htmlFor="skill-detail">Skill Name:</label>
                            <textarea name="skill-detail" id="skill-detail" placeholder="Enter skill name"></textarea>
                        </div>
                        <div className="description">
                            <label htmlFor="proficient-detail">Proficient:</label>
                            <textarea name="proficient-detail" id="proficient-detail" placeholder="Describe proficiency"></textarea>
                        </div>
                        <div className="description">
                            <label htmlFor="logo-url">Logo URL:</label>
                            <textarea name="logo-url" id="logo-url" placeholder="Enter logo URL"></textarea>
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <button className="add-skill-btn">Add More Skills</button>
                        <button className="submit-btn" onClick={onClose}>Submit</button>
                    </div>
                    
                    {/* Added skills */}
                    <div>
                        <p>Added skills {numberOfSkills}</p>
                    </div>
                    <div className="added-skills-section">

                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default AddSkillModal;
