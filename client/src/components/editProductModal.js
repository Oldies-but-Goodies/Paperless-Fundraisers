import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const EditProductModal = ({ showEdit, setShowEdit, product }) => {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <>
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header
          style={{ background: `linear-gradient(${'#007bff'}, ${'#002853'})` }}
        >
          <Modal.Title style={{ color: 'white' }}>Edit Product</Modal.Title>
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
              value={product.name}
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
              value={product.price}
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
              value={product.description}
              // value={signUpCreds.email}
              // onChange={handleChange}
            />
            <Form.Check
              className='mt-2'
              type='checkbox'
              label='Product Active'
              value={product.active}
              checked={product.active}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowEdit(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={() => setShowEdit(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EditProductModal;
