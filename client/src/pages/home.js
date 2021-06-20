import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table } from "react-bootstrap"

const Home = (props) => {
  
  return (
    <Container>
    <div className="d-flex justify-content-center">
      <h2 className="row">Welcome to Troop 82 BBQ Fundraiser </h2>
      <p className="row">We're raising money to get our troop leader, JSON, some extra coding classes </p>
      <h5 className="row">Our goal is to raise $XXXX and so far we've raised $XXXX</h5>
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
