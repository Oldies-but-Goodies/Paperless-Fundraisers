import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import API from '../lib/API';

import { format } from 'date-fns';

const AddFundraiserModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);

  const [formData, setFormData] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value})
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    // const newFundraiser = () => {
      API.Fundraisers.addFundraiser(
        {
              name: formData.name,
              description: formData.description,
              start: formData.start,
              end: formData.end,
              goal: formData.goal
        }
      ).then((response) => {
        console.log("RESPONSE", response);
        if (response.data.status === "error") {
          setErrorMsg(response.data.message);
          return;
        }
        setErrorMsg(null);
        // history.replace("/admin");
      })
      .catch((error) => {
        console.log("ERROR", error);
        setErrorMsg(error);
      });
      handleClose();
  };

  return (
    <>
      <Button variant="primary" className="my-2" onClick={handleShow}>
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
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="inputDescription" className="sr-only">
              Product Description
            </label>
            <input
              type="description"
              id="inputDescription"
              className="form-control mt-1"
              name="description"
              placeholder="description"
              value={formData.description}
              onChange={handleChange}
            />
            <label htmlFor="inputStartDate" className="sr-only">
              Start Date
            </label>
            <input
              type="datetime-local"
              id="inputStartDate"
              className="form-control mt-1"
              name="start"
              placeholder="Start Date"
              value={formData.start}
              onChange={handleChange}
            />
            <label htmlFor="inputEndDate" className="sr-only">
              End Date
            </label>
            <input
              type="datetime-local"
              id="inputEndDate"
              className="form-control mt-1"
              name="end"
              placeholder="End Date"
              value={formData.end}
              onChange={handleChange}
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
              value={formData.goal}
              onChange={handleChange}
            />
            <Form.Check className="mt-2" type="checkbox" label="Fundraiser Active" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddFundraiserModal;
//   render(<addPersonModal/>);
