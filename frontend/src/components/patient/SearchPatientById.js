import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "../menu/Menu";

const SearchPatientByID = () => {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  const fetchPatient = async () => {
    try {
      setError("");
      if (!patientId.trim()) {
        setError("❌ Please enter a valid Patient ID.");
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/Patients/${patientId}`);
      if (!response.data) {
        setError(`⚠️ No patient found with ID: ${patientId}`);
        setPatient(null);
      } else {
        setPatient(response.data);
      }
    } catch (err) {
      setPatient(null);
      setError(`❌ No patient found with ID: ${patientId}`);
    }
  };

  return (
    <div className="container mt-4">
      <Menu />
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">🔍 Search Patient by ID</h2>

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter Patient ID"
              required
            />
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary px-4" onClick={fetchPatient}>
              🔍 Search
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {patient && (
          <div className="card mt-4 p-3">
            <h3 className="text-center">📄 Patient Details</h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>ID:</strong> {patient.patientId}</li>
              <li className="list-group-item"><strong>Name:</strong> {patient.patientName}</li>
              <li className="list-group-item"><strong>Health Problem:</strong> {patient.healthProblem}</li>
              <li className="list-group-item"><strong>Doctor ID:</strong> {patient.doctorId}</li>
              <li className="list-group-item"><strong>Email:</strong> {patient.email}</li>
              <li className="list-group-item"><strong>Mobile No:</strong> {patient.mobileNo}</li>
              <li className="list-group-item"><strong>Age:</strong> {patient.age}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPatientByID;
