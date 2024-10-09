
import React, { useState } from "react";
import "./App.css";
import AddSkillForm from "./components/skills/AddSkillForm";
import SkillView from "./components/skills/SkillView";
import SkillEditPage from "./components/skills/SkillEditPage";
import EducationForm from "./components/education/EducationForm";
import EducationView from "./components/education/EducationView";
import EducationEditPage from "./components/education/EducationEditPage";
 import ExperienceForm from "./components/experience/ExperienceForm";
import ViewExperience from "./components/experience/ViewExperience"
import User from "./components/User/page";

function App() {
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [showSkillEditPage, setShowSkillEditPage] = useState(false);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  const handleAddExperience = () => {
    setShowExperienceForm(true);
  };

  const handleSubmitExperience = (experienceData) => {
    setExperiences([...experiences, experienceData]);
    setShowExperienceForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
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

        {showExperienceForm ? (
          <ExperienceForm
            onSubmit={handleSubmitExperience}
            onCancel={handleCancel}
          />
        ) : (
          <>
            <button onClick={handleAddExperience}>Add Experience</button>
            <ViewExperience experiences={experiences} />
          </>
        )}

      </div>

      <div className="resumeSection">
        <h2>Education</h2>

        <EducationView education={education} />
        <div className="button-group">
          <button onClick={handleAddEducationClick}>
            {showEducationForm ? "Hide" : "Add Education"}
          </button>
          <button onClick={toggleEducationEditPage}>
            {showEducationEditPage ? "Hide Edit Education" : "Edit Education"}
          </button>
        </div>
        {showEducationForm && (
          <EducationForm onSubmit={handleEducationFormSubmit} />
        )}
        {showEducationEditPage && (
          <EducationEditPage
            education={education}
            onUpdate={handleEducationUpdate}
          />
        )}

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
        {showSkillEditPage && (
          <SkillEditPage skills={skills} onUpdate={handleSkillUpdate} />
        )}
      </div>

      <br />
      <button>Export</button>
    </div>
  );
}

export default App;
