import React from "react";
import { Table, Container, Button} from "react-bootstrap";
import AddPersonModal from "./addPersonModal";
import ViewOrdersModal from "./viewOrdersModal";

const SalesPersonTab = () => {
  return (
    <Container>
      <AddPersonModal>

      </AddPersonModal>

      {/* <Dropdown className="my-2 float-right">
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Select Salesperson
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Jim</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Dwight</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Phyllis</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Stanley</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Total Sales </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jim</td>
            <td>$200</td>
            <td><ViewOrdersModal>
              </ViewOrdersModal></td>
              
          </tr>
          <tr>
            <td>Dwight</td>
            <td>$150</td>
          </tr>
          <tr>
            <td>Phyllis</td>
            <td>$150</td>
          </tr>
          <tr>
            <td>Stanley</td>
            <td>$150</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default SalesPersonTab;
