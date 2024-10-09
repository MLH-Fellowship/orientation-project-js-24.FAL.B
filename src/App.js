import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddEducation from "./AddEducation";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/add-education" element={<AddEducation />} />
      </Routes>
    </Router>
  );
}

export default App;
