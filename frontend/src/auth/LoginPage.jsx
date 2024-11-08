import { useState } from "react";
import { useAllContext } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { auth } = useAllContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      await auth.loginAuth(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full bg-gray-50">
      <form
        onSubmit={handleLogin}
        method="post"
        className="bg-purple-400 px-12 py-2 rounded-md my-2 w-2/5"
      >
        <div className=" flex justify-center gap-4 flex-col  items-center py-4">
          <input
            className="outline w-96 p-2 font-serif text-xl  "
            type="email"
            placeholder="Your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="outline w-96 p-2 font-serif text-xl  "
            type="password"
            placeholder="Your Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="border-2 hover:text-3xl duration-200 transition-all w-72 text-2xl font-serif border-black px-4 py-4 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
