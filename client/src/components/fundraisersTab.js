import React from "react";
import { Table, Container } from "react-bootstrap";
import AddFundraiserModal from "./addFundraiserModal";

const OrdersTab = () => {
  return (
    <Container>
      <AddFundraiserModal>

      </AddFundraiserModal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Fundraiser</th>
            <th>Description</th>
            <th>Goal</th>
            <th>Start Date</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1lb BBQ</td>
            <td>$20</td>
            <td>1lb pulled pork</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Smoked Turkey</td>
            <td>$30</td>
            <td>sliced turkey breast</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Baked Beans</td>
            <td>$5</td>
            <td>family size container of baked beans</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Sweet Tea</td>
            <td>$7</td>
            <td>1 gallon of sweet tea</td>
            <td>No</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default OrdersTab;
