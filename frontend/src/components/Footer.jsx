import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-800 font-serif py-6 ">
      <div className=" px-6">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">
            <span className="text-yellow-400">HireMe</span>
          </div>

          <div className="flex space-x-6 font-serif">
            <a href="/home" className="text-gray-400 hover:text-yellow-400">
              Home
            </a>
            <a
              href="/userProfile"
              className="text-gray-400 hover:text-yellow-400"
            >
              About Me
            </a>
            <a
              href="/showAllJobs"
              className="text-gray-400 hover:text-yellow-400"
            >
              All Jobs
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-yellow-400">
              Privacy Policy
            </a>
          </div>

          <div className="flex space-x-4">
            <FaFacebookSquare className="text-3xl cursor-pointer text-gray-400 hover:text-yellow-400" />
            <FaXTwitter className="text-3xl cursor-pointer text-gray-400 hover:text-yellow-400" />
            <FaLinkedin className="text-3xl cursor-pointer text-gray-400 hover:text-yellow-400" />
          </div>
        </div>

        <div className="my-4 border-t border-gray-700"></div>

        <div className="text-center text-gray-400 text-lg">
          <p>&copy; {new Date().getFullYear()} HireMe. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
