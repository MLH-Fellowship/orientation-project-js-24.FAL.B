import { useState } from "react";
import Dropzone from "../Dropzone";

const EducationForm = () => {
  const [formData, setFormData] = useState({
    course: "",
    school: "",
    start_date: "",
    end_date: "",
    grade: "",
    logo: "",
  });

  const handleChange = (field) => (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      [field]: e.currentTarget.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:5000/resume/education", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Education successfully added!");
      })
      .catch((error) => {
        alert("Error: Education not added :(");
      });
  };

  return (
    <>
      <div className="education-form-container">
        <form onSubmit={handleSubmit}>
          <label>
            <h2>Course</h2>
            <input
              type="text"
              value={formData.course}
              placeholder="Course"
              onChange={handleChange("course")}
            />
          </label>
          <label>
            <h2>School</h2>
            <input
              type="text"
              value={formData.school}
              placeholder="School"
              onChange={handleChange("school")}
            />
          </label>
          <label>
            <h2>Start Date</h2>
            <input
              type="month"
              value={formData.start_date}
              placeholder="Month Year"
              onChange={handleChange("start_date")}
            />
          </label>
          <label>
            <h2>End Date</h2>
            <input
              type="month"
              value={formData.end_date}
              placeholder="End Date"
              onChange={handleChange("end_date")}
            />
          </label>
          <label>
            <h2>Grade</h2>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.grade}
              placeholder="Grade"
              onChange={handleChange("grade")}
            />
            %
          </label>
          <label>
            <h2>Logo</h2>
            <Dropzone />
          </label>

          <button onSubmit={handleSubmit}>Submit Education</button>
        </form>
      </div>
    </>
  );
};

export default EducationForm;
