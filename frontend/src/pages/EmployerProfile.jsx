// import { useState } from "react";
import { useProfileContext } from "../context/ProfileContext";

const ProfilePage = () => {
  const profile = useProfileContext();
  // const [formData, setFormData] = useState(profile || {});

  console.log(profile.profile);

  // const handleInputChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await profile.saveProfile(formData);
  // };

  // if (profile.loading) {
  //   return <div>Loading...</div>;
  // }

  return <div></div>;
};

export default ProfilePage;
