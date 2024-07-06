import { getSession } from 'next-auth/react';
import React from 'react'

const ChangePasswordhandler = async(req,res) => {
 if(req.method!=='PATCH'){
    return;
 }
 const session=await getSession({req:req});
 if(!session){
     res.status(401).json({message:'Not authenticated'})
 }
 const userEmail=session.user.email;
 const oldPassword=req.body.oldPassword;
 const newPassword=req.body.newPassword;
 if(!oldPassword || !newPassword || newPassword.trim().length <7){
    return res.status(422).json({
        message:'Invalid input - password should be atleast 7 character long.'
    })
 }
const client=await dbconnect();

const user=await User.findOne({email:userEmail});
 if (!user) {
   return res.status(404).json({ message: "User not found" });
 }

 const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

 if (!isOldPasswordValid) {
   return res.status(403).json({ message: "Invalid old password" });
 }
 user.password=newPassword;
 await user.save();
res.status(200).json({ message: "Password updated successfully" });
client.close()
}

export default ChangePasswordhandler