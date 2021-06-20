import React, { Component, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import AdminNav from "../components/adminNav";
import { Container, Table, Dropdown } from "react-bootstrap";

const Admin = (props) => {

  const [activeTab, setActiveTab] = useState("SALES_PERSON");

  return (
    <Container>
      <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        <Dropdown className="my-2 float-right">
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Select Salesperson
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Jim</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Dwight</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Phyllis</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Stanley</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {activeTab === "SALES_PERSON" ?
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
          </Table> : activeTab === "PRODUCTS" ?
          <div>
            Products
          </div> :
          <div>
            {activeTab}
          </div>
        }
      </div>
    </Container>
  );
};

export default Admin;
