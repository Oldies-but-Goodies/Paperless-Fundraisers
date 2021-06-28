import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AddFundraiserModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);

  // ***Need to creat post route***

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   axios
  //     .post("/api/users/signup", {
  //       email: signUpCreds.email,
  //       password: signUpCreds.password,
  //       first_name: signUpCreds.first_name,
  //       last_name: signUpCreds.last_name,
  //     })
  //     .then((response) => {
  //       console.log("RESPONSE", response);
  //       if (response.data.status === "error") {
  //         setErrorMsg(response.data.message);
  //         return;
  //       }
  //       setErrorMsg(null);
  //       history.replace("/admin");
  //     })
  //     .catch((error) => {
  //       console.log("ERROR", error);
  //       setErrorMsg(error);
  //     });
  // };

  return (
    <>
      <Button variant="primary" className="ml-2" onClick={handleShow}>
        Add Fundraiser
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ background:`linear-gradient(${'#007bff'}, ${'#002853'})`}}>
          <Modal.Title style={{ color: 'white' }}>Add New Fundraiser</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-signin">
            <label htmlFor="inputFundraiser" className="sr-only">
              Fundraiser Name
            </label>
            <input
              type="string"
              id="inputFundraiser"
              className="form-control mt-1"
              name="name"
              placeholder="Fundraiser Name"
              // value={signUpCreds.first_name}
              // onChange={handleChange}
            />
            <label htmlFor="inputDescription" className="sr-only">
              Product Description
            </label>
            <input
              type="Description"
              id="inputDescription"
              className="form-control mt-1"
              name="Description"
              placeholder="Description"
              // value={signUpCreds.email}
              // onChange={handleChange}
            />
            <label htmlFor="inputStartDate" className="sr-only">
              Start Date
            </label>
            <input
              type="date"
              id="inputStartDate"
              className="form-control mt-1"
              name="start_date"
              placeholder="Start Date"
              // value={signUpCreds.last_name}
              // onChange={handleChange}
            />
            <label htmlFor="inputEndDate" className="sr-only">
              End Date
            </label>
            <input
              type="date"
              id="inputEndDate"
              className="form-control mt-1"
              name="end_date"
              placeholder="End Date"
              // value={signUpCreds.last_name}
              // onChange={handleChange}
            />
            <label htmlFor="inputGoal" className="sr-only">
              Goal
            </label>
            <input
              type="integer"
              id="inputGoal"
              className="form-control mt-1"
              name="goal"
              placeholder="$$ Goal"
              // value={signUpCreds.last_name}
              // onChange={handleChange}
            />
            <Form.Check className="mt-2" type="checkbox" label="Fundraiser Active" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddFundraiserModal;
//   render(<addPersonModal/>);
