import React, { useState, useEffect } from "react";
import { Table, Container } from "react-bootstrap";
import AddFundraiserModal from "./addFundraiserModal";
import API from '../lib/API';
import { useStoreContext } from "../store/store";

const FundraisersTab = () => {
  const [state, dispatch] = useStoreContext();

  const [fundraisers, setFundraisers] = useState([])

const getFundraiserData = async () => {
  const fundraiserData = await API.Fundraisers.getFundraisers()
  setFundraisers(fundraiserData.data)
}

useEffect(() => {
  getFundraiserData()
}, [])

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
            <th>End Date</th>
          </tr>
        </thead>
        <tbody>
          {fundraisers.map(fundraiser => (

          <tr>
            <td>{fundraiser.name}</td>
            <td>{fundraiser.description}</td>
            <td>${fundraiser.goal}</td>
            <td>{new Date (fundraiser.start).toLocaleDateString()}</td>
            <td>{new Date (fundraiser.end).toLocaleDateString()}</td>
          </tr>
          ))}
          {/* <tr>
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
          </tr> */}
        </tbody>
      </Table>
    </Container>
  );
};

export default FundraisersTab;
