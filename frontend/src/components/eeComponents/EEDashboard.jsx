import { useAllContext } from "../../context/AuthContext";

const EEDashboard = () => {
  const { profile } = useAllContext();

  return (
    <>
      <div className="flex flex-col gap-4 text-xl">
        <div className="px-4">
          <h2 className="text-2xl font-semibold text-amber-50">Saved Jobs</h2>
          {profile?.userProfile?.savedJobs.length === 0 ? (
            <p className="text-white">You haven’t saved any jobs yet.</p>
          ) : (
            <div className="text-white">
              {profile?.userProfile?.savedJobs.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          )}
        </div>

        <div className="px-4">
          <h2 className="text-2xl font-semibold text-amber-50">
            Application Status
          </h2>
          {profile?.userProfile?.appliedJobs.length === 0 ? (
            <p className="text-white">Track the jobs you have applied to.</p>
          ) : (
            <>
              {profile?.userProfile?.appliedJobs.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </>
          )}
        </div>

        <div className="px-4 flex flex-col">
          <h2 className="text-2xl font-semibold text-amber-50">
            Recommended Jobs
          </h2>
          <p className="text-white">Jobs tailored to your profile.</p>
        </div>

        <div className="px-4">
          <h2 className="text-2xl font-semibold text-amber-50">
            Notifications
          </h2>
          <p className="text-white">You have no new notifications.</p>
        </div>
      </div>
    </>
  );
};

export default EEDashboard;
