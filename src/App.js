import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";

function App() {
  const [experience, setExperience] = useState("Experience Placeholder");
  const [education, setEducation] = useState("Education Placeholder");
  const [skills, setSkills] = useState("Skill Placeholder");

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Resume", 10, 10);
    
    doc.setFontSize(16);
    doc.text("Experience", 10, 30);
    doc.setFontSize(12);
    doc.text(experience, 10, 40);

    doc.setFontSize(16);
    doc.text("Education", 10, 60);
    doc.setFontSize(12);
    doc.text(education, 10, 70);

    doc.setFontSize(16);
    doc.text("Skills", 10, 90);
    doc.setFontSize(12);
    doc.text(skills, 10, 100);

    // Save the PDF
    doc.save("resume.pdf");
  };

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <div className="resumeSection">
        <h2>Experience</h2>
        <p>{experience}</p>
        <button onClick={() => setExperience(prompt("Enter experience:"))}>Add Experience</button>
      </div>
      <div className="resumeSection">
        <h2>Education</h2>
        <p>{education}</p>
        <button onClick={() => setEducation(prompt("Enter education:"))}>Add Education</button>
      </div>
      <div className="resumeSection">
        <h2>Skills</h2>
        <p>{skills}</p>
        <button onClick={() => setSkills(prompt("Enter skills:"))}>Add Skill</button>
      </div>
      <br />
      <button onClick={exportToPDF}>Export</button>
    </div>
  );
}

export default App;
