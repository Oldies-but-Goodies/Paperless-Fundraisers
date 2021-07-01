import React, { useState, useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import API from '../lib/API';
import { useStoreContext } from "../store/store";

const OrdersTab = () => {
  const [state, dispatch] = useStoreContext();

  const [orders, setOrders] = useState([])

const getOrderData = async () => {
  const orderData = await API.Orders.getAllOrders(state.currentFundraiser)
  setOrders(orderData.data)
}

useEffect(() => {
  getOrderData()
}, [])

  return (
    <Container>
      <Button href='/newOrder' className='my-2'>
        New Order
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Total Sale</th>
            <th>Date of Sale</th>
            <th>Order Status</th>
            <th>Admin Paid</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (

          <tr>
            <td>{order.User.first_name + " " + order.User.last_name}</td>
            <td>${order.order_total}</td>
            <td>{order.createdAt}</td>
            <td>{order.order_status}</td>
            <td>{order.seller_remit}</td>
          </tr>
          ))}
          
        </tbody>
      </Table>
    </Container>
  );
};

export default OrdersTab;
