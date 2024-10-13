import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

const JobDetailsPage = () => {
  const { jobs } = useAuthContext();
  const { jobId } = useParams();

  useEffect(() => {
    try {
      jobs?.fetchJobDetails(jobId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="px-4 m-4 rounded-xl overflow-y-scroll h-[95%] bg-blue-400 max-sm:px-1 max-sm:m-1">
        <div className="flex flex-col my-5 bg-orange-200 rounded-xl p-4 mx-auto relative max-sm:mx-1 max-md:p-1">
          <div className="flex gap-2 flex-col p-5 max-sm:p-2">
            <div className="flex flex-col justify-evenly max-sm:flex-col">
              <h2 className="text-3xl flex gap-2 px-2 my-1 font-serif max-sm:text-xl max-sm:flex-col">
                Title:{" "}
                <span className="text-purple-700">{jobs.aboutJob.title}</span>
              </h2>
              <div className="flex px-4 font-serif items-center  justify-evenly max-sm:flex-col max-sm:items-start">
                <h2 className="text-xl flex items-center gap-1">
                  <span className="">{jobs.aboutJob.description}</span>
                </h2>
                <h2 className="text-xl flex items-center gap-1">
                  {jobs.aboutJob.companyName}
                </h2>
                <h2 className="text-xl">{jobs.aboutJob.salaryRange}</h2>
                <h2 className="text-xl">{jobs.aboutJob.location}</h2>
                <h2 className="text-xl">{jobs.aboutJob.employementType}</h2>
                <span></span>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailsPage;
