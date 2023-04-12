import React from 'react'
import "../styles/uploadForm.css"

const UploadDocument = () => {
  return (
    <>
      <h1>Document Upload</h1>
      <form className={"uploadDocumentsForm"}>
        <div className="form-outline mb-4">
          <label className="form-label" for="Title">Document title (if no title is entered, the original file name will be used):</label>
          <input className="form-control" type="text" id="Title"></input>
        </div>

        <div className= "form-outline mb-4">
          <label className= "form-label" for = "File">File:</label>
          <br />
          <input className="form-label" for = "File" type = "file" required />
        </div>

        <div className= "row">
          <div className= "col">
              <button type="submit" className="btn btn-success btn-block mb-4">Submit Form</button>
          </div>
          <div className= "col">
              <button type="reset" className="btn btn-danger btn-block mb-4">Reset</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default UploadDocument