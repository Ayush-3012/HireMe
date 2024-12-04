import { useState } from "react";
import { useAllContext } from "../context/AuthContext.jsx";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const navigate = useNavigate();

  const { auth } = useAllContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      const res = await auth.loginAuth(user);
      res?.status === 200
        ? (enqueueSnackbar(res?.data?.message, { variant: "success" }),
          navigate("/home"))
        // : enqueueSnackbar(res?.response?.data?.message, { variant: "error" });
        : enqueueSnackbar("Invalid Credentials", { variant: "error" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <form
        onSubmit={handleLogin}
        method="post"
        className="bg-slate-500 w-full px-12 py-4 rounded-md my-2 max-md:px-8 max-md:py-2 max-sm:px-2"
      >
        <div className="space-y-2 max-md:space-y-1">
          <input
            className="bg-slate-700 text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_10px] outline-none rounded-md w-full p-2 font-serif text-xl  max-md:text-lg"
            type="email"
            placeholder="Your Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative flex justify-center items-center">
            <input
              className="bg-slate-700  text-yellow-400 focus:shadow-yellow-400 focus:shadow-[1px_1px_10px] rounded-md outline-none w-full p-2 font-serif text-xl  max-md:text-lg"
              type={`${viewPassword ? "text" : "password"}`}
              placeholder="Your Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {viewPassword ? (
              <FaEyeSlash
                className="text-3xl text-yellow-300 absolute right-2 cursor-pointer transition duration-150 hover:text-yellow-400 hover:-translate-y-1"
                onClick={() => setViewPassword(!viewPassword)}
              />
            ) : (
              <FaEye
                className="text-3xl text-slate-300 absolute right-2  cursor-pointer transition duration-150 hover:text-yellow-400 hover:-translate-y-1"
                onClick={() => setViewPassword(!viewPassword)}
              />
            )}
          </div>
          <button
            type="submit"
            className="shadow-[1px_1px_5px] text-xl shadow-yellow-400 text-yellow-400 bg-slate-800 hover:scale-x-110 duration-200 transition-all px-8 py-2 rounded-md max-md:text-lg max-sm:text-sm max-md:px-6 max-sm:px-4 max-sm:py-1"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
