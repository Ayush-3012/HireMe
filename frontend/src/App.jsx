import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { AuthContextProvider } from "./context/AuthContext";
import UserProfile from "./pages/UserProfile";
import Index from "./pages/Index";
import PostJob from "./components/erComponents/PostJob";
import NotFound from "./partials/NotFound";
import JobDetailsPage from "./pages/JobDetailsPage";
import UpdateJob from "./components/erComponents/UpdateJob";
import FoundJobs from "./components/eeComponents/FoundJobs";
import AllJobs from "./pages/AllJobs";
import AppliedJobs from "./components/eeComponents/AppliedJobs";
import Chat from "./components/chatComponents/Chat";
import ApplicantDetails from "./pages/ApplicantDetails";
import Footer from "./components/Footer";

const App = () => {
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/postJob" element={<PostJob />} />
        <Route path="/chat/chatId" element={<Chat />} />
        <Route path="/searchResult" element={<FoundJobs />} />
        <Route path="/showAllJobs" element={<AllJobs />} />
        <Route path="/myAppliedJobs" element={<AppliedJobs />} />
        <Route path="/about/job/:jobId" element={<JobDetailsPage />} />
        <Route
          path="/profile/applicantProfile"
          element={<ApplicantDetails />}
        />
        <Route path="/edit/job/:jobId" element={<UpdateJob />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthContextProvider>
  );
};

export default App;
