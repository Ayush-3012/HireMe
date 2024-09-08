import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/" exact component={HomePage} />
        <Route path="/job/:id" component={JobDetailsPage} />
        {/* <Route path="/employer/profile" component={EmployerProfilePage} />
        <Route path="/employee/profile" component={EmployeeProfilePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/apply/:jobId" component={ApplyJobPage} /> */}
      </Routes>
    </>
  )
};

export default App;
