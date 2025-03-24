import React from "react";
import SearchDoctorById from "./components/doctor/SearchDoctorById";
import SearchDoctorBySpecialization from "./components/doctor/SearchDoctorBySpecialization";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPatientByHealthProblem from "./components/patient/SearchPatientByHealthProblem";
import SearchPatientByDoctorID from "./components/patient/SearchPatientByDoctorID";
import SearchPatientByID from "./components/patient/SearchPatientById";
import AddDoctor from "./components/doctor/AddDoctor";
import AddPatient from "./components/patient/AddPatient";
import ShowDoctor from "./components/doctor/ShowDoctor";
import SearchDoctorByMobileNumber from "./components/doctor/DoctorSearchByMobileNumber";
import Login from "./components/login/Login";
import Menu from "./components/menu/Menu";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />

<Route path="/search-doctor-by-id" element={<SearchDoctorById />} />
<Route path="/search-doctor-by-specialization" element={<SearchDoctorBySpecialization />} />
<Route path="/search-patient-by-health-problem" element={<SearchPatientByHealthProblem />} />
<Route path="/search-patient-by-doctor-id" element={<SearchPatientByDoctorID />} />
<Route path="/search-patient-by-id" element={<SearchPatientByID />} />
<Route path="/add-doctor" element={<AddDoctor />} />
<Route path="/add-patient" element={<AddPatient />} />
<Route path="/show-doctor" element={<ShowDoctor />} />
<Route path="/search-doctor-by-mobile-number" element={<SearchDoctorByMobileNumber />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
