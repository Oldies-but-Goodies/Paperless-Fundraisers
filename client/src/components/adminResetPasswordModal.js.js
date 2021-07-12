import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const resetPasswordModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);
  const [passwordResetCreds, setResetPasswordCreds] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setResetPasswordCreds({ ...resetPasswordCreds, [name]: value });
    console.log(resetPasswordCreds);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/api/users/updatePassword", {
        email: resetPasswordCreds.email,
        password: resetPasswordCreds.password,
        first_name: resetPasswordCreds.first_name,
        last_name: resetPasswordCreds.last_name,
      })
      .then((response) => {
        console.log("RESPONSE", response);
        if (response.data.status === "error") {
          setErrorMsg(response.data.message);
          return;
        }
        setErrorMsg(null);
        history.replace("/admin");
      })
      .catch((error) => {
        console.log("ERROR", error);
        setErrorMsg(error);
      });
    handleClose();
  };

  return (
    <>
      <Button variant='primary' className='my-2' onClick={handleShow}>
        Reset Salesperson Password
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ background:`linear-gradient(${'#007bff'}, ${'#002853'})`}}>
          <Modal.Title style={{ color: 'white' }}>Update Salesperson</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='form-signin'>
            
            <label htmlFor='inputEmail' className='sr-only mt-1'>
              Email address
            </label>
            <input
              type='email'
              id='inputEmail'
              className='form-control mt-1'
              name='email'
              placeholder='Email address'
              value={signUpCreds.email}
              onChange={handleChange}
            /> 
            <label htmlFor='inputPassword' className='sr-only mt-1'>
              Password
            </label>
            <input
              type='password'
              id='inputPassword'
              className='form-control mt-1'
              name='password'
              placeholder='Password'
              value={signUpCreds.password}
              onChange={handleChange}
            />
            {/* <Checkbox style={{ marginLeft: '15px' }} >Admin User </Checkbox> */}
            <Form.Check className='mt-2' type='checkbox' label='Admin User' />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default resetPasswordModal;

