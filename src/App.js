import ExperienceForm from "./components/experience/ExperienceForm";
import ViewExperience from "./components/experience/ViewExperience";
import "./App.css";
import { useState } from "react";

function App() {
  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddExperience = () => {
    setShowForm(true);
  };

  const handleSubmitExperience = (experienceData) => {
    setExperiences([...experiences, experienceData]);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <div className="resumeSection">
        <h2>Experience</h2>

        {showForm ? (
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
        <p>Education Placeholder</p>
        <button>Add Education</button>
      </div>

      <div className="resumeSection">
        <h2>Skills</h2>
        <p>Skill Placeholder</p>
        <button>Add Skill</button>
      </div>

      <br />
      <button>Export</button>
    </div>
  );
}

export default App;
