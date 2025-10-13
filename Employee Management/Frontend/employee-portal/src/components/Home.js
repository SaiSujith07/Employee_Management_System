import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css"; // custom styles

export default function Home() {
  const [counts, setCounts] = useState({
    employees: 0,
    attendance: 0,
    leave: 0,
    payroll: 0,
    reviews: 0,
    projects: 0,
  });

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const [empRes, attRes, leaveRes, payrollRes, revRes, projRes] =
        await Promise.all([
          axios.get("http://localhost:8081/employees/get"),
          axios.get("http://localhost:8082/attendance/get"),
          axios.get("http://localhost:8083/leaves/get"),
          axios.get("http://localhost:8084/payrolls/get"),
          axios.get("http://localhost:8085/reviews/get"),
          axios.get("http://localhost:8087/projects/get"),
        ]);

      setCounts({
        employees: empRes.data.length,
        attendance: attRes.data.length,
        leave: leaveRes.data.length,
        payroll: payrollRes.data.length,
        reviews: revRes.data.length,
        projects: projRes.data.length,
      });
    } catch (error) {
      console.error("Error fetching dashboard counts:", error);
    }
  };

  const cardStyle = { textDecoration: "none" };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>
      <div className="row">
        
        <div className="col-md-4 mb-3">
          <Link to="/employees" style={cardStyle}>
            <div className="card dashboard-card text-white bg-primary shadow">
              <div className="card-body">
                <h5 className="card-title">Employees</h5>
                <h2>{counts.employees}</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4 mb-3">
          <Link to="/attendance" style={cardStyle}>
            <div className="card dashboard-card text-white bg-success shadow">
              <div className="card-body">
                <h5 className="card-title">Attendance Records</h5>
                <h2>{counts.attendance}</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4 mb-3">
          <Link to="/leave" style={cardStyle}>
            <div className="card dashboard-card text-white bg-warning shadow">
              <div className="card-body">
                <h5 className="card-title">Leaves</h5>
                <h2>{counts.leave}</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4 mb-3">
          <Link to="/payroll" style={cardStyle}>
            <div className="card dashboard-card text-white bg-danger shadow">
              <div className="card-body">
                <h5 className="card-title">Payroll Records</h5>
                <h2>{counts.payroll}</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4 mb-3">
          <Link to="/reviews" style={cardStyle}>
            <div className="card dashboard-card text-white bg-info shadow">
              <div className="card-body">
                <h5 className="card-title">Reviews</h5>
                <h2>{counts.reviews}</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-4 mb-3">
          <Link to="/projects" style={cardStyle}>
            <div className="card dashboard-card text-white bg-secondary shadow">
              <div className="card-body">
                <h5 className="card-title">Projects</h5>
                <h2>{counts.projects}</h2>
              </div>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
