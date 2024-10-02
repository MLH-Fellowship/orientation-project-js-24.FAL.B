import React, { useState } from "react";
import "./App.css";
import AddSkillForm from './components/skills/AddSkillForm';
import SkillView from './components/skills/SkillView';
import SkillEditPage from './components/skills/SkillEditPage';

function App() {
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [showSkillEditPage, setShowSkillEditPage] = useState(false);
  const [skills, setSkills] = useState([]);

  const handleAddSkillClick = () => {
    setShowAddSkillForm(!showAddSkillForm);
  };

  const handleFormSubmit = (newSkill) => {
    setSkills([...skills, newSkill]);
    setShowAddSkillForm(false);
  };

  const toggleSkillEditPage = () => {
    setShowSkillEditPage(!showSkillEditPage);
  };

  const handleSkillUpdate = (updatedSkills) => {
    setSkills(updatedSkills);
    setShowSkillEditPage(false);
  };

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <div className="resumeSection">
        <h2>Experience</h2>
        <p>Experience Placeholder</p>
        <button>Add Experience</button>
        <br />
      </div>
      <div className="resumeSection">
        <h2>Education</h2>
        <p>Education Placeholder</p>
        <button>Add Education</button>
        <br />
      </div>
      <div className="resumeSection">
        <h2>Skills</h2>
        <SkillView skills={skills} />
        <div className="button-group">
          <button onClick={handleAddSkillClick}>
            {showAddSkillForm ? "Hide" : "Add Skill"}
          </button>
          <button onClick={toggleSkillEditPage}>
            {showSkillEditPage ? "Hide Edit Skills" : "Edit Skills"}
          </button>
        </div>
        {showAddSkillForm && <AddSkillForm onSubmit={handleFormSubmit} />}
        {showSkillEditPage && <SkillEditPage skills={skills} onUpdate={handleSkillUpdate} />}
      </div>
      <br />
      <button>Export</button>
    </div>
  );
}

export default App;