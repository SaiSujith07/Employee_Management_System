import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Payroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [form, setForm] = useState({
    payrollId: "",
    empId: "",
    salaryMonth: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    netSalary: "",
    paymentDate: "",
  });
  const [editing, setEditing] = useState(false);

  //  Fetch payrolls on load
  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const res = await axios.get("http://localhost:8084/payrolls/get");
      setPayrolls(res.data);
    } catch (err) {
      console.error("Error fetching payrolls", err);
    }
  };

  //  Handle form input
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  //  Add or update payroll
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await axios.put(
          `http://localhost:8084/payrolls/update/${form.payrollId}`,
          form
        );
      } else {
        await axios.post("http://localhost:8084/payrolls/add", form);
      }

      fetchPayrolls();
      setForm({
        payrollId: "",
        empId: "",
        salaryMonth: "",
        basicSalary: "",
        allowances: "",
        deductions: "",
        netSalary: "",
        paymentDate: "",
      });
      setEditing(false);
    } catch (err) {
      console.error("Error saving payroll", err);
    }
  };

  //  Edit payroll
  const handleEdit = (pr) => {
    setForm(pr);
    setEditing(true);
  };

  //  Delete payroll
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8084/payrolls/delete/${id}`);
      fetchPayrolls();
    } catch (err) {
      console.error("Error deleting payroll", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Payroll Management</h2>

      {/* Payroll Form */}
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
              type="month"
              name="salaryMonth"
              value={form.salaryMonth}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="basicSalary"
              value={form.basicSalary}
              onChange={handleChange}
              placeholder="Basic Salary"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="allowances"
              value={form.allowances}
              onChange={handleChange}
              placeholder="Allowances"
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="deductions"
              value={form.deductions}
              onChange={handleChange}
              placeholder="Deductions"
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              name="netSalary"
              value={form.netSalary}
              onChange={handleChange}
              placeholder="Net Salary"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              name="paymentDate"
              value={form.paymentDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100">
              {editing ? "Update Payroll" : "Add Payroll"}
            </button>
          </div>
        </div>
      </form>

      {/* Payroll Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Salary Month</th>
            <th>Basic Salary</th>
            <th>Allowances</th>
            <th>Deductions</th>
            <th>Net Salary</th>
            <th>Payment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.length > 0 ? (
            payrolls.map((pr) => (
              <tr key={pr.payrollId}>
                <td>{pr.payrollId}</td>
                <td>{pr.empId}</td>
                <td>{pr.salaryMonth}</td>
                <td>{pr.basicSalary}</td>
                <td>{pr.allowances}</td>
                <td>{pr.deductions}</td>
                <td>{pr.netSalary}</td>
                <td>{pr.paymentDate}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(pr)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(pr.payrollId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">
                No payroll records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
