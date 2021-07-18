import axios from 'axios';
import { sign } from 'crypto';
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Dropdown,
  DropdownButton,
  InputGroup,
  Jumbotron,
  Container,
} from 'react-bootstrap';
import API from '../lib/API';

const SignUp = () => {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);
  const [signUpCreds, setSignUpCreds] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const [fundraisers, setFundraisers] = useState([]);
  const [selectedFundraiser, setSelectedFundraiser] = useState(null);

  const [dropdownTitle, setDropdownTitle] = useState([]);

  const getFundraiserData = async () => {
    const fundraiserData = await API.Fundraisers.getFundraisers();
    setFundraisers(fundraiserData.data);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpCreds({ ...signUpCreds, [name]: value });
  };

  // create a function that listens for a change to the DropdownButton and updates the selectedFundraiser
  const handleDropdownChange = (e) => {
    const value = e;
    setSelectedFundraiser(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (signUpCreds.password.length < 8) {
      setErrorMsg('Password must contain 8 characters');
      return;
    }
    axios
      .post('/api/users/signup', {
        email: signUpCreds.email,
        password: signUpCreds.password,
        first_name: signUpCreds.first_name,
        last_name: signUpCreds.last_name,
      })
      .then((res) => {
        if (res.data.status === 'error') {
          setErrorMsg(res.data.message);
          return;
        }
        setErrorMsg(null);
        return res;
      })
      .then((res) => {
        const userFundraiserObj = {
          FundraiserId: selectedFundraiser,
          UserId: res.data.userId,
          admin_level: 'user',
        };
        // api call to link user to fundraiser
        axios
          .post('/api/userFundraiser/addusertofundraiser/', userFundraiserObj)
          .then((res) => {
            if (res.data.status === 'error') {
              setErrorMsg(res.data.message);
              return;
            }
            setErrorMsg(null);
            // redirect user to the home page
            history.push('/');
            // history.replace('/');
          })
          .catch((error) => {
            console.log('ERROR', error);
            setErrorMsg(error.message);
          });
      });
  };

  useEffect(() => {
    getFundraiserData();
  }, []);

  return (
    <div>
      <Jumbotron className='text-center jumbo'>
        <div> Paperless Fundraisers</div>
      </Jumbotron>
      <Container fluid className='loginContainer'>
        <div className='text-center'>
          <h4>Sign Up</h4>
          {errorMsg ? <p>{errorMsg}</p> : null}
          <form className='form-signin'>
            <div>
              <label htmlFor='inputFirst' className='sr-only'>
                First Name
              </label>
              <input
                type='string'
                id='inputFirst'
                className='form-control'
                name='first_name'
                placeholder='First Name'
                value={signUpCreds.first_name}
                onChange={handleChange}
              />
            </div>
            <div className='mt-1'>
              <label htmlFor='inputLast' className='sr-only mt-1'>
                Email address
              </label>
              <input
                type='string'
                id='inputLast'
                className='form-control'
                name='last_name'
                placeholder='Last Name'
                value={signUpCreds.last_name}
                onChange={handleChange}
              />
            </div>
            <div className='mt-1'>
              <label htmlFor='inputEmail' className='sr-only'>
                Email address
              </label>
              <input
                type='email'
                id='inputEmail'
                className='form-control'
                name='email'
                placeholder='Email address'
                value={signUpCreds.email}
                onChange={handleChange}
              />
            </div>
            <div className='mt-1'>
              <label htmlFor='inputPassword' className='sr-only'>
                Password
              </label>
              <input
                type='password'
                id='inputPassword'
                className='form-control'
                name='password'
                placeholder='Password'
                value={signUpCreds.password}
                onChange={handleChange}
              />
            </div>
            <div className='mt-1 mb-3'>
              <DropdownButton
                as={InputGroup.Prepend}
                variant='outline-secondary'
                title='Select Fundraiser'
                // id='input-group-dropdown-1'
                onSelect={handleDropdownChange}
              >
                {fundraisers.map((fundraiser) => (
                  <div>
                    <Dropdown.Item eventKey={fundraiser.id}>
                      {fundraiser.id} - {fundraiser.name}
                    </Dropdown.Item>
                  </div>
                ))}
              </DropdownButton>
              <h6>
                {selectedFundraiser ? (
                  <p>you have selected fundraiser {selectedFundraiser}</p>
                ) : (
                  <p>Don't forget to select your fundraiser</p>
                )}
              </h6>
            </div>
            <button
              className='btn btn-lg btn-primary btn-block'
              type='submit'
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </form>
          <h5>
            Already a user, click <Link to='/login'>here </Link> to Login
          </h5>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
