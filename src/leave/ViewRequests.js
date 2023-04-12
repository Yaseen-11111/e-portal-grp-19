import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./viewRequest.css"
import logo from "./logo-e-portal.png"
import {Dropdown, DropdownButton} from "react-bootstrap";

function ViewRequests() {
  const [viewRequests, setViewRequest] = useState([]);
  const fill = new Array(viewRequests.length).fill(false);
  const [denied, setDenied] = useState(fill);
  const [denyReason, setReason] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getAllFromDb = async () => {
      await fetch("http://localhost:5000/api/leave/requests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      }).then(res => res.json()).then(data => {
        setViewRequest(data.leaveData);
      });
    };

    getAllFromDb();


  }, []);

  const saveToDb = async (id, decision, reason) => {
    const response = await fetch("http://localhost:5000/api/leave/request/decide", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")
      },
      body: JSON.stringify({
        id,
        decision,
        reason
      })
    });
    return await response.json();
  };

  function data(date, name, reason, index) {
    return (
        <div className="vacation-approval-page">
          <p>Please review and approve or reject the following vacation requests:</p>

              <div key={index} className="vacation-request">
                <h2>{name}</h2>
                <p>Requested dates: {date}</p>
                <p>Reason: {reason}</p>
                <div className="button-container">
                    <button className="approve-btn" onClick={() => handleAccept(date, name, reason, index)}>Approve</button>
                    <button className="reject-btn" onClick={() => handleDenied(index)}>Reject</button>
                  {denied[index] ? <div className="d-flex"><DropdownButton
                      key={"dropdown"}
                      size="sm"
                      variant="secondary"
                      title="Reason"
                      onSelect={setReason}
                  >
                    <Dropdown.Item eventKey="Understaffed">Understaffed</Dropdown.Item>
                    <Dropdown.Item eventKey="Busy times">Busy times</Dropdown.Item>
                    <Dropdown.Item eventKey="Last minute request">Last minute request</Dropdown.Item>
                  </DropdownButton>
                    <button onClick={() => confirmDeny(date, name, reason, index)}>Confirm</button>
                  </div> : null}
                </div>
              </div>
        </div>
    );
  }

  function handleAccept(date, name, reason, index) {
    setError(false);
    saveToDb(viewRequests[index][3], "ACCEPTED", "").then(data => {
      if (data.status === "success") {
        completed(index);
      } else {
        setError(true);
      }
    });
  }

  function handleDenied(index) {
    let newDenied = [...denied];
    newDenied[index] = !denied[index];
    setDenied(newDenied);
  }

  function confirmDeny(date, name, reason, index) {
    if (denyReason === null) {
      setError(true);
    } else {
      setError(false);
      saveToDb(viewRequests[index][3], "REJECTED", denyReason).then(data => {
        if (data.status === "success") {
          completed(index);
        } else {
          setError(true);
        }
      });
    }
  }

  function completed(index) {
    let newRequests = [...viewRequests];
    newRequests.splice(index, 1);
    setViewRequest(newRequests);

    let newDenied = [...denied]
    newDenied.splice(index,1)
    setDenied(newDenied)
  }

  return (
    <div>
      <h1>
        Vacation Request
        <img src={logo} alt="FDM-Logo" width={256}/>
      </h1>
      {error ? <h3 className="bg-danger p-3 border border-3 border-secondary">Error you must select a reason when
        confirming</h3> : null}
      <ul className="list-unstyled">
        {viewRequests.map((request, index) => {return <li key={index}>{data(request[0], request[1], request[2], index)}</li>;}
        )
        }</ul>
    </div>

  );
}

export default ViewRequests;