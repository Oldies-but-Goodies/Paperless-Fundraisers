import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
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
      dataField: "Customer.first_name",
      text: "Customer First Name",
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
      dataField: "seller_remit",
      text: "Admin Paid",
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
    getCurrentFundraiser();
    myOrders();
  }, []);


  const rowEvents = {
    onDoubleClick: (e, row, rowIndex) => {
      console.log(row, rowIndex);
      setOrder(row);
      setShowEdit(true);
    },
  };

  return (
    <Container fluid className='homeContainer'>
      <OrderDetailModal
        orderId={order ? order.id : null}
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
        rowEvents={rowEvents}
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
      
    </Container>
  );
};

Home.propTypes = {};

export default Home;
