import ExperienceForm from "./components/experience/ExperienceForm";
import ViewExperience from "./components/experience/ViewExperience";
import "./App.css";
import { useCallback, useState } from "react";
import EditExperienceForm from "./components/experience/EditExperienceForm";

function App() {
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

      console.log({ experiences });
    },
    [experiences]
  );

  const handleDelete = useCallback(
    (id) => {
      const filtered = () =>
        experiences.filter((experience) => experience.id !== id);
      setExperiences(filtered);
    },
    [experiences]
  );

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
          onDelete={handleDelete}
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

  console.log({ experiences });
  return (
    <div className="App">
      <h1>Resume Builder</h1>
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
