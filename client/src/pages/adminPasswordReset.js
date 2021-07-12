import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Modal,
} from 'react-bootstrap';
import API from '../lib/API';
import { useHistory } from 'react-router-dom';
import { useStoreContext } from '../store/store';

const Profile = (props) => {
  const [state, dispatch] = useStoreContext();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);

  const [passwordReset, setPasswordReset] = useState({
    formNewPasswordFirst: '',
    formNewPasswordSecond: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPasswordReset({ ...passwordReset, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg(null);
    console.log(passwordReset);

    //
    // lets check to be sure that they entered SOMETHING
    //
    if (
    passwordReset.formNewPasswordFirst.length <= 0 ||
      passwordReset.formNewPasswordSecond.length <= 0
    ) {
      setErrorMsg('complete all required fields');
      return;
    }

    //
    // validate that the two passwords they typed are the same
    //
    if (
      passwordReset.formNewPasswordFirst !==
      passwordReset.formNewPasswordSecond
    ) {
      setErrorMsg('passwords must match');
      return;
    }
    //
    // the updatePassword method on the Users model will try to change the password
    //
    try {
      const updatePasswordData = await API.Users.updatePassword(
        passwordReset.formCurrentPasswordCheck,
        passwordChange.formNewPasswordFirst,
        state.user.email
      );
      // console.log(updatePasswordData);

      if (updatePasswordData.data.status === 'error') {
        setErrorMsg(updatePasswordData.data.message);
        return;
      }

      setErrorMsg('Success!');
      setPasswordReset({
        formCurrentPasswordCheck: '',
        formNewPasswordFirst: '',
        formNewPasswordSecond: '',
      });
      setTimeout(() => {
        setShow(!show);
        setErrorMsg('');
      }, 1000);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setErrorMsg(err.response.data);
    }
  };

  return (
    <>
      <Row className='justify-content-md-center'>
        <Col xs lg='4'>
          <Button variant='primary' onClick={() => setShow(!show)} block>
            Reset Password
          </Button>
        </Col>
      </Row>

      <Modal show={show} onHide={() => setShow(!show)}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMsg && <p>{errorMsg}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='formCurrentPasswordCheck'>
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                type='password'
                placeholder='Enter current password'
                name='formCurrentPasswordCheck'
              />
            </Form.Group>

            <Form.Group controlId='formNewPasswordFirst'>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                onChange={handleChange}
                type='password'
                placeholder='Password'
                name='formNewPasswordFirst'
              />
            </Form.Group>
            <Form.Group controlId='formNewPasswordSecond'>
              <Form.Control
                onChange={handleChange}
                type='password'
                placeholder='Confirm New Password'
                name='formNewPasswordSecond'
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant='secondary' onClick={() => setShow(!show)}>
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

export default passwordReset;
