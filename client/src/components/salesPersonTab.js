import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import API from '../lib/API';
import AddPersonModal from './addPersonModal';
import InvitePersonModal from './invitePersonModal';
import ViewOrdersModal from './viewOrdersModal';
import { useStoreContext } from '../store/store';
import BootstrapTable from 'react-bootstrap-table-next';

const SalesPersonTab = () => {
  const [state, dispatch] = useStoreContext();
  const [fundraiser, setFundraiser] = useState([]);
  const [totalUserSales, setTotalUserSales] = useState('$xx.xx');
  const [userSales, setUserSales] = useState(null);


  const columns = [
    {
      dataField: 'Orders.User.first_name',
      text: 'Customer First Name',
      sort: true,
      editable: false,
    },
    {
      dataField: 'Orders.User.last_name',
      text: 'Customer Last Name',
      sort: true,
      editable: false,
    },
    {
      dataField: 'totalUserSales',
      text: 'Total Sales',
      sort: true,
      editable: false,
    },
  ];

  const getCurrentFundraiser = async () => {
    const fundraiserData = await API.Fundraisers.getCurrentFundraiser(
      state.currentFundraiser.id
    );
    console.log('XXXXX checking fundraiser id ' + state.currentFundraiser.id);
    console.log('fundraiserData XXXXX ', fundraiserData);
    setFundraiser(fundraiserData.data.fundraiserData);
  };

  const userSalesInfo = async () => {
    const userSalesData = await API.Orders.userOrderTotalSales(
      state.currentFundraiser.id,
      state.user.id
    );
    console.log('XXXXX checking fundraiser id ' + state.currentFundraiser.id);
    console.log(userSalesData);
    setUserSales(userSalesData.data.fundraiserData.Orders);
    setTotalUserSales(userSalesData.fundraiserData.data.totalUserSales)
  };

  useEffect(() => {
    userSalesInfo();
  }, []);

  return (
    <Container fluid className='new-form-div'>
      <AddPersonModal></AddPersonModal>
      <InvitePersonModal></InvitePersonModal>

      <BootstrapTable
        keyField='id'
        data={userSales}
        columns={columns}
        // rowEvents={rowEvents}
        // defaultSorted={defaultSorted}
        noDataIndication='No Orders Yet'
        // cellEdit={cellEditFactory({
        //   mode: 'click',
        //   afterSaveCell: (oldValue, newValue, row, column) => {
        //     handleCellEdit(oldValue, newValue, row, column);
        //   },
        // })}
        // afterSaveCell={cellEdit.afterSaveCell()}
        // filter={filterFactory()}
        striped
        hover
        condensed
        bootstrap4
        blurToSave
      />
      {/* <AdminPasswordModal></AdminPasswordModal> */}

      {/* <Table className='new-form-div' striped bordered hover>
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Total Sales </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jason Jones</td>
            <td>$200</td> */}
            {/* <td>
              <ViewOrdersModal></ViewOrdersModal>
            </td> */}
          {/* </tr>
          <tr>
            <td>Tammy Gegoski</td>
            <td>$300</td>
          </tr>
          <tr>
            <td>Stefan Podinski</td>
            <td>$150</td>
          </tr>
          <tr>
            <td>Josh Walters</td>
            <td>$150</td>
          </tr>
        </tbody>
      </Table> */}
    </Container>
  );
};

export default SalesPersonTab;
