import { useEffect } from "react";
import { motion } from "framer-motion";
import UserAction from "../components/UserAction";
import { useAllContext } from "../context/HireMeContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { auth } = useAllContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user) {
      navigate("/home");
    }
  }, [auth?.user, navigate]);

  return (
    <motion.div
      className="bg-gray-800 py-2 flex items-center flex-col justify-center "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="flex flex-col items-center justify-center text-yellow-400 font-serif "
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center pb-2 border-b-4 w-full border-slate-900">
          <h1 className="text-5xl font-bold max-md:text-3xl max-sm:text-2xl">
            Welcome to HireMe
          </h1>
          <p className="text-2xl text-yellow-500 animate-pulse max-md:text-md max-sm:text-sm">
            Your one-stop solution for job seekers and employers.
          </p>
        </div>
        <div>
          <div className="flex justify-evenly max-md:flex-col items-center">
            <div className="w-96 m-4 flex items-start justify-center max-md:w-72 max-sm:w-44">
              <motion.img
                src="../../working_ill.jpg"
                alt="Homepage Illustration"
                className="w-full rounded-xl"
                whileHover={{
                  translateY: "-10px",
                  boxShadow: "0px 0px 20px #ff0",
                }}
              />
            </div>
            <motion.div
              className="w-2/6 rounded-md m-4 text-4xl p-2 items-center justify-center flex max-md:w-4/5 max-md:text-2xl max-sm:text-xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px #ff0",
                translateY: "-10px",
              }}
            >
              <h2>
                Empowering job seekers and employers to connect seamlessly. Find
                your dream job or hire top talent with just a few clicks. Let us
                build success together!
              </h2>
            </motion.div>
          </div>
          <div className="flex justify-evenly max-md:flex-col-reverse items-center">
            <motion.div
              className="w-2/6 m-4 text-4xl rounded-md items-center p-2 justify-center flex max-md:w-4/5 max-md:text-2xl max-sm:text-xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px #ff0",
                translateY: "-10px",
              }}
            >
              <h2>
                HireMe bridges the gap between opportunity and talent. Explore
                limitless possibilities and take the first step toward your
                future today.
              </h2>
            </motion.div>
            <div className="w-96 m-4 flex items-start justify-center max-md:w-72 max-sm:w-44">
              <motion.img
                src="../../hand_shake_ill.jpg"
                alt="Homepage Illustration"
                className="w-full rounded-xl"
                whileHover={{
                  translateY: "-10px",
                  boxShadow: "0px 0px 20px #ff0",
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      <div className="">{auth.userType && !auth.user && <UserAction />}</div>
    </motion.div>
  );
};

export default Index;
