import React, {useEffect, useState} from "react";
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

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsersFromDB(users, ).then((body) => {
      if (body.users) {
        setUsers(body.users);
      }
    });
  }, []);


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

  const getUsersFromDB = async () => {
    const response = await fetch('http://localhost:5000/api/admin/listusers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem("token")
      })
    });
    return await response.json()
  };

  const htmlElements = [];

  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      htmlElements.push(
          <tr className="users-container" key={i}>
            <td className="users-username">
              {users[i].logInfo.username}
            </td>
            <td className="users-role">
              {users[i].workInfo.role}
            </td>
            <td className="users-status">
              {users[i].logInfo.block}
            </td>
          </tr>
      );
    }
  } else {
    console.log(users)
    htmlElements.push(
        <tr className="users-container" key={0}>
          <td className="users-username">
            <h5>No users found</h5>
          </td>
        </tr>
    );
  }

  return (
    <div className="p-divider-top prevent-select">
      <h1 className="formSubheading">Create a New User Account</h1>
      <form id="signUpForm" onSubmit={(e)=>{signupUser(e)}}>
        <input className="rounded-4" onChange={(e) =>setUsername(e.target.value)} type="text" name="username" placeholder="username" required/>
        <input className="rounded-4" onChange={(e) =>setPassword(e.target.value)} type="text" name="password" placeholder="password" required/>
        <input className="rounded-4" onChange={(e) =>setEmail(e.target.value)} type="email"  name="email" placeholder="email" required/>
        <input className="rounded-4" onChange={(e) =>setFirstName(e.target.value)} type="text" name="first name" placeholder="first name" required/>
        <input className="rounded-4" onChange={(e) =>setLastName(e.target.value)} type="text" name="last name" placeholder="last name" required/>
        <input className="rounded-4" onChange={(e) =>setPhoneNumber(e.target.value)} type="tel" name="mobile" placeholder="mobile" required/>
        {/*<input onChange={(e) =>setRole(e.target.value)} type="text" name="role" placeholder="role" required/>*/}
        <select className="rounded-4" value={role} onChange={(e) =>{
          setRole(e.target.value);
        }} required>
          <option value="ADMIN">Admin</option>
          <option value="MANAGER">Manager</option>
          <option value="IT_SUPPORT">IT Support</option>
          <option value="HR_STAFF">HR Staff</option>
          <option value="EMPLOYEE">Employee</option>
        </select>

        <button className="rounded-4" type="submit">Make Account</button>
      </form>
      <hr/>
      <h1 className="formSubheading">Send Notification</h1>
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <input className="rounded-4" onChange={(e) =>setNotificationUser(e.target.value)} type="text" name="username" placeholder="username" required/>
        <input className="rounded-4" onChange={(e) =>setNotificationMessage(e.target.value)} type="text" name="message" placeholder="message" required/>
        <button className="rounded-4" type="submit" onClick={(e)=>{sendNotification(notificationUser, notificationMessage)}}>Send Notification</button>
        <button className="rounded-4" type="submit" onClick={(e)=>{sendNotification(notificationUser, notificationMessage)}}>Send Notification to All</button>

      </form>
      <hr/>
      <h1 className="formSubheading">Block User Account</h1>
      <form onSubmit={(e)=>{e.preventDefault()}}>
        <input className="rounded-4" onChange={(e) =>setBlockUser(e.target.value)} type="text" name="username" placeholder="username" required/>
        <button className="rounded-4"type="submit" onClick={(e)=>{blockUserAccount(blockUser)}}>Block User Account</button>
      </form>

      <hr/>
      <h1 className="formSubheading prevent-select">View User Accounts</h1>
      <div className="table-responsive shadow rounded-4">
        <table className="table table-striped ">
          <thead className="thead-dark prevent-select">
          <tr>
            <th scope="col" className="border border-right-1">Username</th>
            <th scope="col" className="border border-right-1">Role</th>
            <th scope="col" className="border border-right-1">Blocked</th>
          </tr>
          </thead>
          <tbody>
          {htmlElements}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDash