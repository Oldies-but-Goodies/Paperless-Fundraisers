import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const EditProductModal = () => {
  //
  // default for the EditProductModal is to be SHOWN when it is called
  //
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <>
      {/* <Button variant='primary' className='my-2' onClick={handleShow}>
        Add Product
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{ background: `linear-gradient(${'#007bff'}, ${'#002853'})` }}
        >
          <Modal.Title style={{ color: 'white' }}>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className='form-signin'>
            <label htmlFor='inputProduct' className='sr-only'>
              Product Name
            </label>
            <input
              type='string'
              id='inputProdcut'
              className='form-control mt-1'
              name='product_name'
              placeholder='Product Name'
              // value={signUpCreds.first_name}
              // onChange={handleChange}
            />
            <label htmlFor='inputPrice' className='sr-only'>
              Price
            </label>
            <input
              type='integer'
              id='inputPrice'
              className='form-control mt-1'
              name='Price'
              placeholder='Price'
              // value={signUpCreds.last_name}
              // onChange={handleChange}
            />
            <label htmlFor='inputDescription' className='sr-only'>
              Product Description
            </label>
            <input
              type='Description'
              id='inputDescription'
              className='form-control mt-1'
              name='Description'
              placeholder='Description'
              // value={signUpCreds.email}
              // onChange={handleChange}
            />
            <Form.Check
              className='mt-2'
              type='checkbox'
              label='Product Active'
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EditProductModal;
