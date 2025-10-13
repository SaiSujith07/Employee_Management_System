import Home from "./components/Home"; // import Home
import Navbar from "./components/Navbar";
import Employee from "./components/Employee";
import Attendance from "./components/Attendance";
import Leave from "./components/Leave";
import Payroll from "./components/Payroll";
import Review from "./components/Review";
import Project from "./components/Project";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />  {/* Dashboard as default */}
          <Route path="/employees" element={<Employee />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/projects" element={<Project />} />
        </Routes>
      </div>
    </Router>
  );
}
