import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("employee");

  const auth = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      auth.setUserType(userType);
      await auth.loginAuth(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    auth.logoutAuth();
  };
  return (
    <>
      <form onSubmit={handleLogin} method="post">
        <h1 className="text-blue-500">Hello Please Login</h1>

        <input
          type="email"
          className="outlin-4 border-4 border-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          className="outlin-4 border-4 border-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="employee">Employee</option>
          <option value="employer">Employer</option>
        </select>

        <button
          type="submit"
          className="border-4 border-black px-4 py-4 rounded-md"
        >
          Login
        </button>
      </form>
      <button
        onClick={handleLogout}
        type="submit"
        className="border-4 border-black px-4 py-4 rounded-md"
      >
        Logout
      </button>
    </>
  );
};

export default LoginPage;
