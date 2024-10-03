import { useState } from "react";
import "./AddSkillModal.css"
import AddedSkillCards from "./AddedSkillsCard";

let added_skills = [
    {   
        "name": "JavaScript",
        "proficiency": "2-4 years",
        "logo": "example-logo.png"   
    },
    {   
        "name": "React",
        "proficiency": "1-3 years",
        "logo": "example-logo.png"   
    }
]

function AddSkillModal({onClose}){
    const [numberOfSkills, setNumberOfSkills] = useState(added_skills.length);
    const [skillName, setSkillName] = useState("");
    const [skillProficiency, setSkillProficiency] = useState("");
    const [skillLogo, setSkillLogo] = useState("");

    //This addSkill function will be updated for Api POst request
    const addSkill = () => {
        added_skills.push({
            "name": skillName,
            "proficiency": skillProficiency,
            "logo": skillLogo
        })

        setNumberOfSkills(added_skills.length);
    }

    const handleSkillNameChange = (event) => {
        setSkillName(event.target.value);
    }

    const handleSkillProficiencyChange = (event) => {
        setSkillProficiency(event.target.value);
    }
    const handleSkillLogoChange = (event) => {
        setSkillLogo(event.target.value);
    }

    return (
        <div className="modal-background" onClick={onClose}>
            <div className="modal-container"  onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <h2 className="modal-title">Add New Skill</h2>
                    <div className="skill-description">
                        <div className="description">
                            <label htmlFor="skill-detail">Skill Name:</label>
                            <textarea 
                                name="skill-detail" 
                                id="skill-detail" 
                                placeholder="Enter skill name" 
                                onChange={handleSkillNameChange}>
                            </textarea>
                        </div>
                        <div className="description">
                            <label htmlFor="proficient-detail">Proficiency:</label>
                            <textarea 
                                name="proficient-detail" 
                                id="proficient-detail" 
                                placeholder="Describe proficiency" 
                                onChange={handleSkillProficiencyChange}>
                            </textarea>
                        </div>
                        <div className="description">
                            <label htmlFor="logo-url">Logo URL:</label>
                            <textarea 
                                name="logo-url" 
                                id="logo-url" 
                                placeholder="Enter logo URL" 
                                onChange={handleSkillLogoChange}>
                            </textarea>
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <button className="add-skill-btn" onClick={addSkill}>Add More Skills</button>
                    </div>
                </div>

                <div className="added-skill-content">
                    {/* Added skills */}
                    <div className="added-skills-section">
                        {
                            added_skills ? (
                                added_skills.map((skill, index) => (
                                    <div key={index}>
                                      <AddedSkillCards skill={skill}/> 
                                    </div>
                                ))
                            ) : (
                                "empty"
                            )
                        }
                    </div>
                    <div>
                        <p>Added skills {numberOfSkills}</p>
                    </div>
                    <div className="modal-buttons">
                        <button className="submit-btn" onClick={onClose}>Submit</button>
                    </div>

                </div>
            </div>
        </div>
    );
    
}

export default AddSkillModal;
