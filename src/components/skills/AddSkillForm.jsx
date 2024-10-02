import React, { useState } from "react";
import "./AddSkillForm.css";

function AddSkillForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [logo, setLogo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillData = {
      name,
      proficiency,
      logo,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/resume/skill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(skillData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Skill added successfully");
        onSubmit && onSubmit();
      } else {
        console.error(`Error adding skill: ${result.message}`);
      }
    } catch (error) {
      console.error(`There was a problem with the request: ${error.message}`);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="form-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Skill Name"
        required
      />
      <input
        className="form-input"
        value={proficiency}
        onChange={(e) => setProficiency(e.target.value)}
        placeholder="Proficiency"
        required
      />
      <input
        className="form-input"
        value={logo}
        onChange={(e) => setLogo(e.target.value)}
        placeholder="Logo URL"
        required
      />
      <button className="form-button" type="submit">
        Add Skill
      </button>
    </form>
  );
}

export default AddSkillForm;
