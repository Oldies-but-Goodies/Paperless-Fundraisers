import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import API from "../lib/API";

const AddPersonModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

   const [orderDetails, setOrderDetails] = useState([])

    const getOrderDetails = async () => {
        const orderDetailsData = await API.OrderDetails.orderDetails(1)
        setOrderDetails(orderDetailsData.data)
    }
    useEffect(() => {
        getOrderDetails()
      }, [])

  return (
    <>
      <Button variant='primary' className='my-2' onClick={handleShow}>
        View Orders
      </Button>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ background:`linear-gradient(${'#007bff'}, ${'#002853'})`}}>
          <Modal.Title style={{ color: 'white' }}>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Date of Sale</th>
            <th>Product</th>
            {/* <th>Customer</th>
            <th>Address</th> */}
            <th>Customer Paid</th>
            <th>Admin Paid</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map(orderDetail => (

          <tr>
            <td>{orderDetail.OrderId}</td>
            <td>{new Date (orderDetail.createdAt).toLocaleDateString()}</td>
            {/* <td>{orderDetail.Product.name + " x " + orderDetail.product_qty}</td>
            <td>${orderDetail.Order.Customer.first_name + " " + orderDetail.Order.Customer.last_name}</td>
            <td>{orderDetail.Order.Customer.address_line1 + " " + orderDetail.Order.Customer.address2 + " " 
                + orderDetail.Order.Customer.city + " , " + orderDetail.Order.Customer.state + " "
                + orderDetail.Order.Customer.zip_code}</td>
                <td>{orderDetails.Order.customer_remit}</td>
            <td>{orderDetails.Order.seller_remit}</td> */}
          </tr>
          ))}
          
        </tbody>
      </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant='primary' onClick={handleSubmit}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AddPersonModal;