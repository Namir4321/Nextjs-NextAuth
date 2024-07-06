import { useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import { getSession } from "next-auth/react";

 function UserProfile() {
 const onChangePassword = async (passwordData) => {
   fetch("/api/auth/change-password", {
     method: "PATCH",
     body: JSON.stringify(passwordData),
     headers: {
       "Content-Type": "application/json ",
     },
   });
   const data = await Response.json();
   console.log(data)
 };
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={onChangePassword} />
    </section>
  );
}

export default UserProfile;
