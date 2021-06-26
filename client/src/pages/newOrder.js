import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button, Form } from "react-bootstrap";
// import { Container, Table } from "react-bootstrap"

const NewOrder = (props) => {
  const [quanity, setQuantity] = useState({
    quantity: "",
    
  });
  
  // const [grandTotal, setGrandTotal] = useState({
  //   grandTotal: [],
  // })
  // const [productTotal, setProductTotal] = useState({
  //   productTotal: 0
  // });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setQuantity({ [name]: value });
    // setProductTotal({...productTotal, [name]: multiply(value, this.state.product.price)})
    // setGrandTotal({[name]: this.state.productTotal && this.state.productValue.reduce((a,v) => a + v.value, 0) })

  };

  const productTotal = () => 
  this.state.quantity.reduce((sum, quantity) =>
  sum + quantity * 20, 0);

 
  
  return (
 
    <Container className="text-center">
    <h1>New Order</h1>
    <div className="border border-bold py-1">
  <div className="form-group row">
  {/* <label htmlFor="first_name" className="col-sm-2 sr-only">First Name</label> */}
  <div className="col-sm-6">
    <input type="text" className="form-control" name="first_name" defaultValue="" required placeholder="First Name" ></input>
  </div>
  {/* <label for="product_name" className="col-sm-2 col-form-label">Last Name</label> */}
  <div className="col-sm-6">
    <input type="text" className="form-control" name="last_name" defaultValue="" required placeholder="Last Name"></input>
  </div>
</div>
<div className="form-group row">
<div className="col-sm-12 mt-1">
    <input type="text" className="form-control" name="address" defaultValue="" required placeholder="Address"></input>
  </div>
  <div className="col-sm-12 mt-1">
    <input type="text" className="form-control" name="address2" defaultValue="" required placeholder="Address 2"></input>
  </div>
  <div className="col-sm-5 mt-1">
    <input type="text" className="form-control" name="city" defaultValue="" required placeholder="City"></input>
  </div>
  <div className="col-sm-3 mt-1">
    <input type="text" className="form-control" name="state" defaultValue="" required placeholder="State"></input>
  </div>
  <div className="col-sm-4 mt-1">
    <input type="integer" className="form-control" name="zip" defaultValue="" required placeholder="Zip Code"></input>
  </div>
  </div>
  </div>


  <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price </th>
            <th>Quantity</th>
            <th>Total Product Price</th>
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
              value={quanity}
              onChange={handleChange}
            />
            </td>
            {/* <td>{productTotal}</td> */}
            <td>Row Total $$</td>
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
            </td>
            {/* <td>{productTotal}</td> */}
            <td> Row total $$</td>
          </tr>
          
        </tbody>
      </Table>
      
    <div className="row justify-content-end">
    <Form.Check className="mt-2" type="checkbox" label="Customer Paid" />
      <div className="col-3 font-weight-bold"> Grand Total: $$$</div>
    </div>

     <Button className="btn btn-primary float-right my-3" type="submit"
  //     //  onClick={handleSubmit}
  >
   Place Order
  </Button>
  
 

  </Container>
  )};


export default NewOrder;
