import { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");

  const { auth } = useAuthContext();

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
    <>
      <h1 className="text-xl">Hi, Welcome to Login Page, You Are?</h1>
      <div className="flex my-2 py-2 mx-4 justify-evenly">
        <button
          className={`border p-4 rounded-md  duration-500 bg-black text-white font-serif ${
            userType === "employer" && " text-xl transition-all duration-500"
          }`}
          onClick={() => {
            auth.setUserType("employer");
            // profile.setUserType("employer");
            setUserType("employer");
          }}
        >
          Company
        </button>

        <button
          className={`border p-4 rounded-md  duration-500 bg-black text-white font-serif ${
            userType === "employee" && "text-xl transition-all duration-500 "
          }`}
          onClick={() => {
            auth.setUserType("employee");
            // profile.setUserType("employee");
            setUserType("employee");
          }}
        >
          Job Seeker
        </button>
      </div>
      {userType && (
        <form onSubmit={handleLogin} method="post">
          <h1 className="text-black text-xl font-serif text-center borer-b-white border-b-2">
            Hello Please Login, you are{" "}
            {userType === "employee" ? "Job Seeker" : "Company"}
          </h1>

          <div className=" flex justify-center gap-4 flex-col items-center py-4">
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
      )}
    </>
  );
};

export default LoginPage;
