import React, { useState } from "react";
import axios from "axios";
import { BaseURL } from "../../utils";
import Menu from "../menu/Menu";

const SearchDoctorByMobileNumber = () => {
  const [doctorMobNo, setDoctorMobNo] = useState("");
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState("");

  const fetchDoctor = async () => {
    try {
      setError("");
      const response = await axios.get(`${BaseURL}/api/Doctors/byMobile/${doctorMobNo}`);
      setDoctor(response.data);
    } catch (err) {
      setDoctor(null);
      setError("❌ Doctor not found!");
    }
  };

  return (
    <div className="container mt-5">
      <Menu />
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Find Doctor Details</h2>
        
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            value={doctorMobNo}
            onChange={(e) => setDoctorMobNo(e.target.value)}
            placeholder="Enter Doctor Mobile Number"
            required
          />
          <button className="btn btn-primary" onClick={fetchDoctor}>Search</button>
        </div>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        {doctor && (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <td><strong>ID:</strong></td>
                  <td>{doctor.doctorId}</td>
                </tr>
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>{doctor.doctorName}</td>
                </tr>
                <tr>
                  <td><strong>Speciality:</strong></td>
                  <td>{doctor.speciality}</td>
                </tr>
                <tr>
                  <td><strong>Qualification:</strong></td>
                  <td>{doctor.qualification}</td>
                </tr>
                <tr>
                  <td><strong>Username:</strong></td>
                  <td>{doctor.doctorUserName}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{doctor.email}</td>
                </tr>
                <tr>
                  <td><strong>Mobile:</strong></td>
                  <td>{doctor.mobile}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDoctorByMobileNumber;
