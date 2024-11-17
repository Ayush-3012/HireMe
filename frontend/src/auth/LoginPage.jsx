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
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        method="post"
        className="bg-slate-500 px-12 py-4 rounded-md my-2"
      >
        <div className="space-y-2 ">
          <input
            className="bg-slate-700 text-yellow-400 focus:outline-yellow-400 rounded-md border-none w-full p-2 font-serif text-xl  "
            type="email"
            placeholder="Your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="bg-slate-700 text-yellow-400 focus:outline-yellow-400 rounded-md border-none w-full p-2 font-serif text-xl  "
            type="password"
            placeholder="Your Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="shadow-[1px_1px_5px] text-xl shadow-yellow-400 text-yellow-400 bg-slate-800 hover:scale-x-110 duration-200 transition-all px-8 py-2 rounded-md"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
