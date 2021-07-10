import React, { useState, useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import API from "../lib/API";
import AddPersonModal from "./addPersonModal";
import InvitePersonModal from "./invitePersonModal";
import ViewOrdersModal from "./viewOrdersModal";
import { useStoreContext } from "../store/store";

const SalesPersonTab = () => {
  const [state, dispatch] = useStoreContext();
  const [fundraiser, setFundraiser] = useState([]);
  const [totalUserSales, setTotalUserSales] = useState("$xx.xx");
  const [userSales, setUserSales] = useState(null);

  
  const userSalesInfo = async () => {
    const userSalesData = await API.Orders.userOrderTotalSales(state.currentFundraiser, state.user.id);
    console.log(userSalesData);
    setUserSales(userSalesData.data);
  };

  useEffect(() => {
    
    userSalesInfo();
  }, []);

  return (
    <Container fluid className="new-form-div">
      <AddPersonModal></AddPersonModal>
      <InvitePersonModal></InvitePersonModal>

      <Table className="new-form-div" striped bordered hover>
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
            <td>
              <ViewOrdersModal></ViewOrdersModal>
            </td>
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
