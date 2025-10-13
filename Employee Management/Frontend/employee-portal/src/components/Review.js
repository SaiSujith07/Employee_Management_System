import React, { useEffect, useState } from "react";
import axios from "axios";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    reviewId: null,
    empId: "",
    reviewerId: "",
    reviewDate: "",
    performanceRating: "",
    comments: "",
  });

  //  Fetch reviews on page load
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:8085/reviews/get");
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews", err);
    }
  };

  //  Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Add or Update review
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedForm = {
      ...form,
      reviewDate: form.reviewDate
        ? new Date(form.reviewDate).toISOString().split("T")[0]
        : null,
    };

    try {
      if (form.reviewId) {
        // Update existing review
        await axios.put(
          `http://localhost:8085/reviews/update/${form.reviewId}`,
          formattedForm
        );
      } else {
        // Add new review
        await axios.post("http://localhost:8085/reviews/add", formattedForm);
      }

      fetchReviews(); // Refresh list
      resetForm();
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  //  Reset form
  const resetForm = () => {
    setForm({
      reviewId: null,
      empId: "",
      reviewerId: "",
      reviewDate: "",
      performanceRating: "",
      comments: "",
    });
  };

  //  Delete review
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8085/reviews/delete/${id}`);
      fetchReviews();
    } catch (err) {
      console.error("Error deleting review", err);
    }
  };

  //  Edit review
  const handleEdit = (review) => {
    setForm(review);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Employee Review Management</h2>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-2">
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
          <div className="col-md-2">
            <input
              type="number"
              name="reviewerId"
              value={form.reviewerId}
              onChange={handleChange}
              placeholder="Reviewer ID"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              name="reviewDate"
              value={form.reviewDate}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              min="1"
              max="5"
              name="performanceRating"
              value={form.performanceRating}
              onChange={handleChange}
              placeholder="Rating (1-5)"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="comments"
              value={form.comments}
              onChange={handleChange}
              placeholder="Comments"
              className="form-control"
              required
            />
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">
              {form.reviewId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {/* Review Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Reviewer ID</th>
            <th>Date</th>
            <th>Rating</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((rv) => (
              <tr key={rv.reviewId}>
                <td>{rv.reviewId}</td>
                <td>{rv.empId}</td>
                <td>{rv.reviewerId}</td>
                <td>{rv.reviewDate}</td>
                <td>{rv.performanceRating}</td>
                <td>{rv.comments}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(rv)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(rv.reviewId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No reviews found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Review;
