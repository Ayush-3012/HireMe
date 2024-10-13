/* eslint-disable react/prop-types */
const EmployerProfile = ({ employerProfile }) => {
  return (
    <div>
      <h1>{employerProfile.companyName}</h1>
      <p>
        <strong>Description:</strong> {employerProfile.companyDescription}
      </p>
      <p>
        <strong>Contact Number:</strong> {employerProfile.contactNumber}
      </p>
      <p>
        <strong>Email:</strong> {employerProfile.email}
      </p>
      <p>
        <strong>Industry:</strong> {employerProfile.industry}
      </p>
      <p>
        <strong>Location:</strong> {employerProfile.location}
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a href={employerProfile.website}>{employerProfile.website}</a>
      </p>
    </div>
  );
};

export default EmployerProfile;
