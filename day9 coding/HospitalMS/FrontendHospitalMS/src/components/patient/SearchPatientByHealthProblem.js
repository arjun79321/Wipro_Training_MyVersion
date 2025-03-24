import React, { useState } from "react";
import axios from "axios";
import { BaseURL } from "../../utils";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "../menu/Menu";

const SearchPatientByHealthProblem = () => {
  const [healthProblem, setHealthProblem] = useState("");
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");

  const fetchPatients = async () => {
    try {
      setError("");
      if (!healthProblem.trim()) {
        setError("❌ Please enter a health problem.");
        return;
      }

      const response = await axios.get(`${BaseURL}/api/Patients/byHealthProblem/${healthProblem}`);
      if (response.data.length === 0) {
        setError(`⚠️ No patients found with health problem: ${healthProblem}`);
        setPatients([]);
      } else {
        setPatients(response.data);
      }
    } catch (err) {
      setPatients([]);
      setError(`❌ No patients found with health problem: ${healthProblem}`);
    }
  };

  return (
    <div className="container mt-4">
      <Menu />
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">🔍 Search Patients by Health Problem</h2>

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              value={healthProblem}
              onChange={(e) => setHealthProblem(e.target.value)}
              placeholder="Enter Health Problem"
              required
            />
          </div>
          <div className="col-md-6">
            <button className="btn btn-primary px-4" onClick={fetchPatients}>
              🔍 Search
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {patients.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Health Problem</th>
                  <th>Doctor ID</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.patientId}>
                    <td>{patient.patientId}</td>
                    <td>{patient.patientName}</td>
                    <td>{patient.healthProblem}</td>
                    <td>{patient.doctorId}</td>
                    <td>{patient.email}</td>
                    <td>{patient.mobileNo}</td>
                    <td>{patient.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPatientByHealthProblem;
