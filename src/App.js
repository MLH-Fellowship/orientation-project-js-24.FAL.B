import { useState } from "react";
import "./App.css";
import AddSkillModal from "./component/add_skills/AddSkillModal";

function App() {
  const [openAddSkillModal, setOpenAddSkillModal] = useState(false);

  const clickAddSkill = () => {
    setOpenAddSkillModal((prevState) => !prevState);
  }

  
  return (
    <div className="App">
      {
        openAddSkillModal && (
          <AddSkillModal onClose={clickAddSkill}/>
        )
      }

      <h1>Resume Builder</h1>
      <div className="resumeSection">
        <h2>Experience</h2>
        <p>Experience Placeholder</p>
        <button>Add Experience</button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Education</h2>
        <p>Education Placeholder</p>
        <button>Add Education</button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Skills</h2>
        <p>Skill Placeholder</p>
        <button onClick={clickAddSkill}>Add Skill</button>
        <br></br>
      </div>
      <br></br>
      <button>Export</button>
    </div>
  );
}

export default App;
