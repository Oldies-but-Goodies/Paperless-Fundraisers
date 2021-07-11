import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import API from '../lib/API';
import { useStoreContext } from '../store/store';

const AddProductModal = ({
  showAdd,
  setShowAdd,
  toggleRender,
  setToggleRender,
}) => {
  const [state, dispatch] = useStoreContext();
  const handleClose = () => setShowAdd(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [active, setActive] = useState(false);

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

    console.log(productObj);
    try {
      const productData = await API.Products.addOne(productObj);
      setToggleRender(!toggleRender);
      setErrorMsg('Product Added');
      setName('');
      setDescription('');
      setPrice('');
      setActive(false);

      setTimeout(() => {
        setShowAdd(false);
      }, 1000);
    } catch (err) {
      console.log(err);
      setErrorMsg(err.message);
    }
  };

  return (
    <>
      <Modal show={showAdd} onHide={handleClose}>
        <Modal.Header
          style={{ background: `linear-gradient(${'#007bff'}, ${'#002853'})` }}
        >
          <Modal.Title style={{ color: 'white' }}>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMsg && <p>{errorMsg}</p>}
          <Form className='form-signin' onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor='inputProduct' className='sr-only'>
              Product Name
            </label>
            <input
              type='string'
              id='inputProduct'
              className='form-control mt-1'
              name='product_name'
              placeholder='Product Name'
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
              onChange={(e) => setPrice(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Check
              className='mt-2'
              type='checkbox'
              label='Product Active'
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
            <Modal.Footer>
              <Button variant='secondary' onClick={handleClose}>
                Close
              </Button>
              <Button variant='primary' type='submit'>
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddProductModal;
//   render(<addPersonModal/>);
