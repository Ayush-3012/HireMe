import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { AuthContextProvider } from "./context/AuthContext";
import UserProfile from "./pages/UserProfile";
import Index from "./pages/Index";
import PostJob from "./components/erComponents/PostJob";
import NotFound from "./partials/NotFound";
import JobDetailsPage from "./pages/JobDetailsPage";
import EditJob from "./components/erComponents/EditJob";

const App = () => {
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/postJob" element={<PostJob />} />
        <Route path="/about/job/:jobId" element={<JobDetailsPage />} />
        <Route path="/edit/job/:jobId" element={<EditJob />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
