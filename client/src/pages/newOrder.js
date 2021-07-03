import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button, Form } from "react-bootstrap";
// import { Container, Table } from "react-bootstrap"
import API from "../lib/API";
import { useStoreContext } from "../store/store";

const NewOrder = (props) => {
  const [state, dispatch] = useStoreContext();

  const [quanities, setQuantities] = useState({});

  const [products, setProducts] = useState([]);

  // const [grandTotal, setGrandTotal] = useState({
  //   grandTotal: [],
  // })
  const [productTotal, setProductTotal] = useState({
    productTotal: 0,
  });

  const getProductData = async () => {
    console.log(state.currentFundraiser);
    const productData = await API.Products.getAllForFundraiser(
      state.currentFundraiser
    );
    console.log(productData);
    setProducts(productData.data);
  };

  const createOrder = async () => {
    const orderData = await API.Orders.createOrder({
      customer: {},
      productsObj: quanities,
      orderObj: {
        FundraiserId: state.currentFundraiser,
        order_total: 10,
        customer_remit: "yes",
        seller_remit: null,
        order_status: null,
      }
    });
  };

  useEffect(() => {
    console.log(quanities);
  }, [quanities]);

  useEffect(() => {
    getProductData();
  }, []);

  const handleChange = (productId) => (event) => {
    const { name, value } = event.target;

    setQuantities({ ...quanities, [productId]: value });
    // setProductTotal({ [name]: (this.state.quantity.value * this.product.price.value) })
    // setGrandTotal({[name]: this.state.productTotal && this.state.productValue.reduce((a,v) => a + v.value, 0) })

    // const productTotal = () =>
    // this.state.quantity.reduce((sum, quantity) =>
    // sum + quantity * this.state.product.price, 0);
  };

  return (
    <Container className='text-center'>
      <h1>New Order</h1>
      <div className='border border-dark py-4'>
        <div className='form-group row'>
          {/* <label htmlFor="first_name" className="col-sm-2 sr-only">First Name</label> */}
          <div className='col-sm-5 ml-2'>
            <input
              type='text'
              className='form-control'
              name='first_name'
              defaultValue=''
              required
              placeholder='First Name'
            ></input>
          </div>
          {/* <label for="product_name" className="col-sm-2 col-form-label">Last Name</label> */}
          <div className='col-sm-5 mr-2'>
            <input
              type='text'
              className='form-control'
              name='last_name'
              defaultValue=''
              required
              placeholder='Last Name'
            ></input>
          </div>
        </div>
        <div className='form-group row'>
          <div className='col-sm-10 mt-1 ml-2'>
            <input
              type='text'
              className='form-control'
              name='address'
              defaultValue=''
              required
              placeholder='Address'
            ></input>
          </div>
          <div className='col-sm-10 mt-1 ml-2'>
            <input
              type='text'
              className='form-control'
              name='address2'
              defaultValue=''
              required
              placeholder='Address 2'
            ></input>
          </div>
          <div className='col-sm-5 mt-1 ml-2'>
            <input
              type='text'
              className='form-control'
              name='city'
              defaultValue=''
              required
              placeholder='City'
            ></input>
          </div>
          <div className='col-sm-2 mt-1'>
            <input
              type='text'
              className='form-control'
              name='state'
              defaultValue=''
              required
              placeholder='State'
            ></input>
          </div>
          <div className='col-sm-3 mt-1'>
            <input
              type='integer'
              className='form-control'
              name='zip'
              defaultValue=''
              required
              placeholder='Zip Code'
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
              <td>{product.name}</td>
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
                  value={quanities[product.id] || 0}
                  onChange={handleChange(product.id)}
                />
              </td>
              <td>
                {quanities[product.id]
                  ? quanities[product.id] * product.price
                  : 0}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className='row justify-content-end'>
        <Form.Check className='mt-2' type='checkbox' label='Customer Paid' />
        <div className='col-3 font-weight-bold'> Grand Total: $$$</div>
      </div>

      <Button
        className='btn btn-primary float-right my-3'
        type='submit'
        //     //  onClick={handleSubmit}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default NewOrder;
