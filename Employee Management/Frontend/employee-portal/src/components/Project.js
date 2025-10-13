import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    taskId: "",
    assignedEmpId: "",
    taskDescription: "",
    startDate: "",
    dueDate: "",
    status: "",
  });

  const baseUrl = "http://localhost:8087/projects"; // adjust port if needed

  // Fetch all projects on load
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get`);
      setProjects(res.data);
    } catch (err) {
      console.error("Error fetching projects", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedForm = {
      ...form,
      startDate: form.startDate
        ? new Date(form.startDate).toISOString().split("T")[0]
        : null,
      dueDate: form.dueDate
        ? new Date(form.dueDate).toISOString().split("T")[0]
        : null,
    };

    try {
      if (form.taskId) {
        // update
        await axios.put(`${baseUrl}/update/${form.taskId}`, formattedForm);
      } else {
        // add
        await axios.post(`${baseUrl}/add`, formattedForm);
      }

      fetchProjects();
      setForm({
        taskId: "",
        assignedEmpId: "",
        taskDescription: "",
        startDate: "",
        dueDate: "",
        status: "",
      });
    } catch (err) {
      console.error("Error saving project", err);
    }
  };

  const handleEdit = (pj) => {
    setForm(pj);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/delete/${id}`);
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Project Management</h2>

      {/* Project Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-2">
            <input
              type="number"
              name="assignedEmpId"
              value={form.assignedEmpId}
              onChange={handleChange}
              placeholder="Assigned Employee ID"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="taskDescription"
              value={form.taskDescription}
              onChange={handleChange}
              placeholder="Task Description"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-2">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="">Select Status</option>
              <option value="ASSIGNED">ASSIGNED</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
              <option value="BLOCKED">BLOCKED</option>
            </select>
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">
              {form.taskId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/* Project Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Assigned Employee</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.length > 0 ? (
            projects.map((pj) => (
              <tr key={pj.taskId}>
                <td>{pj.taskId}</td>
                <td>{pj.assignedEmpId}</td>
                <td>{pj.taskDescription}</td>
                <td>{pj.startDate}</td>
                <td>{pj.dueDate}</td>
                <td>{pj.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(pj)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(pj.taskId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No projects found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
