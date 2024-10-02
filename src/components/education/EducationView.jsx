import { useState, useEffect } from "react";
import EducationEdit from "./EducationEdit";
import defaultLogo from '../../assets/graduation-cap.png'
import editIcon from '../../assets/edit.png'
import './EducationView.css'

const EducationView = () => {
    const [educationData, setEducationData] = useState([]);
    const [showEdit, setShowEdit] = useState([false, null]);

    useEffect(() => {
        fetch("/resume/education")
            .then((res) => {
                res.json().then((data) => {
                setEducationData(data);
            })
        });
    }, []);

    const handleEditClick = (field) => (e) => {
        e.preventDefault();
        setShowEdit([!showEdit[0], field])
    }

    return (
        <>
        {educationData ?
            educationData.map(education =>
                <div key={education.id} className="education-item">
                        <div className="education-item-school-container">
                            <div className="education-item-school">
                                {education.logo.includes("example") ? <img src={defaultLogo} alt="defaultLogo" className="logo"/> : <img src={education.logo} alt="logo" className="logo"/>}
                                <h3>{education.school}</h3>
                            </div>
                            <button className="icon-button" onClick={handleEditClick(education.id)}>
                                    <img src={editIcon}
                                    alt="editIcon"
                                    className="icon"/>
                            </button>
                        </div>
                        <div className="education-item-course">
                            <li>{education.course}</li>
                            <li>Grade: {education.grade}</li>
                            <li>{education.start_date} - {education.end_date}</li>
                        </div>
                        {showEdit[0] && showEdit[1] === education.id && <EducationEdit education={education} showEdit={showEdit} setShowEdit={setShowEdit}/>}
                </div>
                )
            : ""}
        </>
    )
};

export default EducationView;