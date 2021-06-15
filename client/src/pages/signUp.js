import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const history = useHistory();

  const [signUpCreds, setSignUpCreds] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignUpCreds({ ...signUpCreds, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/api/users/signup', {
        email: signUpCreds.email,
        password: signUpCreds.password,
        first_name: signUpCreds.first_name,
        last_name: signUpCreds.last_name
      })
      .then((response) => {
        console.log('RESPONSE', response);
        history.replace('/login');
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  };

  return (
    <div className="text-center">
      <h4>Sign Up</h4>
      <form className="form-signin">
      <label htmlFor="inputFirst" className="sr-only">
          First Name
        </label>
        <input
          type="string"
          id="inputFirst"
          className="form-control"
          name="first_name"
          placeholder="First Name"
          value={signUpCreds.first_name}
          onChange={handleChange}
        />
        <label htmlFor="inputLast" className="sr-only">
          Email address
        </label>
        <input
          type="string"
          id="inputLast"
          className="form-control"
          name="last_name"
          placeholder="Last Name"
          value={signUpCreds.last_name}
          onChange={handleChange}
        />
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          name="email"
          placeholder="Email address"
          value={signUpCreds.email}
          onChange={handleChange}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          name="password"
          placeholder="Password"
          value={signUpCreds.password}
          onChange={handleChange}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
