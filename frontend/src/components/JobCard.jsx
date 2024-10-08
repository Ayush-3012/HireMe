import JobItems from "./JobItems";

/* eslint-disable react/prop-types */
const JobCard = ({ jobs }) => {
  return (
    <div className="flex flex-col gap-2 max-md:gap-1">
      {jobs?.map((job) => (
        <JobItems key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobCard;
