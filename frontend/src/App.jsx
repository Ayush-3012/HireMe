import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { AuthContextProvider } from "./context/AuthContext";
import UserProfile from "./pages/UserProfile";
import Index from "./pages/Index";
import PostJob from "./components/erComponents/PostJob";
import NotFound from "./partials/NotFound";

const App = () => {
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/postJob" element={<PostJob />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
