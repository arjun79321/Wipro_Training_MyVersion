import React, { useState } from 'react';
import { BaseURL } from '../../utils';
import axios from 'axios';
import Menu from '../menu/Menu';

const SearchDoctorBySpecialization = () => {
    const [specialization, setSpecialization] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setSpecialization(e.target.value);
    };

    const handleSearch = async () => {
        try {
            setError('');
            const response = await axios.get(`${BaseURL}/api/Doctors/bySpecialization/${specialization}`);

            if (response.data.length === 0) {
                setError(`No doctors found with specialization "${specialization}".`);
                setDoctors([]);
            } else {
                setDoctors(response.data);
            }
        } catch (err) {
            setError('❌ There was an error fetching the data.');
            setDoctors([]);
        }
    };

    return (
        <div className="container mt-5">
      <Menu />
            <div className="card shadow-lg p-4">
                <h2 className="text-center mb-4">Search Doctors by Specialization</h2>

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        value={specialization}
                        onChange={handleInputChange}
                        placeholder="Enter specialization (e.g., CARDIO, KIDNEY)"
                        required
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                </div>

                {error && <div className="alert alert-danger text-center">{error}</div>}

                {doctors.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>Doctor Id</th>
                                    <th>Name</th>
                                    <th>Speciality</th>
                                    <th>Qualification</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map((doctor) => (
                                    <tr key={doctor.doctorId}>
                                        <td>{doctor.doctorId}</td>
                                        <td>{doctor.doctorName}</td>
                                        <td>{doctor.speciality}</td>
                                        <td>{doctor.qualification}</td>
                                        <td>{doctor.doctorUserName}</td>
                                        <td>{doctor.email}</td>
                                        <td>{doctor.mobile}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !error && <div className="text-center">No doctors to display</div>
                )}
            </div>
        </div>
    );
};

export default SearchDoctorBySpecialization;
