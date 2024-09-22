/* eslint-disable react/prop-types */
const EmployerProfile = ({ EmployerProfile }) => {
  const {
    companyName,
    companyDescription,
    contactNumber,
    email,
    industry,
    location,
    website,
  } = EmployerProfile;

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
