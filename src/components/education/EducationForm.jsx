import React, { useState, useRef, useEffect } from "react";
import RefineDescription from "../../RefineDescription";
import { useState } from "react";
import Dropzone from "../Dropzone";

function ExperienceForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
    logo: "",
    isCurrent: false,
  });

  const [errors, setErrors] = useState({});
  
  const modalRef = useRef();

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancel(); // Close the form if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCheckboxChange = () => {
    setFormData((prev) => ({
      ...prev,
      isCurrent: !prev.isCurrent,
      end_date: "",
    }));
  };

  const validateDates = () => {
    if (!formData.isCurrent && formData.end_date) {
      if (new Date(formData.end_date) < new Date(formData.start_date)) {
        setErrors({ end_date: "End date cannot be earlier than start date" });
        return false;
      }
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateDates()) return;

    const experienceData = {
      title: formData.title,
      company: formData.company,
      start_date: formData.start_date,
      end_date: formData.isCurrent ? "Present" : formData.end_date,
      description: formData.description,
      logo: formData.logo,
    };

    onSubmit(experienceData);
  };

  return (
    <div className="experienceForm modal-overlay">
      <div className="experienceForm modal experienceModal" ref={modalRef}>
        <button className="close-button" onClick={onCancel}>
          &times;
        </button>

        <form onSubmit={handleSubmit} className="experienceForm">
          {formData.logo && (
            <div className="logoPreviewContainer">
              <img src={formData.logo} alt="Logo" className="logoPreview" />
            </div>
          )}
          <div className="fileUploadContainer">
            <label className="fullWidth">
              Logo:
              <input type="file" name="logo" onChange={handleFileChange} />
            </label>
          </div>
          <div className="row">
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Company:
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="row">
            <label>
              Start Date:
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                name="end_date"
                value={formData.isCurrent ? "" : formData.end_date}
                onChange={handleChange}
                disabled={formData.isCurrent}
              />
              {errors.end_date && (
                <span className="error" style={{ color: "red" }}>
                  {errors.end_date}
                </span>
              )}
            </label>
          </div>

          <label>
            <input
              type="checkbox"
              name="isCurrent"
              checked={formData.isCurrent}
              onChange={handleCheckboxChange}
            />
            Current Job
          </label>
          <label className="fullWidth">
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{ width: '100%', height: '100px' }} 
              />
              <RefineDescription 
                description={formData.description} 
                setDescription={(refinedDescription) => setFormData(prev => ({ ...prev, description: refinedDescription }))} 
              />  
            <h2>Logo</h2>
            <Dropzone/>
          </label>

          <div className="buttonRow">
            <button type="submit">Submit</button>
            <button type="button" name="cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExperienceForm;
