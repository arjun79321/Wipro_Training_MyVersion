import React, { useState } from "react";
import axios from "axios";
import { BaseURL } from "../../utils";
import Menu from "../menu/Menu";

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    doctorName: "",
    speciality: "",
    qualification: "",
    doctorUserName: "",
    doctorPassword: "",
    email: "",
    mobile: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(`${BaseURL}/api/Doctors`, doctor);
      setMessage(`✅ Doctor added successfully! ID: ${response.data.doctorId}`);
      setDoctor({
        doctorName: "",
        speciality: "",
        qualification: "",
        doctorUserName: "",
        doctorPassword: "",
        email: "",
        mobile: "",
      });
    } catch (err) {
      setMessage("❌ Error adding doctor. Please check the details.");
    }
  };

  return (
    <div className="container mt-5">
      <Menu />
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Add New Doctor</h2>
        
        {message && <div className="alert alert-info text-center">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Doctor Name</label>
            <input type="text" name="doctorName" className="form-control" value={doctor.doctorName} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Speciality</label>
            <input type="text" name="speciality" className="form-control" value={doctor.speciality} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Qualification</label>
            <input type="text" name="qualification" className="form-control" value={doctor.qualification} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" name="doctorUserName" className="form-control" value={doctor.doctorUserName} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="doctorPassword" className="form-control" value={doctor.doctorPassword} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={doctor.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">Mobile No</label>
            <input type="text" name="mobile" className="form-control" value={doctor.mobile} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Add Doctor</button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
