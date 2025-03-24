import React, { useState } from "react";
import axios from "axios";
import { BaseURL } from "../../utils";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "../menu/Menu";

const SearchPatientByDoctorID = () => {
  const [doctorId, setDoctorId] = useState("");
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState("");

  const fetchPatients = async () => {
    try {
      setError("");
      if (!doctorId) {
        setError("❌ Please enter a Doctor ID.");
        return;
      }

      const response = await axios.get(`${BaseURL}/api/Patients/byDoctorId/${doctorId}`);
      if (response.data.length === 0) {
        setError(`⚠️ No patients found for Doctor ID: ${doctorId}`);
        setPatients([]);
      } else {
        setPatients(response.data);
      }
    } catch (err) {
      setPatients([]);
      setError(`❌ No patients found for Doctor ID: ${doctorId}`);
    }
  };

  return (
    <div className="container mt-4">
            <Menu />
      
      <div className="card p-4 shadow-lg">
        <h2 className="text-center mb-4">🔍 Search Patients by Doctor ID</h2>

        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              placeholder="Enter Doctor ID"
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

export default SearchPatientByDoctorID;
