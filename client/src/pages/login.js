import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { LOADING, SET_USER } from '../store/actions';
import { useStoreContext } from '../store/store';
// import { Link } from 'react-router';
const Login = () => {
  const [, /* state */ dispatch] = useStoreContext();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);
  const [loginCreds, setLoginCreds] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginCreds({ ...loginCreds, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({ type: LOADING });

    axios
      .post('/api/users/login', {
        email: loginCreds.email,
        password: loginCreds.password,
      })
      .then((response) => {
        if (response.data.status === 'error'){
          setErrorMsg(response.data.message);
          return
        }

        if (response.status === 200) {
          dispatch({ type: SET_USER, user: response.data });
          setErrorMsg(null);
          history.replace('/');
        }
      })
      .catch((error) => {
        console.log('login error: ');
        console.log(error);
      });
  };

  return (
    <div className="text-center">
      <h4>Login</h4>
      {errorMsg ? 
      <p>
        {errorMsg}
      </p> : null
      }
      <form className="form-signin">
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          name="email"
          placeholder="Email address"
          value={loginCreds.email}
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
          value={loginCreds.password}
          onChange={handleChange}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
      <h5>Not yet a user, click <Link
      to="/signUp">here </Link> to signup</h5>
    </div>
  );
};

export default Login;
