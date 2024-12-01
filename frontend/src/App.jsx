import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { AuthContextProvider } from "./context/AuthContext";
import UserProfile from "./pages/UserProfile";
import Index from "./pages/Index";
import PostJob from "./components/erComponents/PostJob";
import NotFound from "./partials/NotFound";
import JobDetailsPage from "./pages/JobDetailsPage";
import FoundJobs from "./components/eeComponents/FoundJobs";
import AllJobs from "./pages/AllJobs";
import AppliedJobs from "./components/eeComponents/AppliedJobs";
import Chat from "./components/chatComponents/Chat";
import ApplicantDetails from "./pages/ApplicantDetails";
import Footer from "./components/Footer";
import RegisterPage from "./auth/RegisterPage";
import EmployeeRegisterForm from "./auth/EmployeeRegisterForm";
import EmployerRegisterForm from "./auth/EmployerRegisterForm";

const App = () => {
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about/job/:jobId" element={<JobDetailsPage />} />
        <Route path="/postJob" element={<PostJob fromPostJob={true} />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/employee" element={<EmployeeRegisterForm />} />
        <Route path="/register/company" element={<EmployerRegisterForm />} />
        <Route path="/chats" element={<Chat />} />
        <Route path="/searchResult" element={<FoundJobs />} />
        <Route path="/showAllJobs" element={<AllJobs />} />
        <Route path="/myAppliedJobs" element={<AppliedJobs />} />
        <Route
          path="/profile/applicantProfile"
          element={<ApplicantDetails />}
        />
        <Route path="/edit/job/:jobId" element={<PostJob />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthContextProvider>
  );
};

export default App;
