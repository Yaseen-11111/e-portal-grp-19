import React, {useEffect, useState} from "react";
import "../styles/home.css";

function MessagingDash() {
    const [notificationUser, setNotificationUser] = useState();
    const [notificationMessage, setNotificationMessage] = useState();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsersFromDB(users, ).then((body) => {
            if (body.users) {
                setUsers(body.users);
            }
        });
    }, []);

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
    const getUsersFromDB = async () => {
        const response = await fetch('http://localhost:5000/api/listusers', {
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
            <h1 className="formSubheading">Send Message</h1>
            <form onSubmit={(e)=>{e.preventDefault()}}>
                <input className="rounded-4" onChange={(e) =>setNotificationUser(e.target.value)} type="text" name="username" placeholder="username" required/>
                <input className="rounded-4" onChange={(e) =>setNotificationMessage(e.target.value)} type="text" name="message" placeholder="message" required/>
                <button className="rounded-4" type="submit" onClick={()=>{sendNotification(notificationUser, notificationMessage)}}>Send Notification</button>
            </form>
            <h1 className="formSubheading prevent-select">List of users</h1>
            <div className="table-responsive shadow rounded-4">
                <table className="table table-striped ">
                    <thead className="thead-dark ">
                    <tr>
                        <th scope="col" className="border border-right-1">Username</th>
                        <th scope="col" className="border border-right-1">Role</th>
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

export default MessagingDash