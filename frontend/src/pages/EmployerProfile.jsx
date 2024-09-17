import { useProfileContext } from "../context/ProfileContext";

const EmployerProfile = () => {
  const profile = useProfileContext();

  if (!profile?.profile || !profile?.profile?.foundEmployer) {
    return <div>Loading...</div>;
  }

  const {
    companyName,
    companyDescription,
    contactNumber,
    email,
    industry,
    location,
    website,
  } = profile.profile.foundEmployer;

  return (
    <div>
      <h1>{companyName}</h1>
      <p>
        <strong>Description:</strong> {companyDescription}
      </p>
      <p>
        <strong>Contact Number:</strong> {contactNumber}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Industry:</strong> {industry}
      </p>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        <strong>Website:</strong> <a href={website}>{website}</a>
      </p>
    </div>
  );
};

export default EmployerProfile;
