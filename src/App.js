import React, { useState } from "react";
import "./App.css";
import User from "./components/User/page";

function App() {
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [showSkillEditPage, setShowSkillEditPage] = useState(false);
  const [skills, setSkills] = useState([]);

  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showEducationEditPage, setShowEducationEditPage] = useState(false);
  const [education, setEducation] = useState([]);

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

  const handleAddEducationClick = () => {
    setShowEducationForm(!showEducationForm);
  };

  const handleEducationFormSubmit = (newEducation) => {
    setEducation([...education, newEducation]);
    setShowEducationForm(false);
  };

  const toggleEducationEditPage = () => {
    setShowEducationEditPage(!showEducationEditPage);
  };

  const handleEducationUpdate = (updatedEducation) => {
    setEducation(updatedEducation);
    setShowEducationEditPage(false);
  };

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <div className="resumeSection">
        <h2>User</h2>
        <p>Add User Information</p>
        <User />
        <br></br>
      </div>
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
        <button>Add Skill</button>
        <br></br>
      </div>
      <br />
      <button>Export</button>
    </div>
  );
}

export default App;
