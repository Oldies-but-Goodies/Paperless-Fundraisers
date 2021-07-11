import React, { useState, useEffect } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table } from 'react-bootstrap';
import API from '../lib/API';
import { useStoreContext } from '../store/store';
import OrderDetailModal from '../components/orderDetailModal';

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

const Home = (props) => {
  const [state, dispatch] = useStoreContext();

  const [fundraiser, setFundraiser] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalFundraiserSales, setTotalFundraiserSales] = useState('$xx.xx');

  const [order, setOrder] = useState(null);

  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [toggleRender, setToggleRender] = useState(false);

  const [orderIndex, setOrderIndex] = useState(0);

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
      dataField: 'id',
      text: 'Order ID',
      sort: true,
      type: 'number',
      editable: false,
    },
    {
      dataField: 'Customer.first_name',
      text: 'Customer First Name',
      sort: true,
      editable: false,
    },
    {
      dataField: 'Customer.last_name',
      text: 'Customer Last Name',
      sort: true,
      editable: false,
    },
    {
      dataField: 'order_total',
      text: 'Total Sale',
      sort: true,
      type: 'number',
      editable: false,
    },
    {
      dataField: 'customer_remit',
      text: 'Customer Paid',
      sort: true,
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
      editable: false,
    },
  ];

  const getCurrentFundraiser = async () => {
    const fundraiserData = await API.Fundraisers.getCurrentFundraiser(
      state.currentFundraiser.id
    );
    console.log('fundraiserData XXXXX ', fundraiserData);
    setFundraiser(fundraiserData.data.fundraiserData);
    setTotalFundraiserSales(fundraiserData.data.totalFundraiserSales);
  };

  const myOrders = async () => {
    const myOrderData = await API.Orders.loggedInOrders(state.user.id);
    console.log(myOrderData);
    setOrders(myOrderData.data);
  };

  const handleCellEdit = async (oldValue, newValue, row, column) => {
    const updateBodyObj = {
      id: row.id,
      first_name: row.Customer.first_name,
      last_name: row.Customer.last_name,
      order_total: row.order_total,
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

  // const getOrderDetails = async () => {
  //   const orderDetailsData = await API.OrderDetails.orderDetails(state.id);
  //   // let orderId=order.id
  //   setOrder(orderDetailsData.data);
  //   console.log(orderDetailsData.data);
  // };

  useEffect(() => {
    getCurrentFundraiser();
    myOrders();
  }, []);

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(row, rowIndex);
      setOrder(row);
      setShowEdit(true);
    },
  };

  return (
    <Container fluid className='homeContainer'>
      <OrderDetailModal
        orderId={order ? order.id : ''}
        show={showEdit}
        onClose={() => setShowEdit(false)}
      />

      <div className='row my-2  text-center'>
        <h2 className='col'>Welcome to {fundraiser.name} Fundraiser </h2>
      </div>
      <div className='row my-2 text-center'>
        <p className='col'>{fundraiser.description} </p>
      </div>
      <div className='row my-2 text-center'>
        <h5 className='col'>
          Our goal is to raise ${fundraiser.goal} and so far we've raised $
          {totalFundraiserSales}
        </h5>
      </div>
      <BootstrapTable
        keyField='id'
        data={orders}
        columns={columns}
        // expandRow={ expandRow }
        rowEvents={rowEvents}
        // defaultSorted={defaultSorted}
        noDataIndication='No products defined'
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
      {/* table only shows if user is non-Admin */}
      {/* <Table striped bordered hover>
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
          {orders.map((order) => (
            <tr>

              <td>{order.id}</td>
              <td>{order.Customer.first_name + " " + order.Customer.last_name}</td>
              <td>${order.order_total}</td>
              <td>{order.customer_remit}</td>
              <td>{order.seller_remit}</td>
              <td>
                <OrderDetailModal
                  orderId={order.id}
                />
                </td>
          </tr>
          ))}
          
           
          </tbody>
      </Table> */}
    </Container>
  );
};

Home.propTypes = {};

export default Home;
