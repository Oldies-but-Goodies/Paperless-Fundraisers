import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button, Form } from 'react-bootstrap';
import API from '../lib/API';
import { useStoreContext } from '../store/store';


const NewOrder = (props) => {
  const [state, dispatch] = useStoreContext();

  const [errorMsg, setErrorMsg] = useState(null);

  const [quanities, setQuantities] = useState({});
  const [runningTotal, setRunningTotal] = useState(0);

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({});

  const [customer_remit, setcustomer_remit] = useState(false);

  const [grandTotal, setGrandTotal] = useState({
    grandTotal: [],
  });

  const getProductData = async () => {
    const productData = await API.Products.getAllForFundraiser(
      state.currentFundraiser.id
    );
    console.log(productData);
    setProducts(productData.data);
  };

  const handleQuantityChange = (productId) => (event) => {
    const { name, value } = event.target;

    const newQ = {
      ...quanities,
      [productId]: value,
    };

    setQuantities(newQ);

    let newTotal = 0;

    for (const productId in newQ) {
      const filterProducts = products.filter((product) => {
        return product.id === parseInt(productId);
      });
      const priceForProducts = filterProducts[0].price * newQ[productId];

      newTotal += priceForProducts;
    }

    setRunningTotal(newTotal);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });

    setcustomer_remit();
  };

  const handleSubmit = async () => {
    const orderData = await API.Orders.createOrder({
      customer: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        address_line1: formData.address_line1,
        address_line2: formData.address_line2,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zip_code,
        phone_number: formData.phone_number,
      },
      productsObj: quanities,
      orderObj: {
        FundraiserId: state.currentFundraiser.id,
        CustomerId: 1,
        UserId: state.user.id,
        order_total: 10,
        customer_remit,
      },
    })
      .then((response) => {
        console.log('RESPONSE', response);
        if (response.data.status === 'error') {
          setErrorMsg(response.data.message);
          return;
        }
        setErrorMsg(null);
      })
      .catch((error) => {
        console.log('ERROR', error);
        setErrorMsg(error);
      });
    window.location.reload();
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className='new-form-div text-center'>
      <h1>New Order</h1>
      <div className='border border-dark py-4'>
        <div className='form-group row'>
          <div className='col-sm-5 ml-2'>
            <input
              type='text'
              className='form-control'
              name='first_name'
              value={formData.first_name}
              required
              placeholder='First Name'
              onChange={handleChange}
            ></input>
          </div>
          <div className='col-sm-5 mr-2'>
            <input
              type='text'
              className='form-control'
              name='last_name'
              value={formData.last_name}
              required
              placeholder='Last Name'
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-sm-10 mt-1 ml-2'>
            <input
              type='text'
              className='form-control'
              name='address_line1'
              value={formData.address_line1}
              required
              placeholder='Address'
              onChange={handleChange}
            ></input>
          </div>
          <div className='col-sm-10 mt-1 ml-2'>
            <input
              type='text'
              className='form-control'
              name='address_line2'
              value={formData.address_line2}
              required
              placeholder='Address 2'
              onChange={handleChange}
            ></input>
          </div>
          <div className='col-sm-5 mt-1 ml-2'>
            <input
              type='text'
              className='form-control'
              name='city'
              value={formData.city}
              required
              placeholder='City'
              onChange={handleChange}
            ></input>
          </div>
          <div className='col-sm-2 mt-1'>
            <input
              type='text'
              className='form-control'
              name='state'
              value={formData.state}
              required
              placeholder='State'
              onChange={handleChange}
            ></input>
          </div>
          <div className='col-sm-3 mt-1'>
            <input
              type='integer'
              className='form-control'
              name='zip_code'
              value={formData.zip_code}
              required
              placeholder='Zip Code'
              onChange={handleChange}
            ></input>
          </div>
          <div className='col-sm-3 mt-1 ml-2'>
            <input
              type='string'
              className='form-control'
              name='phone_number'
              value={formData.phone_number}
              required
              placeholder='Phone Number'
              onChange={handleChange}
            ></input>
          </div>
          <div className='col-sm-3 mt-1'>
            <input
              type='email'
              className='form-control'
              name='email'
              value={formData.email}
              required
              placeholder='Email'
              onChange={handleChange}
            ></input>
          </div>
        </div>
      </div>

      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price </th>
            <th>Quantity</th>
            <th>Total Product Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td id>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <label htmlFor='inputQuantity' className='sr-only'>
                  Quantity
                </label>
                <input
                  type='integer'
                  id='inputQuantity'
                  className='form-control'
                  name='quantity'
                  value={quanities[product.id] || null}
                  onChange={handleQuantityChange(product.id)}
                />
              </td>
              <td className='d-flex justify-content-center'>
                {
                  <div className='col-3 font-weight-bold'>
                    {' '}
                    {quanities[product.id]
                      ? quanities[product.id] * product.price
                      : 0}
                  </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className='row justify-content-end'>
        <Form.Check
          className='mt-2'
          type='checkbox'
          label='Customer Paid'
          name='customer_remit'
          value={formData.customer_remit}
          onChange={(e) => setcustomer_remit(e.target.checked)}
        />
        <div className='col-3 font-weight-bold'>
          {' '}
          Grand Total: ${runningTotal}
        </div>
      </div>

      <Button
        className='btn btn-primary my-3'
        type='submit'
        onClick={handleSubmit}
      >
        Place Order
      </Button>
    </div>
  );
};

export default NewOrder;
