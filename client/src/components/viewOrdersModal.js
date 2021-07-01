import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ViewOrdersModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);

  // ***Need to creat post route***

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   axios
  //     .post("/api/users/signup", {
  //       email: signUpCreds.email,
  //       password: signUpCreds.password,
  //       first_name: signUpCreds.first_name,
  //       last_name: signUpCreds.last_name,
  //     })
  //     .then((response) => {
  //       console.log("RESPONSE", response);
  //       if (response.data.status === "error") {
  //         setErrorMsg(response.data.message);
  //         return;
  //       }
  //       setErrorMsg(null);
  //       history.replace("/admin");
  //     })
  //     .catch((error) => {
  //       console.log("ERROR", error);
  //       setErrorMsg(error);
  //     });
  // };

  return (
    <>
      <Button variant="primary" className="my-2" onClick={handleShow}>
        View Orders
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ background:`linear-gradient(${'#007bff'}, ${'#002853'})`}}>
          <Modal.Title style={{ color: 'white' }}>Orders for Jim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          order details go here
          {/* <form className="form-signin">
            <label htmlFor="inputProduct" className="sr-only">
              Product Name
            </label>
            <input
              type="string"
              id="inputProdcut"
              className="form-control mt-1"
              name="product_name"
              placeholder="Product Name"
              // value={signUpCreds.first_name}
              // onChange={handleChange}
            />
            <label htmlFor="inputPrice" className="sr-only">
              Price
            </label>
            <input
              type="integer"
              id="inputPrice"
              className="form-control mt-1"
              name="Price"
              placeholder="Price"
              // value={signUpCreds.last_name}
              // onChange={handleChange}
            />
            <label htmlFor="inputDescription" className="sr-only">
              Product Description
            </label>
            <input
              type="Description"
              id="inputDescription"
              className="form-control mt-1"
              name="Description"
              placeholder="Description"
              // value={signUpCreds.email}
              // onChange={handleChange}
            />
            <Form.Check className="mt-2" type="checkbox" label="Product Active" />
          </form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ViewOrdersModal;
//   render(<addPersonModal/>);
