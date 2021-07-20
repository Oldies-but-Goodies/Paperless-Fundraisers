import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Table, Form, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import API from "../lib/API";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";


const OrderDetailModal = ({ orderId, show, onClose }) => {
  const [order, setOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [runningTotal, setRunningTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [quanities, setQuantities] = useState({});
  const [toggleOrderDetailsAPI, setToggleOrderDetailsAPI] = useState(false);

  const columns = [
    {
      dataField: "id",
      text: "Order ID",
      type: "number",
      editable: false,
    },
    {
      dataField: "createdAt",
      text: "Date of Sale",
      type: "date",
      editable: false,
      formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== 'object') {
          dateObj = new Date(cell);
        }
        return `${('0' + dateObj.getUTCDate()).slice(-2)}/${(
          '0' +
          (dateObj.getUTCMonth() + 1)
        ).slice(-2)}/${dateObj.getUTCFullYear()}`;
      },
      editor: {
        type: Type.DATE,
      },
    },
    {
      dataField: "Product.name",
      text: "Product",
      type: "string",
      editable: false,
    },
    {
      dataField: "product_qty",
      text: "Quantity",
      type: "number",
      editable: true,
    },
  ];

  const getOrderDetails = async () => {
    const orderDetailsData = await API.OrderDetails.orderDetails(orderId);
    setOrder(orderDetailsData.data);
    calcRunningTotal(orderDetailsData.data.Order_Details)
  };
  
  const calcRunningTotal = orderDetails => setRunningTotal(orderDetails.reduce((total, currentObj) => currentObj.product_qty * currentObj.Product.price + total, 0));

  const handleCellEdit = async (oldValue, newValue, row, column) => {
    const updateBodyObj = {
      product_qty: row.product_qty
    };
    setErrorMsg(null);

    try {
      const myOrderData = await API.OrderDetails.updateOrderDetails(
        row.id,
        updateBodyObj
      );

      setToggleOrderDetailsAPI(!toggleOrderDetailsAPI);

      setErrorMsg("Order Updated");

      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  useEffect(() => {
    if (orderId) getOrderDetails();
  }, [orderId, toggleOrderDetailsAPI]);

  return (
    <>
      <Modal size='lg' show={show} onHide={onClose}>
        <Modal.Header
          style={{ background: `linear-gradient(${"#007bff"}, ${"#002853"})` }}
        >
          <Modal.Title style={{ color: "white" }}>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className='text-center font-weight-bold'>Customer Info </div>
            <Form.Group as={Row} controlId='formPlaintextEmail'>
              
              <Col sm='3'>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={
                    order &&
                    order.Customer.first_name + " " + order.Customer.last_name
                  }
                />
              </Col>
              
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
              
              <Col sm='5'>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={
                    order &&
                    order.Customer.address_line1 +
                      " " +
                      order.Customer.address_line2
                  }
                />
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={
                    order &&
                    order.Customer.city +
                      ", " +
                      order.Customer.state +
                      " " +
                      order.Customer.zip_code
                  }
                />
              </Col>
              <Form.Label column sm='2'>
                Order Total
              </Form.Label>
              <Col sm='3'>
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={runningTotal}
                  value={runningTotal}
                />
              </Col>
            </Form.Group>
          </Form>
          {order &&
            <BootstrapTable
              keyField='id'
              data={order.Order_Details}
              columns={columns}
              // rowEvents={rowEvents}
              // defaultSorted={defaultSorted}
              noDataIndication='No products defined'
              cellEdit={cellEditFactory({
                mode: "click",
                afterSaveCell: (oldValue, newValue, row, column) => {
                  handleCellEdit(oldValue, newValue, row, column);
                },
              })}
              // afterSaveCell={cellEdit.afterSaveCell()}
              // filter={filterFactory()}
              striped
              hover
              condensed
              bootstrap4
              blurToSave
            />
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default OrderDetailModal;
