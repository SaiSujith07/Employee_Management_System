import React, { useEffect, useState } from "react";
import axios from "axios";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    designation: "",
    department: "",
    phone: "",
    address: "",
    salary: "",
    joiningDate: ""
  });

  //  Fetch employees on page load
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:8081/employees/get");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  //  Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  Add or Update employee
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Format joiningDate to ISO yyyy-MM-dd (Spring Boot compatible)
  const formattedForm = {
    ...form,
    joiningDate: form.joiningDate
      ? new Date(form.joiningDate).toISOString().split("T")[0]
      : null,
  };

  try {
    if (form.id) {
      // Update existing employee
      await axios.put(
        `http://localhost:8081/employees/update/${form.id}`,
        formattedForm
      );
    } else {
      // Add new employee
      await axios.post("http://localhost:8081/employees/add", formattedForm);
    }

    // Refresh employee list
    fetchEmployees();

    // Reset form
    setForm({
      id: "",
      name: "",
      email: "",
      designation: "",
      department: "",
      phone: "",
      address: "",
      salary: "",
      joiningDate: "",
    });
  } catch (error) {
    console.error("Error saving employee:", error);
  }
};

  //  Delete employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/employees/delete/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee", err);
    }
  };

  //  Load employee data into form for editing
  const handleEdit = (employee) => {
    setForm(employee);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Employee Management</h2>

      {/* Employee Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="Department"
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="Salary"
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              name="joiningDate"
              value={form.joiningDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary w-100">
              {form.id ? "Update Employee" : "Add Employee"}
            </button>
          </div>
        </div>
      </form>

      {/* Employee Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Joining Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.designation}</td>
                <td>{emp.department}</td>
                <td>{emp.phone}</td>
                <td>{emp.address}</td>
                <td>{emp.salary}</td>
                <td>{emp.joiningDate}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(emp)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
