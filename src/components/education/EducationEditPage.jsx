import React, { useState, useEffect } from "react";
import "./EducationEditPage.css";

function EducationEditPage() {
  const [educations, setEducations] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [formData, setFormData] = useState({
    course: "",
    school: "",
    start_date: "",
    end_date: "",
    grade: "",
    logo: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://127.0.0.1:5000/resume/education", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        mode: "cors",
      });

      if (response.ok) {
        const data = await response.json();

        setEducations(data);
      } else {
        const errorText = await response.text();
        console.error(
          "Failed to fetch educations. Server response:",
          errorText
        );
        setError(`Failed to fetch educations. Server response: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(`An error occurred while fetching educations: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectEducation = (education) => {
    setSelectedEducation(education);
    setFormData(education);
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
        `http://127.0.0.1:5000/resume/education?index=${selectedEducation.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Education updated successfully!");
        await fetchEducations();
        setSelectedEducation(null);
      } else {
        const errorText = await response.text();
        console.error(
          "Failed to update education. Server response:",
          errorText
        );
        setError(`Failed to update education. Server response: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(`An error occurred while updating education: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="education-edit-page">
      <h2>Edit Education</h2>
      {isLoading && <p>Loading...</p>}
      {error && (
        <div>
          <p className="error">{error}</p>
          <button onClick={fetchEducations}>Retry</button>
        </div>
      )}
      {!isLoading && !error && (
        <div className="education-edit-container">
          <div className="education-list">
            <h3>Select an education to edit:</h3>
            {educations.length === 0 ? (
              <p>No educations found. Add some education entries first.</p>
            ) : (
              educations.map((edu) => (
                <div
                  key={edu.id}
                  className={`education-item ${
                    selectedEducation && selectedEducation.id === edu.id
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleSelectEducation(edu)}
                >
                  <p>
                    {edu.course} at {edu.school}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="education-form-container">
            {selectedEducation && (
              <form onSubmit={handleSubmit} className="education-form">
                <div className="form-field">
                  <label htmlFor="course">Course:</label>
                  <input
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="school">School:</label>
                  <input
                    id="school"
                    name="school"
                    value={formData.school}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="start_date">Start Date:</label>
                  <input
                    id="start_date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="end_date">End Date:</label>
                  <input
                    id="end_date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="grade">Grade:</label>
                  <input
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="logo">Logo:</label>
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
                  {isLoading ? "Updating..." : "Update Education"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EducationEditPage;
