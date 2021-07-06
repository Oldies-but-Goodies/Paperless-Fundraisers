import React, {useState, useEffect} from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table } from "react-bootstrap"
import API from '../lib/API';
import { useStoreContext } from "../store/store";

const Home = (props) => {
  const [state, dispatch] = useStoreContext();

  const [fundraiser, setFundraiser] = useState([]);
  const [orders, setOrders] = useState([])

const getCurrentundraiser = async () => {
  const fundraiserData = await API.Fundraisers.getCurrentFundraiser(state.currentFundraiser)
  // console.log(fundraiserData);
  setFundraiser(fundraiserData.data);
};

const myOrders = async () => {
  const myOrderData = await API.Orders.loggedInOrders(state.user.id);
  console.log(myOrderData);
  setOrders(myOrderData.data)
}

useEffect(() => {
  getCurrentundraiser();
  myOrders()
}, [])
  
  return (
    <Container fluid className="homeContainer">
   
      <div className="row my-2  text-center">
      <h2 className="col">Welcome to {fundraiser.name} Fundraiser </h2>
      </div>
      <div className="row my-2 text-center">
      <p className="col">{fundraiser.description} </p>
      </div>
      <div className="row my-2 text-center">
      <h5 className="col">Our goal is to raise ${fundraiser.goal} and so far we've raised $XXXX</h5>
      </div>
   
{/* table only shows if user is non-Admin */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Customer Name </th>
            <th>Total Sale </th>
            <th>Customer Paid</th>
            <th>Admin Paid</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order.Customer.first_name + " " + order.Customer.last_name}</td>
              <td>{order.CustomerId}</td>
              <td>${order.order_total}</td>
              <td>{order.customer_remit}</td>
              <td>{order.seller_remit}</td>
          </tr>
          ))}
          
            {/* <td>1</td>
            <td>Stefan</td>
            <td>$50</td>
            <td>Yes</td>
            <td>Yes</td>
          
          <tr>
            <td>2</td>
            <td>Tammy </td>
            <td>$40</td>
            <td>Yes</td>
            <td>No</td>
          </tr> */}
          </tbody>
      </Table>
    
    </Container>
  );
};

Home.propTypes = {};

export default Home;
