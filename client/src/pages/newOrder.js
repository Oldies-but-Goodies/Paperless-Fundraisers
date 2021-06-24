import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
// import { Container, Table } from "react-bootstrap"

const NewOrder = (props) => {
  
  return (
  //   <div className="text-center">
  //   <h4>New Order</h4>
  //   <form className="form-signin col-12">
  //   <label htmlFor="inputFirst" className="sr-only">
  //       First Name
  //     </label>
  //     <input
  //       type="string"
  //       id="inputFirst"
  //       className="form-control"
  //       name="first_name"
  //       placeholder="First Name"
  //     />
  //     <label htmlFor="inputLast" className="sr-only">
  //       Last Name
  //     </label>
  //     <input
  //       type="string"
  //       id="inputLast"
  //       className="form-control"
  //       name="last_name"
  //       placeholder="Last Name"
  //     />
  //     <label htmlFor="inputAddress" className="sr-only">
  //       Address
  //     </label>
  //     <input
  //       type="string"
  //       id="inputAddress"
  //       className="form-control"
  //       name="Address"
  //       placeholder="Address"
  //     />
  //     <label htmlFor="inputAddress2" className="sr-only">
  //       Address 2
  //     </label>
  //     <input
  //       type="Address2"
  //       id="inputAddress2"
  //       className="form-control"
  //       name="Address2"
  //       placeholder="Address 2"
  //     />
  //     <div className="row">

  //     <label htmlFor="inputCity" className="col-6 sr-only">
  //       City
  //     </label>
  //     <input
  //       type="string"
  //       id="inputCity"
  //       className="form-control"
  //       name="city"
  //       placeholder="City"
  //     />
  //     <label htmlFor="inputState" className="col-2 sr-only">
  //       State
  //     </label>
  //     <input
  //       type="string"
  //       id="inputState"
  //       className="form-control"
  //       name="state"
  //       placeholder="State"
  //     />
  //     <label htmlFor="inputZipCode" className="col- 4 sr-only">
  //       Zip Code
  //     </label>
  //     <input
  //       type="integer"
  //       id="inputZipCode"
  //       className="form-control"
  //       name="zip code"
  //       placeholder="Zip Code"
  //     />
  //     </div>
  //     <button className="btn btn-lg btn-primary btn-block" type="submit"
  //     //  onClick={handleSubmit}
  //      >
  //       Add Order
  //     </button>
  //   </form>
  // </div>
  <Container>

  <div class="form-group row">
  {/* <label for="product_sku" class="col-sm-2 col-form-label">SKU (ID)</label> */}
  <div class="col-sm-5">
    <input type="text" class="form-control" name="product_sku" value="" required></input>
  </div>
  {/* <label for="product_name" class="col-sm-2 col-form-label">Product Name</label> */}
  <div class="col-sm-6">
    <input type="text" class="form-control" name="product_name" value="" required></input>
  </div>
</div>
{/* <div class="form-group row">
</div> */}
  </Container>
  )};


export default NewOrder;
