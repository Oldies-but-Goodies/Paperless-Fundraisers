import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button, Form } from "react-bootstrap";
// import { Container, Table } from "react-bootstrap"

const NewOrder = (props) => {
  const [quanity, setQuantity] = useState({
    quantity: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setQuantity({ ...quanity, [name]: value });
  };
  
  return (
 
    <Container className="text-center">
    <h1>New Order</h1>

  <div className="form-group row">
  {/* <label for="first_name" className="col-sm-2 col-form-label">First Name</label> */}
  <div className="col-sm-6">
    <input type="text" className="form-control" name="first_name" value="" required placeholder="First Name" ></input>
  </div>
  {/* <label for="product_name" className="col-sm-2 col-form-label">Last Name</label> */}
  <div className="col-sm-6">
    <input type="text" className="form-control" name="last_name" value="" required placeholder="Last Name"></input>
  </div>
</div>
<div className="form-group row">
<div className="col-sm-12">
    <input type="text" className="form-control" name="address" value="" required placeholder="Address"></input>
  </div>
  <div className="col-sm-12">
    <input type="text" className="form-control" name="address2" value="" required placeholder="Address 2"></input>
  </div>
  <div className="col-sm-5">
    <input type="text" className="form-control" name="city" value="" required placeholder="City"></input>
  </div>
  <div className="col-sm-3">
    <input type="text" className="form-control" name="state" value="" required placeholder="State"></input>
  </div>
  <div className="col-sm-4">
    <input type="text" className="form-control" name="zip" value="" required placeholder="Zip Code"></input>
  </div>
  </div>


  <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price </th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1lb pork BBQ</td>
            <td>$20</td>
            <td>
            <label htmlFor="inputQuantity" className="sr-only">
              Quantity
            </label>
            <input
              type="integer"
              id="inputQuantity"
              className="form-control"
              name="quantity"
              // value={signUpCreds.first_name}
              // onChange={handleChange}
            />
            {/* <input type="text" className="form-control" name="quantity" value="" required placeholder="qty"
            onChange={handleChange}></input> */}
            </td>
          </tr>
          <tr>
            <td>1lb smoked turkey</td>
            <td>$25</td>
            <td>
            <label htmlFor="inputQuantity" className="sr-only">
              Quantity
            </label>
            <input
              type="integer"
              id="inputQuantity"
              className="form-control"
              name="quantity"
              // value={signUpCreds.first_name}
              // onChange={handleChange}
            />
            {/* <input type="text" className="form-control" name="quantity" value="" required placeholder="qty"></input> */}
            </td>
          </tr>
          
        </tbody>
      </Table>
      
    <div className="row place-items-center">
    <Form.Check className="mt-2" type="checkbox" label="Customer Paid" />
      <div className="col-3"> Total: $$$</div>
    </div>

     <Button className="btn btn-primary float-right" type="submit"
  //     //  onClick={handleSubmit}
  >
   Place Order
  </Button>
  
 

  </Container>
  )};


export default NewOrder;
