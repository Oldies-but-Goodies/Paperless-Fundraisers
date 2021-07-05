import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button, Form } from "react-bootstrap";
// import { Container, Table } from "react-bootstrap"
import API from "../lib/API";
import { useStoreContext } from "../store/store";

const NewOrder = (props) => {
  const [state, dispatch] = useStoreContext();

  const [errorMsg, setErrorMsg] = useState(null);

  const [quanities, setQuantities] = useState({});

  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({});

  const [grandTotal, setGrandTotal] = useState({
    grandTotal: [],
  })
  

    const getProductData = async () => {
    console.log(state.currentFundraiser);
    const productData = await API.Products.getAllForFundraiser(
      state.currentFundraiser
    );
    console.log(productData);
    setProducts(productData.data);
  };
  
  const handleQuantityChange = (productId) => (event) => {
    const { name, value } = event.target;

    setQuantities({ ...quanities, [productId]: value });
    // setFormData({...formData, [name]: value});
    // setGrandTotal:({...grandTotal, [quanities]: value})
    // setProductTotal({ [name]: (this.state.quantity.value * this.product.price.value) })
    // setGrandTotal({[name]: this.state.productTotal && this.state.productValue.reduce((a,v) => a + v.value, 0) })

    // const productTotal = () =>
    // this.state.quantity.reduce((sum, quantity) =>
    // sum + quantity * this.state.product.price, 0);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    // setQuantities({ ...quanities, [productId]: value });
    setFormData({...formData, [name]: value});
    // setGrandTotal:({...grandTotal, [quanities]: value})
    // setProductTotal({ [name]: (this.state.quantity.value * this.product.price.value) })
    // setGrandTotal({[name]: this.state.productTotal && this.state.productValue.reduce((a,v) => a + v.value, 0) })

    // const productTotal = () =>
    // this.state.quantity.reduce((sum, quantity) =>
    // sum + quantity * this.state.product.price, 0);
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
        phone_number: formData.phone_number
      },
      productsObj: quanities,
      orderObj: {
        FundraiserId: state.currentFundraiser,
        CustomerId: 1,
        UserId: 1,
        order_total: 10,
        customer_remit: formData.customer_remit,
        seller_remit: null,
        order_status: null,
      }
     
    }).then((response) => {
      console.log("RESPONSE", response);
      if (response.data.status === "error") {
        setErrorMsg(response.data.message);
        return;
      }
      setErrorMsg(null);
      // history.replace("/admin");
    })
    .catch((error) => {
      console.log("ERROR", error);
      setErrorMsg(error);
    });
    // return orderData
    console.log(orderData);
  };

  useEffect(() => {
    console.log(quanities);
  }, [quanities]);

  useEffect(() => {
    getProductData();
  }, []);




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
              value=''
              required
              placeholder='First Name'
              onChange={handleChange}
            ></input>
          </div>
          {/* <label for="product_name" className="col-sm-2 col-form-label">Last Name</label> */}
          <div className='col-sm-5 mr-2'>
            <input
              type='text'
              className='form-control'
              name='last_name'
              value=''
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
              value=''
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
              value=''
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
              value=''
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
              value=''
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
              value=''
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
              value=''
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
              value=''
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
                  value={quanities[product.id] || null}
                  onChange={handleQuantityChange(product.id)}
                />
              </td>
              <td className='d-flex justify-content-center'>
                {<div className='col-3 font-weight-bold'> {quanities[product.id]
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
        <Form.Check className='mt-2' 
        type='checkbox' 
        label='Customer Paid' 
        name='customer_remit' 
        value={formData.customer_remit}
        onChange={handleChange}
        />
        <div className='col-3 font-weight-bold'> Grand Total: $$</div>
      </div>

      <Button
        className='btn btn-primary float-right my-3'
        type='submit'
             onClick={handleSubmit}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default NewOrder;
