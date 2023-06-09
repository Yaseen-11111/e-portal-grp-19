import React from 'react'
import "../styles/Support.css"

function Support() {
    return (
        <>
        <div className="text-center prevent-select">
            <h1>Welcome to the support page!</h1><br></br>
            <p>
                Here you can view current tickets that you have made as well as archived ones.
                You can also create a new ticket with either the HR department or the IT department.
            </p>
            <br/>
            <div style={{display:"inline-block"}}>
                <h2>What you should contact IT for:</h2>
                <ul className="text-lg-start">
                    <li>Internet Connectivity Issues</li>
                    <li>Company Computer Issues</li>
                    <li>Employee Portal Account related Matters</li>
                </ul>
            </div>
            <div style={{marginLeft: "100px", display:"inline-block"}}>
                <h2>What you should contact HR for:</h2>
                <ul className="text-lg-start">
                    <li>Employee Benefits</li>
                    <li>Employee Training</li>
                    <li>Issues regarding Colleagues</li>
                </ul>
            </div>
        </div>

        <main className="prevent-select">
            <br/>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card border-dark mb-3 text-center">
                        <div className="card-body">
                            <h4 className="card-header">Who would you like to contact?</h4><br></br>
                            <a href="#/SupportITForm">
                            <button type="button" className="btn btn-danger">IT Support</button></a>
                            <a href="#/SupportHRForm">
                            <button type="button" className="btn btn-danger">Human Resources</button></a>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="card border-dark mb-3 text-center">
                        <div className="card-body">
                            <h4 className="card-header">Already submitted a ticket?</h4>
                            <br></br>
                            <a href="#/CurrentTickets">
                            <button type="button" className="btn btn-danger">View Current Tickets</button></a>
                            <a href="#/TicketArchive">
                            <button type="button" className="btn btn-danger">View Closed Tickets</button></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row d-flex justify-content-center text-center">
                <div className="col-sm-6">
                <div className="card border-dark mb-3 text-center">
                    <div className="card-body">
                    <h4 className="card-header">Or give us a call!</h4>
                    <br></br>
                    <h5>07554 778 569</h5><br></br>
                        <h5>Mon to Fri: 8am-6pm</h5>
                    </div>
                </div>
                </div>
            </div>
        </main>
        </>

    )
}

export default Support
