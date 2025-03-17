import axios from "axios";
import { useEffect, useState } from "react";
import { BaseURL } from "../../utils";
import Menu from "../menu/Menu";

const ShowDoctor = () => {
  const [doctordata, setDoctorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BaseURL}/api/Doctors`);
        setDoctorData(response.data);
      } catch (err) {
        setError("❌ Failed to fetch doctor data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <Menu />
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Doctor List</h2>

        {loading && <p className="text-center text-info">Loading doctors...</p>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Doctor Id</th>
                  <th>Doctor Name</th>
                  <th>Speciality</th>
                  <th>Qualification</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Mobile</th>
                </tr>
              </thead>
              <tbody>
                {doctordata.length > 0 ? (
                  doctordata.map((item) => (
                    <tr key={item.doctorId}>
                      <td>{item.doctorId}</td>
                      <td>{item.doctorName}</td>
                      <td>{item.speciality}</td>
                      <td>{item.qualification}</td>
                      <td>{item.doctorUserName}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No doctors available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDoctor;
