import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Attendance() {
  const [attendanceList, setAttendanceList] = useState([]);
  const [form, setForm] = useState({
    attId: null,
    empId: "",
    date: "",
    checkInTime: "",
    outTime: "",
    status: ""
  });

  // Fetch attendance list
  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:8082/attendance/get");
      setAttendanceList(res.data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update attendance
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format payload like Employee.js does
    const formattedForm = {
      empId: form.empId,
      date: form.date ? new Date(form.date).toISOString().split("T")[0] : null,
      checkInTime:
        form.date && form.checkInTime
          ? `${form.date}T${form.checkInTime}:00`
          : null,
      outTime:
        form.date && form.outTime ? `${form.date}T${form.outTime}:00` : null,
      status: form.status || null
    };

    try {
      if (form.attId) {
        // Update
        await axios.put(
          `http://localhost:8082/attendance/update/${form.attId}`,
          formattedForm
        );
      } else {
        // Insert
        await axios.post("http://localhost:8082/attendance/add", formattedForm);
      }

      // Refresh table
      fetchAttendance();

      // Reset form
      setForm({
        attId: null,
        empId: "",
        date: "",
        checkInTime: "",
        outTime: "",
        status: ""
      });
    } catch (err) {
      console.error("Error saving attendance:", err);
    }
  };

  // Edit record
  const handleEdit = (record) => {
    // Re-map LocalDateTime values (yyyy-MM-ddTHH:mm:ss → date + time)
    const checkIn = record.checkInTime
      ? record.checkInTime.split("T")[1]?.substring(0, 5)
      : "";
    const out = record.outTime
      ? record.outTime.split("T")[1]?.substring(0, 5)
      : "";

    setForm({
      attId: record.attId,
      empId: record.empId,
      date: record.date,
      checkInTime: checkIn,
      outTime: out,
      status: record.status
    });
  };

  // Delete record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:8082/attendance/delete/${id}`);
        fetchAttendance();
      } catch (err) {
        console.error("Error deleting attendance:", err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Employee Attendance</h2>

      {/* Attendance Form */}
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
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="time"
              name="checkInTime"
              value={form.checkInTime}
              onChange={handleChange}
              placeholder="Check-In Time"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="time"
              name="outTime"
              value={form.outTime}
              onChange={handleChange}
              placeholder="Check-Out Time"
              className="form-control"
            />
          </div>
          <div className="col-md-3">
              <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
              </select>
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100">
              {form.attId ? "Update Attendance" : "Add Attendance"}
            </button>
          </div>
        </div>
      </form>

      {/* Attendance Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Date</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.length > 0 ? (
            attendanceList.map((a) => (
              <tr key={a.attId}>
                <td>{a.attId}</td>
                <td>{a.empId}</td>
                <td>{a.date}</td>
                <td>{a.checkInTime}</td>
                <td>{a.outTime}</td>
                <td>{a.status}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(a)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(a.attId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No attendance records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
