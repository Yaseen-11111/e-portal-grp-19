import React, {useEffect, useState} from "react";
import {getTicketElement} from "./TicketElements";

function TicketArchive() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getTicketsFromDb().then((body) => {
      if (body.tickets) {
        setTickets(body.tickets);
      }
    });
  }, []);

  //get tickets from /api/tickets/current
  const getTicketsFromDb = async () => {
    const response = await fetch("http://localhost:5000/api/tickets/current", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        type: "archived",
      })
    });
      return await response.json();
  };

  const htmlElements = getTicketElement(tickets)

    return (
    <>
      <a href="#/support" className="btn border border-2 border-secondary m-3">{'<'} Back</a>
      <div>
        <h3>Your Closed Tickets!</h3><br></br>
      </div>
      <div className="table-responsive shadow">
        <table className="table table-striped">
          <thead className="thead-dark prevent-select">
          <tr>
            <th scope="col" className="border border-right-1">Type</th>
            <th scope="col" className="border border-right-1">Subject</th>
            <th scope="col" className="border border-right-1">Contact Email</th>
            <th scope="col" className="border border-right-1">Contact Number</th>
            <th scope="col" className="border border-right-1">Description</th>
            <th scope="col" className="border border-right-1">Status</th>
            <th scope="col" className="border border-right-1">Created At</th>
          </tr>
          </thead>
          <tbody>
          {htmlElements}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TicketArchive;