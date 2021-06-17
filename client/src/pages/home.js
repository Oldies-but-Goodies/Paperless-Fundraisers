import React, { Table } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = (props) => {
  return (
    <div>
      <h7>Welcome to Your fundraiser </h7>
      <p>Description of fundraiser goes here </p>
      <h4>Our goal is to raise $XXXX and so far we've raised $XXXX</h4>
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
    </div>
  );
};

Home.propTypes = {};

export default Home;
