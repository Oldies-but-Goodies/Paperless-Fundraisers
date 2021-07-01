import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table } from "react-bootstrap"

const Home = (props) => {
  
  return (
    <Container fluid className="homeContainer">
   
      <div className="row my-2  text-center">
      <h2 className="col">Welcome to Troop 82 BBQ Fundraiser </h2>
      </div>
      <div className="row my-2 text-center">
      <p className="col">We're raising money to get our troop leader, JSON, some extra coding classes </p>
      </div>
      <div className="row my-2 text-center">
      <h5 className="col">Our goal is to raise $XXXX and so far we've raised $XXXX</h5>
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
          <tr>
            <td>1</td>
            <td>Stefan</td>
            <td>$50</td>
            <td>Yes</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Tammy </td>
            <td>$40</td>
            <td>Yes</td>
            <td>No</td>
          </tr>
          </tbody>
      </Table>
    
    </Container>
  );
};

Home.propTypes = {};

export default Home;
