import React from 'react';

function ViewExperience({ experiences, onEdit, onDelete }) {
  const sortedExperiences = experiences.sort((a, b) => {
    const isACurrent = a.end_date === 'Present';
    const isBCurrent = b.end_date === 'Present';

    if (isACurrent && !isBCurrent) return -1;
    if (!isACurrent && isBCurrent) return 1;

    const dateA = new Date(a.start_date);
    const dateB = new Date(b.start_date);
    return dateB - dateA;
  });

  return (
    <div className="experienceTable">
      {sortedExperiences.map((experience, index) => (
        <div key={index} className="experienceRow">
          <div className="experienceLogo">
            {experience.logo ? (
              <img src={experience.logo} alt={`${experience.company} logo`} />
            ) : (
              <div className="noLogo">No Logo</div>
            )}
          </div>

          <div className="experienceDetails">
            <div className="experienceTitle">{experience.title}</div>
            <div className="experienceCompany">{experience.company}</div>
            <div className="experienceDates">
              {experience.start_date} - {experience.end_date || 'Present'}
            </div>
            <div className="experienceDescription">{experience.description}</div>
          </div>

          <div className="experienceActions">
            <button onClick={() => onEdit(index)}>Edit</button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewExperience;
