import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/Profile.css";
import { Link } from "react-router-dom";


function Profile() {

  const [editProfile, setEdit] = useState(false);
  const [validated, setValidated] = useState(false);
  const [personalDetails, setDetails] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    marital: "",
    mobileNo: "",
    email: "",
    lineOfAddress: "",
    city: "",
    postcode: "",
    qualificationTitle: "",
    universityName: "",
    graduationDate: "",
    eFirstName1: "",
    eLastName1: "",
    eMobile1: "",
    eFirstName2: "",
    eLastName2: "",
    eMobile2: ""
});
  const [unmodifiable, setUnModifiable] = useState([
    "First name",
    "Last name",
    "birthDate",
    "Mobile",
    "Email",
    "lineOfAddress",
    "city",
    "postcode",
    "qualificationTitle",
    "universityName",
    "graduationDate",
    "efirstname1",
    "esecondname1",
    "emobile1",
    "efirstname2",
    "esecondname2",
    "emobile2"
  ]);

  useEffect( () => {
    const fetchProfileData = async () => {
      //get personal details from database
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      });
      const data = await response.json();
      return data.profile;
    };

    const fetchEditableFields = async () => {
      //get editable fields from database
      const response = await fetch("http://localhost:5000/api/profile/editableFields", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token")
        }
      });
      const data = await response.json();
      return data.fields;
    };

    fetchProfileData().then(data => {
      //set personal details
      setDetails({
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        gender: data.gender,
        marital: data.marital,
        mobileNo: data.mobileNo,
        email: data.email,
        lineOfAddress: data.lineOfAddress,
        city: data.city,
        postcode: data.postcode,
        qualificationTitle: data.qualificationTitle,
        universityName: data.universityName,
        graduationDate: data.graduationDate,
        eFirstName1: data.eFirstName1,
        eLastName1: data.eLastName1,
        eMobile1: data.eMobile1,
        eFirstName2: data.eFirstName2,
        eLastName2: data.eLastName2,
        eMobile2: data.eMobile2
      });
    });

    fetchEditableFields().then(data => {
      //set editable fields
      const unModifiableFields = [];
      for (let field in data) {
        if (!data[field]) {
          unModifiableFields.push(field);
        }
      }
      setUnModifiable(unModifiableFields);
    });
  }, []);


  if (editProfile === true) {
    return (
      <Container>
        <h1 className="mainTitle">Edit Profile</h1>
        {EditScreen(setEdit, validated, setValidated, setDetails, personalDetails, unmodifiable)}
      </Container>
    );
  } else {
    return (

      <Container>
        <h1 className="mainTitle">Profile</h1>
        {ViewScreen(setEdit, personalDetails)}
      </Container>
    );
  }
}

export default Profile;


function ViewScreen(setEdit, personalDetails) {

  const contentDisplayer = (fieldName, data, subheading) => {

    if (subheading === "") {
      return (
        <Row className="justify-content-left upperSpacing rounded-2 border border-2 m-1">
          <Col className="detailType col-xs-5 col-sm-2">
            <p>{fieldName} </p>
          </Col>
          <Col className="contentType col-xs-5 col-sm-2">
            <p>{data}</p>
          </Col>
        </Row>
      );
    }

    return (
      <Row className="justify-content-left upperSpacing rounded-2 border border-2 m-1">
        <h1 className="subheading">{subheading}</h1>
        <Col className="detailType col-xs-5 col-sm-2">
          <p>{fieldName} </p>
        </Col>
        <Col className="contentType col-xs-5 col-sm-2">
          <p>{data}</p>
        </Col>
      </Row>
    );
  };

  let name = personalDetails.firstName + " " + personalDetails.lastName;

  return (

      <Container className="profileContainer">
        {contentDisplayer("Full name:", name, "Personal Information")}
        {contentDisplayer("Date of Birth:", personalDetails.birthDate, "")}
        {contentDisplayer("Gender:", personalDetails.gender, "")}
        {contentDisplayer("Marital Status:", personalDetails.marital, "")}
        {contentDisplayer("Mobile:", personalDetails.mobileNo, "")}
        {contentDisplayer("Email Address:", personalDetails.email, "")}
        {contentDisplayer("Line of Address:", personalDetails.lineOfAddress, "Address")}
        {contentDisplayer("City/Town:", personalDetails.city, "")}
        {contentDisplayer("Postcode:", personalDetails.postcode, "")}
        {contentDisplayer("Qualification Title:", personalDetails.qualificationTitle, "Education")}
        {contentDisplayer("University name:", personalDetails.universityName, "")}
        {contentDisplayer("Graduation Date:", personalDetails.graduationDate, "")}
        {contentDisplayer("Full name:", personalDetails.eFirstName1 + " " + personalDetails.eLastName1, "Emergency Contact #1")}
        {contentDisplayer("Mobile:", personalDetails.eMobile1, "")}
        {contentDisplayer("Full name:", personalDetails.eFirstName2 + " " + personalDetails.eLastName2, "Emergency Contact #2")}
        {contentDisplayer("Mobile:", personalDetails.eMobile2, "")}

        <Row className="justify-content-center">
          <Col sm="auto">
            <button type="button" onClick={() => setEdit(true)} className = "btn btn-primary editButton">Edit</button>
          </Col>
            
          <Col sm="auto">
            <Link to="/UploadDocument" className="btn btn-primary">Upload a Document</Link>
          </Col>
        </Row>
      </Container>

  );
}


function EditScreen(setEdit, validated, setValidated, setDetails, personalDetails, unmodifiable) {


  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    /* First if condition ensures all fields are valid and if not, stops form submission */
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      /* Gets form and stores all the fields into an array which is then set to personalDetails. Page is then redirected*/
      let data = new FormData(form);
      let detail_temp = {};

      for (let [key, value] of data.entries()) {
        detail_temp[key] = value;
      }
      setDetails(detail_temp);
      await saveProfileToDb(detail_temp);
      setEdit(false);
    }
  };

  const saveProfileToDb = async (details) => {
    const response = await fetch('http://localhost:5000/api/profile/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        profile: details
      })
    });
    const body = await response.json();
    if (body.status === "error") {
      alert("Profile update failed");
    }
  }


  const radioForm = (name, op1, op2, op3, selected) => {

    if (selected === op1) {
      return (
        <Col sm="auto">
          <Form.Check
            disabled={modifiableCheck(name)}
            inline
            label={op1}
            name={name}
            type="radio"
            value={op1}
            checked
            required
          />
          <Form.Check
            disabled={modifiableCheck(name)}
            inline
            label={op2}
            name={name}
            type="radio"
            value={op2}
            required
          />
          <Form.Check
            disabled={modifiableCheck(name)}
            inline
            label={op3}
            name={name}
            type="radio"
            value={op3}
            required
          />
        </Col>
      );
    } else if (selected === op2) {
      return (
        <Col sm="auto">
          <Form.Check
            disabled={modifiableCheck(name)}
            inline
            label={op1}
            name={name}
            type="radio"
            value={op1}
            required
          />
          <Form.Check
            disabled={modifiableCheck(name)}
            inline
            label={op2}
            name={name}
            type="radio"
            value={op2}
            checked
            required
          />
          <Form.Check
            disabled={modifiableCheck(name)}
            inline
            label={op3}
            name={name}
            type="radio"
            value={op3}
            required
          />
        </Col>
      );
    } else {
      return (
        <Col sm="auto">
          <Form.Check
            disabled={modifiableCheck(name)}
            inline
            label={op1}
            name={name}
            type="radio"
            value={op1}
            required
          />
          <Form.Check
            disabled={modifiableCheck(name)}
            inline
            label={op2}
            name={name}
            type="radio"
            value={op2}
            checked
            required
          />
          <Form.Check
            disabled={modifiableCheck(name)}
            inline
            label={op3}
            name={name}
            type="radio"
            value={op3}
            checked
            required
          />
        </Col>
      );
    }
  };
  const modifiableCheck = (detailType) => {
    if (unmodifiable.includes(detailType)) {
      return ("readonly");
    } else {
      return false;
    }
  };


  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="profileContainer">
      <Form.Group className="mb-3">
        <h1 className="subheading upperSpacing">Personal Information</h1>

        {/* Name */}
        <Row className="justify-content-center upperSpacing">
          <Col sm="auto">
            <Form.Control readonly={modifiableCheck("firstName")} defaultValue={personalDetails.firstName} name="firstName"
                          required className="field" type="text" placeholder="First Name" />
          </Col>

          <Col sm="auto">
            <Form.Control readonly={modifiableCheck("lastName")} defaultValue={personalDetails.lastName} name="lastName"
                          required className="field" type="text" placeholder="Last Name" />
          </Col>
        </Row>

        <Row className="justify-content-center upperSpacing">
          <Col sm="auto">
            <h2 className="smallsubHeading dateShift">Date of Birth :</h2>
          </Col>
          <Col sm="auto">
            <Form.Control readonly={modifiableCheck("birthDate")} defaultValue={personalDetails.birthDate}
                          name="birthDate" required id="birthday" type="date" />
          </Col>


        </Row>

        {/* Gender */}
        <Row className="justify-content-center upperSpacing">
          <Col sm="auto">
            <h2 className="smallsubHeading">Gender :</h2>
          </Col>

          {radioForm("gender", "Male", "Female", "Other", personalDetails.gender)}

        </Row>


        {/* Marital Status */}
        <Row className="justify-content-center upperSpacing">
          <Col sm="auto">
            <h2 className="smallsubHeading">Marital Status :</h2>
          </Col>


          {radioForm("marital", "Single", "Married", "Divorced", personalDetails.marital)}

        </Row>

        {/* Contact */}
        <Row className="upperSpacing justify-content-center">

          <Col sm="auto">
            <Form.Control readonly={modifiableCheck("mobileNo")} defaultValue={personalDetails.mobileNo} name="mobileNo"
                          className="field" type="tel" pattern="[0-9]*" required placeholder="Mobile" />
          </Col>

          <Col sm="auto">
            <Form.Control readonly={modifiableCheck("email")} defaultValue={personalDetails.email} name="email"
                          className="field" type="email" required placeholder="Email Address" />
          </Col>

        </Row>

      </Form.Group>

      {/* Address */}
      <Form.Group className="mb-3">
        <h1 className="subheading">Address</h1>


        <Row className="upperSpacing justify-content-center">

          <Col className="col-xs-12 col-sm-5">
            <Form.Control readonly={modifiableCheck("lineOfAddress")} defaultValue={personalDetails.lineOfAddress}
                          name="lineOfAddress" type="text" required placeholder="Line of Address" />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col sm="auto">
            <Form.Control readonly={modifiableCheck("city")} defaultValue={personalDetails.city} name="city" required
                          className="longInput" type="text" placeholder="Town / City" />
          </Col>

          <Col sm="auto">
            <Form.Control readonly={modifiableCheck("postcode")} defaultValue={personalDetails.postcode} name="postcode"
                          required className="longInput" type="text" placeholder="Postcode" />
          </Col>
        </Row>
      </Form.Group>

      {/* Education */}
      <Form.Group className="mb-3">
        <h1 className="subheading">Education</h1>
        <Row className="upperSpacing justify-content-center">

          <Col className="col-xs-12 col-sm-5">
            <Form.Control readonly={modifiableCheck("qualificationTitle")} defaultValue={personalDetails.qualificationTitle}
                          name="qualificationTitle" required type="text" placeholder="Qualification title" />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col className="col-xs-12 col-sm-5">
            <Form.Control readonly={modifiableCheck("universityName")} defaultValue={personalDetails.universityName}
                          name="universityName" required type="text" placeholder="University Name" />
          </Col>
        </Row>

        <Row className="justify-content-center upperSpacing">
          <Col sm="auto">
            <h2 className="smallsubHeading dateShift">Date of Graduation :</h2>
          </Col>
          <Col sm="auto">
            <Form.Control readonly={modifiableCheck("graduationDate")} defaultValue={personalDetails.graduationDate}
                          name="graduationDate" required id="graduation" type="date" placeholder="Graduation date" />
          </Col>
        </Row>
      </Form.Group>

      {/* Emergency Contact */}
      {emergencyContactDisplay(1, personalDetails.eFirstName1, personalDetails.eLastName1, personalDetails.eMobile1, modifiableCheck)}
      {emergencyContactDisplay(2, personalDetails.eFirstName2, personalDetails.eLastName2, personalDetails.eMobile2, modifiableCheck)}

      <Row className="upperSpacing justify-content-center">
        <Col sm="auto">
          <button className="btn btn-primary upperSpacing">Save changes</button>
        </Col>

        <Col sm="auto">
          <button type="button" onClick={() => setEdit(false)} class="btn btn-primary upperSpacing">Cancel</button>
        </Col>

      </Row>
    </Form>
  );
}


function emergencyContactDisplay(val, defaultFName, defaultSName, defaultMob, modifiableCheck) {
  let fName = "e" + "FirstName" + val;
  let sName = "e" + "LastName" + val;
  let mob = "e" + "Mobile" + val;

  return (
    <Form.Group className="mb-3">
      <Row className="justify-content-center upperSpacing">
        <h1 className="subheading">Emergency Contact {val}</h1>
        <Col sm="auto">
          <Form.Control readonly={modifiableCheck("eFirstName" + val)} defaultValue={defaultFName} name={fName} required
                        className="field" type="text" placeholder="First Name" />
        </Col>

        <Col sm="auto">
          <Form.Control readonly={modifiableCheck("eLastName" + val)} defaultValue={defaultSName} name={sName}
                        required className="field" type="text" placeholder="Last Name" />
        </Col>

        <Col sm="auto">
          <Form.Control readonly={modifiableCheck("eMobile" + val)} defaultValue={defaultMob} name={mob}
                        className="field upperSpacing" type="tel" pattern="[0-9]*" required placeholder="Mobile" />
        </Col>
      </Row>
    </Form.Group>
  );
}