import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table, Form, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import API from "../lib/API";

const AddPersonModal = ({ orderId }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const [order, setOrder] = useState(null);

  const getOrderDetails = async () => {
    const orderDetailsData = await API.OrderDetails.orderDetails(orderId);
    setOrder(orderDetailsData.data);
    console.log(orderDetailsData.data);
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      <Button variant='primary' className='my-2' onClick={handleShow}>
        View Orders
      </Button>

      <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header
          style={{ background: `linear-gradient(${"#007bff"}, ${"#002853"})` }}
        >
          <Modal.Title style={{ color: "white" }}>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="text-center font-weight-bold">Customer Info </div>
            <Form.Group as={Row} controlId='formPlaintextEmail'>
              {/* <Form.Label column sm='2'>
                Customer
              </Form.Label> */}
              <Col sm='3'>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={order && order.Customer.first_name + " " + order.Customer.last_name}
                />
              </Col>
              {/* <Form.Label column sm='2'>
                Email
              </Form.Label> */}
              <Col sm='3'>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={order && order.Customer.email}
                />
              </Col>
              <Col sm='3'>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={order && order.Customer.phone_number}
                />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='formPlaintextPassword'>
              {/* <Form.Label column sm='2'>
                Password
              </Form.Label> */}
              <Col sm='5'>
                <Form.Control 
                plaintext
                readOnly
                defaultValue={order && order.Customer.address_line1 + " " + order.Customer.address_line2} />
                <Form.Control 
                plaintext
                readOnly
                defaultValue={order && order.Customer.city + ", " + order.Customer.state + " " + order.Customer.zip_code} />
              </Col>
              <Form.Label column sm='2'>
                Order Total
              </Form.Label>
              <Col sm='3'>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={order && "$" + order.order_total}
                />
              </Col>
            </Form.Group>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Date of Sale</th>
                <th>Product</th>
                <th>Customer Paid</th>
                <th>Admin Paid</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.Order_Details.map((orderDetail) => (
                  <tr>
                    <td>{orderDetail.OrderId}</td>
                    <td>
                      {new Date(orderDetail.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      {orderDetail.Product.name +
                        " x " +
                        orderDetail.product_qty}
                    </td>
                    {/* <td>${orderDetail.Order.Customer.first_name + " " + orderDetail.Order.Customer.last_name}</td>
            <td>{orderDetail.Order.Customer.address_line1 + " " + orderDetail.Order.Customer.address2 + " " 
                + orderDetail.Order.Customer.city + " , " + orderDetail.Order.Customer.state + " "
                + orderDetail.Order.Customer.zip_code}</td> */}
                    <td>{order.customer_remit}</td>
                    <td>{order.seller_remit}</td>
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
