import React, { useState, useEffect } from "react";
import "./SkillView.css";

function SkillView() {
  const [skills, setSkills] = useState([]);
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

  if (isLoading) return <p>Loading skills...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="skill-view">
      <h3>Your Skills</h3>
      {skills.length === 0 ? (
        <p>No skills added yet. Add some skills to get started!</p>
      ) : (
        <ul className="skill-list">
          {skills.map((skill) => (
            <li key={skill.id} className="skill-item">
              <img src={skill.logo} alt={skill.name} className="skill-logo" />
              <div className="skill-info">
                <h4>{skill.name}</h4>
                <p>Proficiency: {skill.proficiency}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SkillView;
