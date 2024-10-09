import React, { useState } from "react";
import "./AddEducation.css";

const AddEducation = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [educationData, setEducationData] = useState({
    course: "",
    school: "",
    start_date: "",
    end_date: "",
    grade: "",
    logo: "",
  });

  const handleChange = (e) => {
    setEducationData({
      ...educationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/resume/education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(educationData),
      });

      const result = await response.json();
      console.log("Education added with ID:", result.id);
      setSuccessMessage("Education successfully added!");
      setEducationData({
        course: "",
        school: "",
        start_date: "",
        end_date: "",
        grade: "",
        logo: "",
      });
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Education</h2>
      <form onSubmit={handleSubmit} className="education-form">
        <label>
          Course:
          <input
            type="text"
            name="course"
            value={educationData.course}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          School:
          <input
            type="text"
            name="school"
            value={educationData.school}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="text"
            name="start_date"
            value={educationData.start_date}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="text"
            name="end_date"
            value={educationData.end_date}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Grade:
          <input
            type="text"
            name="grade"
            value={educationData.grade}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Logo (URL):
          <input
            type="text"
            name="logo"
            value={educationData.logo}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Submit Education</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default AddEducation;
