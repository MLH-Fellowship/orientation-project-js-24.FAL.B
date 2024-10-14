import React, { useState } from "react";
import "./App.css";
import { useCallback } from "react";
import EditExperienceForm from "./components/experience/EditExperienceForm";
import User from "./components/User/page";
import EducationEditPage from "./components/education/EducationEditPage";
import EducationForm from "./components/education/EducationForm";
import EducationView from "./components/education/EducationView";

import AddSkillForm from "./components/skills/AddSkillForm";
import SkillEditPage from "./components/skills/SkillEditPage";
import SkillView from "./components/skills/SkillView";
import ExperienceForm from "./components/experience/ExperienceForm";
import ViewExperience from "./components/experience/ViewExperience";

function App() {
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showEducationEditPage, setShowEducationEditPage] = useState(false);
  const [education, setEducation] = useState([]);
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [showSkillEditPage, setShowSkillEditPage] = useState(false);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  const handleSubmitExperience = (experienceData) => {
    setExperiences([...experiences, experienceData]);
    setActiveTab("view");
  };

  const handleCancel = () => {
    setActiveTab("view");
  };

  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleEdit = useCallback(
    (newItem) => {
      const updatedExperiences = experiences.map((experience) =>
        experience.id === newItem.id ? newItem : experience
      );
      setExperiences(updatedExperiences);
      setActiveTab("view");
    },
    [experiences]
  );

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

  const experienceTabs = {
    form: (
      <ExperienceForm
        onSubmit={handleSubmitExperience}
        onCancel={handleCancel}
        setSelectedExperience={setSelectedExperience}
      />
    ),
    view: (
      <>
        <ViewExperience
          experiences={experiences}
          setSelectedExperience={setSelectedExperience}
          setActiveTab={setActiveTab}
        />
      </>
    ),
    edit: (
      <EditExperienceForm
        experience={selectedExperience}
        onSubmit={handleEdit}
      />
    ),
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

        <button
          onClick={() => setActiveTab("form")}
          style={{ marginBottom: "20px" }}
        >
          Add Experience
        </button>

        {experienceTabs[activeTab]}
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
