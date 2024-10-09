import React, { useState, useEffect } from "react";
import "./SkillEditPage.css";

function SkillEditPage() {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    proficiency: "",
    logo: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/resume/skill", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      } else {
        const errorText = await response.text();
        setError(`Failed to fetch skills. Server response: ${errorText}`);
      }
    } catch (error) {
      setError(`An error occurred while fetching skills: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSkill = (skill) => {
    setSelectedSkill(skill);
    setFormData(skill);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/resume/skill?index=${selectedSkill.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Skill updated successfully!");
        await fetchSkills();
        setSelectedSkill(null);
      } else {
        const errorText = await response.text();
        setError(`Failed to update skill. Server response: ${errorText}`);
      }
    } catch (error) {
      setError(`An error occurred while updating skill: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="skill-edit-page">
      <h2>Edit Skill</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && (
        <div className="skill-edit-container">
          <div className="skill-list">
            <h3>Select a skill to edit:</h3>
            {skills.length === 0 ? (
              <p>No skills found. Add some skills first.</p>
            ) : (
              skills.map((skill) => (
                <div
                  key={skill.id}
                  className={`skill-item ${
                    selectedSkill && selectedSkill.id === skill.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSelectSkill(skill)}
                >
                  <p>{skill.name}</p>
                </div>
              ))
            )}
          </div>
          <div className="skill-form-container">
            {selectedSkill && (
              <form onSubmit={handleSubmit} className="skill-form">
                <div className="form-field">
                  <label htmlFor="name">Skill Name:</label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="proficiency">Proficiency:</label>
                  <input
                    id="proficiency"
                    name="proficiency"
                    value={formData.proficiency}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="logo">Logo URL:</label>
                  <input
                    id="logo"
                    name="logo"
                    value={formData.logo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update Skill"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SkillEditPage;
