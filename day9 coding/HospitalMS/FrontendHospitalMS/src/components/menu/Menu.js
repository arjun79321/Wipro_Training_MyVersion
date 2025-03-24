import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Menu = () => {
  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Welcome to the Hospital Management System</h2>

      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 rounded">
        <div className="container-fluid d-flex flex-wrap">
          <Link to="/search-doctor-by-id" className="nav-link mx-3">🔍 Doctor By ID</Link>
          <Link to="/search-doctor-by-specialization" className="nav-link mx-3">🔍 Doctor By Specialization</Link>
          <Link to="/search-patient-by-health-problem" className="nav-link mx-3">🔍 Patient By Health Problem</Link>
          <Link to="/search-patient-by-doctor-id" className="nav-link mx-3">🔍 Patient By Doctor ID</Link>
          <Link to="/search-patient-by-id" className="nav-link mx-3">🔍 Patient By ID</Link>
          <Link to="/add-doctor" className="nav-link mx-3">➕ Add Doctor</Link>
          <Link to="/add-patient" className="nav-link mx-3">➕ Add Patient</Link>
          <Link to="/show-doctor" className="nav-link mx-3">👨‍⚕️ Show Doctors</Link>
          <Link to="/search-doctor-by-mobile-number" className="nav-link mx-3">📞 Doctor By Mobile</Link>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
