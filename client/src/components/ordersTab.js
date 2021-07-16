import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
// import { get } from '../../../routes/api/order';
import API from '../lib/API';
import { useStoreContext } from '../store/store';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

const OrdersTab = (props) => {
  const [state, dispatch] = useStoreContext();
  // const [showEdit, setShowEdit] = useState(false);
  const [order, setOrder] = useState([]);
  // const [fundraiser, setFundraiser] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const columns = [
    {
      dataField: 'id',
      text: 'Order ID',
      sort: true,
      type: 'number',
      editable: false,
    },
    {
      dataField: 'User.first_name',
      text: 'SalesPerson First Name',
      sort: true,
      editable: false,
    },
    {
      dataField: 'User.last_name',
      text: 'SalesPerson Last Name',
      sort: true,
      editable: false,
    },
    {
      dataField: 'order_status',
      text: 'Order Status',
      sort: true,
      editable: true,
    },
    {
      dataField: 'customer_remit',
      text: 'Customer Paid',
      sort: true,
    },
    {
      dataField: 'seller_remit',
      text: 'Admin Paid',
      sort: true,
      editable: true,
    },
  ];

  // const getCurrentFundraiser = async () => {
  //   const fundraiserData = await API.Fundraisers.getCurrentFundraiser(
  //     state.currentFundraiser.id
  //   );
  //   setFundraiser(fundraiserData.data.fundraiserData);
    
  // };

  const getOrderData = async () => {
    const orderData = await API.Orders.getAllOrders(state.currentFundraiser.id);
    setOrder(orderData.data);
  };

    const handleCellEdit = async (oldValue, newValue, row, column) => {
      const updateBodyObj = {
        id: row.id,
        order_status: row.order_status,
        customer_remit: row.customer_remit,
        seller_remit: row.seller_remit,
      };
      setErrorMsg(null);
  
      try {
        const myOrderData = await API.Orders.updateOrder(
          updateBodyObj.id,
          updateBodyObj
        );
  
        setErrorMsg('Order Updated');
  
        setTimeout(() => {
          setErrorMsg(null);
        }, 3000);
      } catch (err) {
        setErrorMsg(err.message);
      }
    };
  

  useEffect(() => {
    // getCurrentFundraiser();
    getOrderData();
  }, []);

  // const rowEvents = {
  //   onDoubleClick: (e, row, rowIndex) => {
  //     console.log(row, rowIndex);
  //     setOrder(row);
  //     // setShowEdit(true);
  //   },
  // };

  return (
    <Container className='new-form-div'>
      <Button href='/newOrder' className='my-2'>
        New Order
      </Button>
      <BootstrapTable
        keyField='id'
        data={order}
        columns={columns}
        // rowEvents={rowEvents}
        // defaultSorted={defaultSorted}
        noDataIndication='No Orders Yet'
        cellEdit={cellEditFactory({
          mode: 'click',
          afterSaveCell: (oldValue, newValue, row, column) => {
            handleCellEdit(oldValue, newValue, row, column);
          },
        })}
        // afterSaveCell={cellEdit.afterSaveCell()}
        // filter={filterFactory()}
        striped
        hover
        condensed
        bootstrap4
        blurToSave
      />
      {/* <Table striped bordered hover>
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Total Sale</th>
            <th>Date of Sale</th>
            <th>Order Status</th>
            <th>Admin Paid</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order.User.first_name + ' ' + order.User.last_name}</td>
              <td>${order.order_total}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>{order.order_status}</td>
              <td>{order.seller_remit}</td>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </Container>
  );
};

export default OrdersTab;
