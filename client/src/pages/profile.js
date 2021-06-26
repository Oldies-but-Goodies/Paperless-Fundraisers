import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Modal,
} from "react-bootstrap";

import { useHistory } from "react-router-dom";
import { useStoreContext } from "../store/store";

const Profile = (props) => {
  const [state, dispatch] = useStoreContext();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);
  const [signUpCreds, setSignUpCreds] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [passwordChange, setPasswordChange] = useState({
    currentPassword: "",
    changedPassword1: "",
    changedPassword2: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignUpCreds({ ...signUpCreds, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    handleClose();

    // STEP 1: compare formNewPasswordFirst and formNewPasswordSecond to be sure that the proposed passwords match
    // STEP 2: validate that the proposed password can validate
    // STEP 3: validate that the current password @ formCurrentPasswordCheck is in fact the current password
    // STEP 4: if everything is rigth, then call a user route to update the password with the new password
    // axios
    //   .post("/api/users/signup", {
    //     email: signUpCreds.email,
    //     password: signUpCreds.password,
    //     first_name: signUpCreds.first_name,
    //     last_name: signUpCreds.last_name,
    //   })
    //   .then((response) => {
    //     console.log("RESPONSE", response);
    //     if (response.data.status === "error") {
    //       setErrorMsg(response.data.message);
    //       return;
    //     }
    //     setErrorMsg(null);
    //     history.replace("/admin");
    //   })
    //   .catch((error) => {
    //     console.log("ERROR", error);
    //     setErrorMsg(error);
    //   });
  };

  return (
    <>
      <Row className='justify-content-md-center'>
        <Col xs lg='4'>
          <Button variant='primary' onClick={handleShow} block>
            Change Password
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formCurrentPasswordCheck'>
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter current password'
                name='formCurrentPasswordCheck'
              />
            </Form.Group>

            <Form.Group controlId='formNewPasswordFirst'>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                name='formNewPasswordFirst'
              />
            </Form.Group>
            <Form.Group controlId='formNewPasswordSecond'>
              <Form.Control
                type='password'
                placeholder='Confirm New Password'
                name='formNewPasswordSecond'
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Cancel
              </Button>
              <Button variant='primary' type='submit'>
                Change Password
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

Profile.propTypes = {};

export default Profile;
