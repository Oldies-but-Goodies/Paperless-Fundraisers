import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import API from '../lib/API';
import { useStoreContext } from '../store/store';

const EditProductModal = ({
  showEdit,
  setShowEdit,
  product,
  toggleRender,
  setToggleRender,
}) => {
  const [state, dispatch] = useStoreContext();
  const history = useHistory();

  // set name, description, price and active only if product is not null

  const [name, setName] = useState(product ? product.name : '');
  const [description, setDescription] = useState(
    product ? product.description : ''
  );
  const [price, setPrice] = useState(product ? product.price : '');
  const [active, setActive] = useState(product ? product.active : '');

  // console.log(product.name, product.description, product.price, product.active);

  console.log(name, description, price, active);

  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length === 0 || price.length === 0) {
      setErrorMsg('We need at least a name and a price');
      return;
    }
    const productObj = {
      name,
      description,
      price,
      active,
      FundraiserId: state.currentFundraiser.id,
    };
    setErrorMsg(null);
    console.log('here is the productObj');
    console.log(productObj);
    //  try {
    //    const productData = await API.Products.addOne(productObj);
    //    setToggleRender(!toggleRender);
    //    setErrorMsg('Product Added');
    //    setName('');
    //    setDescription('');
    //    setPrice('');
    //    setActive(false);

    //    setTimeout(() => {
    //      setShowAdd(false);
    //    }, 1000);
    //  } catch (err) {
    //    console.log(err);
    //    setErrorMsg(err.message);
    //  }
  };

  return (
    <>
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header
          style={{ background: `linear-gradient(${'#007bff'}, ${'#002853'})` }}
        >
          <Modal.Title style={{ color: 'white' }}>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMsg && <p>{errorMsg}</p>}
          <form className='form-signin' onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='inputProduct' className='sr-only'>
              Product Name
            </label>
            <input
              type='string'
              id='inputProduct'
              className='form-control mt-1'
              name='product_name'
              placeholder={product ? product.name : ''}
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={product ? product.price : ''}
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
              value={product ? product.description : ''}
              // onChange={handleChange}
            />
            <Form.Check
              className='mt-2'
              type='checkbox'
              label='Product Active'
              value={product ? product.active : ''}
              checked={product ? product.active : false}
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
