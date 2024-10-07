import "./App.css";
import User from "./components/User/page";

function App() {
    return (
        <div className="App">
            <h1>Resume Builder</h1>
            <div className="resumeSection">
                <h2>User</h2>
                <p>Add your personal user info!</p>
                <button>Add User information</button>  {/* TODO click on button to open modal*/}
                <br></br>
            </div>
            <div className="resumeSection">
                <h2>Experience</h2>
                <p>Experience Placeholder</p>
                <button>Add Experience</button>
                <br></br>
            </div>
            <div className="resumeSection">
                <h2>Education</h2>
                <p>Education Placeholder</p>
                <button>Add Education</button>
                <br></br>
            </div>
            <div className="resumeSection">
                <h2>Skills</h2>
                <p>Skill Placeholder</p>
                <button>Add Skill</button>
                <br></br>
            </div>
            <br></br>
            <button>Export</button>
        </div>
    );
}

export default App;
