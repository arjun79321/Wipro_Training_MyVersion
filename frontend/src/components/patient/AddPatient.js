import { useState } from "react";
import axios from "axios";
import Menu from "../menu/Menu";
import { BaseURL } from "../../utils";
import "bootstrap/dist/css/bootstrap.min.css";

const AddPatient = () => {
  const [data, setData] = useState({
    patientName: "",
    healthProblem: "",
    doctorId: "",
    email: "",
    mobileNo: "",
    age: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const addPatient = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    axios
      .post(`${BaseURL}/api/Patients`, {
        patientName: data.patientName,
        healthProblem: data.healthProblem,
        doctorId: parseInt(data.doctorId),
        email: data.email,
        mobileNo: data.mobileNo,
        age: parseInt(data.age),
      })
      .then((resp) => {
        console.log(resp.data);
        setMessage("✅ Patient added successfully!");
        setData({ patientName: "", healthProblem: "", doctorId: "", email: "", mobileNo: "", age: "" }); // Clear form
      })
      .catch((error) => {
        console.error("Error adding patient:", error);
        setMessage("❌ Failed to add patient. Please try again.");
      });
  };

  return (
    <div className="container mt-4">
      <Menu />
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">🩺 Add New Patient</h2>

        {message && <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"}`}>{message}</div>}

        <form onSubmit={addPatient}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Patient Name:</label>
              <input
                type="text"
                name="patientName"
                value={data.patientName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Health Problem:</label>
              <input
                type="text"
                name="healthProblem"
                value={data.healthProblem}
                onChange={handleChange}
                className="form-control"
                placeholder="E.g., Fever, Diabetes"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Doctor ID (Assign to Doctor):</label>
              <input
                type="number"
                name="doctorId"
                value={data.doctorId}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Doctor ID"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Mobile No:</label>
              <input
                type="text"
                name="mobileNo"
                value={data.mobileNo}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter mobile number"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Age:</label>
              <input
                type="number"
                name="age"
                value={data.age}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter age"
                required
              />
            </div>

            <div className="text-center mt-3">
              <button type="submit" className="btn btn-primary px-5">
                ➕ Add Patient
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
