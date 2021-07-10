import React, {useState, useEffect} from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table } from "react-bootstrap"
import API from '../lib/API';
import { useStoreContext } from "../store/store";
import OrderDetailModal from "../components/orderDetailModal"

import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

const Home = (props) => {
  const [state, dispatch] = useStoreContext();

  const [fundraiser, setFundraiser] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalFundraiserSales, setTotalFundraiserSales] = useState("$xx.xx")

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
      type: 'number'
    },
    {
      dataField: 'Customer.first_name',
      text: 'Customer First Name',
      sort: true
    },
    {
      dataField: 'Customer.last_name',
      text: 'Customer Last Name',
      sort: true
    },
    {
      dataField: 'order_total',
      text: 'Total Sale',
      sort: true,
      type: 'number'
    },
    {
      dataField: 'customer_remit',
      text: 'Customer Paid',
      sort: true
    },
    {
      dataField: 'seller_remit',
      text: 'Admin Paid',
      sort: true
    },
  ]

  const subColumns = [
    {
      dataField: 'createdAt',
      text: 'Date of Sale',
      sort: true
    },
    // {
    //   dataField: 'Order_Details.Product.name',
    //   text: 'Product',
    //   sort: true
    // },
  ]

const getCurrentundraiser = async () => {
  const fundraiserData = await API.Fundraisers.getCurrentFundraiser(state.currentFundraiser)
  // console.log(fundraiserData);
  setFundraiser(fundraiserData.data.fundraiserData);
  setTotalFundraiserSales(fundraiserData.data.totalFundraiserSales)
};

const myOrders = async () => {
  const myOrderData = await API.Orders.loggedInOrders(state.user.id);
  console.log(myOrderData);
  setOrders(myOrderData.data)
}

const getOrderDetails = async () => {
  const orderDetailsData = await API.OrderDetails.orderDetails(orderId);
  let orderId=order.id
  setOrder(orderDetailsData.data);
  console.log(orderDetailsData.data);
};

useEffect(() => {
  getCurrentundraiser();
  myOrders()
}, [])
const handleRowClick = async (i) => {
  setShowEdit(true);
  setOrderIndex(i);
  // <OrderDetailModal />
};

const expandRow = {
  renderer: row => (
    
    // <BootstrapTable 
    // keyField='id'
    // data={order}
    // columns={subColumns}
    // />

  )
};

  return (
    <Container fluid className="homeContainer">
   
      <div className="row my-2  text-center">
      <h2 className="col">Welcome to {fundraiser.name} Fundraiser </h2>
      </div>
      <div className="row my-2 text-center">
      <p className="col">{fundraiser.description} </p>
      </div>
      <div className="row my-2 text-center">
      <h5 className="col">Our goal is to raise ${fundraiser.goal} and so far we've raised ${totalFundraiserSales}</h5>
      </div>

      {/* <OrderDetailModal
       product={orders[orderIndex]}
       showEdit={showEdit}
       setShowEdit={setShowEdit}
     /> */}
    
      <BootstrapTable
        keyField='id'
        data={orders}
        columns={columns}
        expandRow={ expandRow }
        // defaultSorted={defaultSorted}
        noDataIndication='No products defined'
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
        // condensed
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
