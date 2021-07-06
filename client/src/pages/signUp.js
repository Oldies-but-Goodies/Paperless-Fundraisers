import axios from "axios";
import { sign } from "crypto";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Dropdown, DropdownButton, InputGroup } from "react-bootstrap";
import API from '../lib/API';

const SignUp = () => {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);
  const [signUpCreds, setSignUpCreds] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [fundraisers, setFundraisers] = useState([])
  const [dropdownTitle, setDropdownTitle] = useState([])

  const getFundraiserData = async () => {
    const fundraiserData = await API.Fundraisers.getFundraisers()
    setFundraisers(fundraiserData.data)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignUpCreds({ ...signUpCreds, [name]: value });
  };

  // const onSelect = (event, eventKey) => {
  //   event.preventDefault();
  //   const{ name, eventKey } = event.target;

  //   setDropdownTitle({ [name]: eventKey});
    
    // const dropdownTitle = this.state.dropdownTitle;
    // dropdownTitle.dropdownTitle.value = eventKey
    
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (signUpCreds.password.length < 8) {
      setErrorMsg("Password must contain 8 characters");
      return;
    }
    axios
      .post("/api/users/signup", {
        email: signUpCreds.email,
        password: signUpCreds.password,
        first_name: signUpCreds.first_name,
        last_name: signUpCreds.last_name,
      })
      .then((response) => {
        console.log("RESPONSE", response);
        if (response.data.status === "error") {
          setErrorMsg(response.data.message);
          return;
        }
        setErrorMsg(null);
        history.replace("/login");
      })
      .catch((error) => {
        console.log("ERROR", error);
        setErrorMsg(error.message);
      });
  };
  useEffect(() => {
    getFundraiserData()
  }, [])

  return (
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
        variant="outline-secondary"
        title="Select Fundraiser"
        id="input-group-dropdown-1"
        >
          {fundraisers.map(fundraiser => (
            <div>
              <Dropdown.Item eventKey="{fundraiser.name}" 
              // onClick={onSelect}
              >
                {fundraiser.name}
                </Dropdown.Item>
            </div>
            ))}
        </DropdownButton>
        </div>
        <button
          className='btn btn-lg btn-primary btn-block'
          type='submit'
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
