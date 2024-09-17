import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { AuthContextProvider } from "./context/AuthContext";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import { ProfileContextProvider } from "./context/ProfileContext";
import UserProfile from "./pages/UserProfile";

const App = () => {
  return (
    <AuthContextProvider>
      <ProfileContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
      </ProfileContextProvider>
    </AuthContextProvider>
  );
};

export default App;
