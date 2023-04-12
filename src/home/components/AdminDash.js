import React, { useState } from "react";
import "../styles/home.css"

function AdminDash() {

  const [notificationUser, setNotificationUser] = useState();
  const [notificationMessage, setNotificationMessage] = useState();

  const [blockUser, setBlockUser] = useState();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [role, setRole] = useState("MANAGER");


  const signupUser = async (e) => {
    e.preventDefault();
    let form = document.getElementById("signUpForm")
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        mobile: phoneNumber,
        role: role,
        token: localStorage.getItem("token"),
      })
    });
    const body = await response.json();
    alert(body.message);
    form.reset();
  }

  const sendNotification = async (username, message) =>{
    const response = await fetch('http://localhost:5000/api/notification/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username,
        message,
      })
    });
    const body = await response.json();
    alert(body.message);
  }

  const blockUserAccount = async (username) =>{
    const response = await fetch('http://localhost:5000/api/blockuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        username,
      })
    });
    const body = await response.json();
    alert(body.message);
  }

  const getUsers = async () => {
    const response = await fetch('http://localhost:5000/api/getuseradmin')
  }

  return (
    <div className="p-divider-top">
      <h1 className="formSubheading">Create a New User Account</h1>
      <form id="signUpForm" onSubmit={(e)=>{signupUser(e)}}>
        <input onChange={(e) =>setUsername(e.target.value)} type="text" name="username" placeholder="username" required/>
        <input onChange={(e) =>setPassword(e.target.value)} type="text" name="password" placeholder="password" required/>
        <input onChange={(e) =>setEmail(e.target.value)} type="email"  name="email" placeholder="email" required/>
        <input onChange={(e) =>setFirstName(e.target.value)} type="text" name="first name" placeholder="first name" required/>
        <input onChange={(e) =>setLastName(e.target.value)} type="text" name="last name" placeholder="last name" required/>
        <input onChange={(e) =>setPhoneNumber(e.target.value)} type="tel" name="mobile" placeholder="mobile" required/>
        {/*<input onChange={(e) =>setRole(e.target.value)} type="text" name="role" placeholder="role" required/>*/}
        <select value={role} onChange={(e) =>{
          setRole(e.target.value);
        }} required>
          <option value="ADMIN">Admin</option>
          <option value="MANAGER">Manager</option>
          <option value="IT_SUPPORT">IT Support</option>
          <option value="HR_STAFF">HR Staff</option>
          <option value="EMPLOYEE">Employee</option>
        </select>

        <button type="submit">Make Account</button>
      </form>
      <hr/>
      <h1 className="formSubheading">Send Notification</h1>
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <input onChange={(e) =>setNotificationUser(e.target.value)} type="text" name="username" placeholder="username" required/>
        <input onChange={(e) =>setNotificationMessage(e.target.value)} type="text" name="message" placeholder="message" required/>
        <button type="submit" onClick={(e)=>{sendNotification(notificationUser, notificationMessage)}}>Send Notification</button>
      </form>
      <hr/>
      <h1 className="formSubheading">Block User Account</h1>
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <input onChange={(e) =>setBlockUser(e.target.value)} type="text" name="username" placeholder="username" required/>
        <button type="submit" onClick={(e)=>{blockUserAccount(blockUser)}}>Block User Account</button>
      </form>

      <hr/>
      <h1 className="formSubheading">View User Accounts</h1>
      <div>

      </div>
    </div>
  )
}

export default AdminDash