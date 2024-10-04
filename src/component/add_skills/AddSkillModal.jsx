import { useEffect, useState } from "react";
import "./AddSkillModal.css"
import AddedSkillCards from "./AddedSkillsCard";


function AddSkillModal({onClose}){
    const [skillName, setSkillName] = useState("");
    const [skillProficiency, setSkillProficiency] = useState("");
    const [skillLogo, setSkillLogo] = useState("");
    const [addedSkills, setAddedSkills] = useState([]);

    // Fetch the current list of skills when it first load
    useEffect(() => {
        const fetchSkills = async () => {
            const added_skill_list = getListSkills();
            if(added_skill_list){
                setAddedSkills(added_skill_list);
            }
        }

        fetchSkills();

    }, []);


    const getListSkills = async () => {
        try {
            const response = await fetch('resume/skill', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(!response.ok){
                throw new Error("Failed to get skills");
            }

            const result = await response.json();
            return result
        } catch (error) {
            console.error("Error", error);
        }
    }

    //This addSkill function will be updated for Api POst request
    const addSkillHandler = async (skillData) => {
        try {
            const response = await fetch('/resume/skill', {
                method: "POST",
                body: JSON.stringify(skillData),
                headers: {
                    'Content-Type': 'application/json' 
                }
            });

            if(!response.ok){
                throw new Error("Failed to add skill");
            }

            const result = await response.json();
            return result.id;
        } catch (error) {
            console.error("Error", error);
        }

    }

    const addSkill = async() => {
        const skillData = {
            "name": skillName,
            "proficiency": skillProficiency,
            "logo": skillLogo             
        }

        const result_id = await addSkillHandler(skillData);
        
        if(!result_id){
            throw new Error("Failed to get skill id");
        }
        
        const newSkill = {...skillData, id: result_id};
        setAddedSkills((prevSkill) => [...prevSkill, newSkill]);
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
                            addedSkills.length > 0 ? (
                                addedSkills.map((skill, index) => (
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
                        <p>Added skills {addedSkills.length}</p>
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
