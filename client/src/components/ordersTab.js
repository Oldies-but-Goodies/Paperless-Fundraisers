import React from "react";
import { Table, Container, Button } from "react-bootstrap";

const OrdersTab = () => {
  return (
    <Container>
      <Button href="/newOrder" className="my-2">
        New Order
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Total Sales </th>
            <th>Date of Sale</th>
            <th>Admin Paid</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jim</td>
            <td>$20</td>
            <td>6/20/21</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Dwight</td>
            <td>$30</td>
            <td>6/19/21</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Phyllis</td>
            <td>$150</td>
            <td>6/20/21</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Stanley</td>
            <td>$150</td>
            <td>6/19/21</td>
            <td>No</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default OrdersTab;
