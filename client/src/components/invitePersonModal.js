import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import API from '../lib/API';

const InvitePersonModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);
  const [signUpCreds, setSignUpCreds] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignUpCreds({ ...signUpCreds, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(signUpCreds.email);
    API.InviteEmail.sendEmail({
      emailTo: signUpCreds.email,
      emailSubject: "You're invited",
      emailBody: "you've been invited",
    })
      .then((response) => {
        // setToggleRender(!toggleRender);

        console.log('RESPONSE', response);
        if (response.data.status === 'error') {
          setErrorMsg(response.data.message);
          return;
        }
        setErrorMsg(null);
        history.replace('/admin');
      })
      .catch((error) => {
        console.log('ERROR', error);
        setErrorMsg(error);
      });
    handleClose();
  };

  return (
    <>
      <Button variant='primary' className='my-2' onClick={handleShow}>
        Invite Person
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{ background: `linear-gradient(${'#007bff'}, ${'#002853'})` }}
        >
          <Modal.Title style={{ color: 'white' }}>Send an Invite!</Modal.Title>
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
export default InvitePersonModal;
//   render(<addPersonModal/>);
