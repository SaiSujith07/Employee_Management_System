import React, { useState, useEffect } from "react";
import axios from "axios";

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({
    leaveId: null,
    empId: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "PENDING"
  });

  //  Fetch leaves on page load
  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:8083/leaves/get");
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leaves", err);
    }
  };

  //  Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  Add or Update leave request
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.leaveId) {
        // Update existing leave
        await axios.put(`http://localhost:8083/leaves/update/${form.leaveId}`, form);
      } else {
        // Add new leave
        await axios.post("http://localhost:8083/leaves/add", form);
      }

      fetchLeaves();
      resetForm();
    } catch (error) {
      console.error("Error saving leave:", error);
    }
  };

  //  Reset form
  const resetForm = () => {
    setForm({
      leaveId: null,
      empId: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
      status: "PENDING"
    });
  };

  //  Delete leave
  const handleDelete = async (leaveId) => {
    try {
      await axios.delete(`http://localhost:8083/leaves/delete/${leaveId}`);
      fetchLeaves();
    } catch (err) {
      console.error("Error deleting leave", err);
    }
  };

  //  Load leave data into form for editing
  const handleEdit = (leave) => {
    setForm(leave);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Leave Management</h2>

      {/* Leave Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="number"
              name="empId"
              value={form.empId}
              onChange={handleChange}
              placeholder="Employee ID"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="leaveType"
              value={form.leaveType}
              onChange={handleChange}
              placeholder="Leave Type (SICK, ANNUAL)"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Reason"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-control"
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary w-100">
              {form.id ? "Update Leave" : "Add Leave"}
            </button>
          </div>
        </div>
      </form>

      {/* Leave Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Leave Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length > 0 ? (
            leaves.map((lv) => (
              <tr key={lv.leaveId}>
                <td>{lv.leaveId}</td>
                <td>{lv.empId}</td>
                <td>{lv.leaveType}</td>
                <td>{lv.startDate}</td>
                <td>{lv.endDate}</td>
                <td>{lv.reason}</td>
                <td>{lv.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(lv)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(lv.leaveId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No leave requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Leave;
