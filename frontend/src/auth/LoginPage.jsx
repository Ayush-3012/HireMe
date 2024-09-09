import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_ROUTES}/employer/login`,
        { email, password },
        { withCredentials: true }
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
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
        <button
          type="submit"
          className="border-4 border-black px-4 py-4 rounded-md"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginPage;
