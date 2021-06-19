import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Container, Table } from "react-bootstrap"

const NewOrder = (props) => {
  
  return (
    <div className="text-center">
    <h4>New Order</h4>
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
        
      />
      <label htmlFor="inputLast" className="sr-only">
        Last Name
      </label>
      <input
        type="string"
        id="inputLast"
        className="form-control"
        name="last_name"
        placeholder="Last Name"
       
      />
      <label htmlFor="inputEmail" className="sr-only">
        Address
      </label>
      <input
        type="email"
        id="inputEmail"
        className="form-control"
        name="email"
        placeholder="Address"
        
      />
      <label htmlFor="inputEmail" className="sr-only">
        Address 2
      </label>
      <input
        type="email"
        id="inputEmail"
        className="form-control"
        name="email"
        placeholder="Address 2"
        
      />
      <label htmlFor="inputPassword" className="sr-only">
        City
      </label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        name="city"
        placeholder="City"
        
      />
      <label htmlFor="inputPassword" className="sr-only">
        City
      </label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        name="state"
        placeholder="State"
        
      />
      <label htmlFor="inputPassword" className="sr-only">
        City
      </label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        name="zip code"
        placeholder="Zip Code"
        
      />
      <button className="btn btn-lg btn-primary btn-block" type="submit"
      //  onClick={handleSubmit}
       >
        Add Order
      </button>
    </form>
  </div>
  )};


export default NewOrder;
