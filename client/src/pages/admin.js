import React, { useState } from 'react';
import AdminNav from '../components/adminNav';
import { Container } from 'react-bootstrap';
import SalesPersonTab from '../components/salesPersonTab';
import OrdersTab from '../components/ordersTab';
import ProductsTab from '../components/productsTab';
import Products2Tab from '../components/products2Tab';
import FundraisersTab from '../components/fundraisersTab';

const Admin = (props) => {
  const [activeTab, setActiveTab] = useState('SALES_PERSON');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'SALES_PERSON':
        return <SalesPersonTab></SalesPersonTab>;
        break;

      case 'ORDERS':
        return <OrdersTab></OrdersTab>;

      case 'PRODUCTS':
        return <ProductsTab></ProductsTab>;

      case 'PRODUCTS2':
        return <Products2Tab></Products2Tab>;

      case 'FUNDRAISERS':
        return <FundraisersTab></FundraisersTab>;
    }
  };

  return (
    <Container>
      <div>
        <p>
          As an admin for your fundraiser, you have the ability to make updates
          to your fundraiser products, orders, etc. Here is a list of a few
          things you can do to make your fundraiser successfull.
          <ul>
            <li>Add New Sales People</li>
            <li>Add/Edit Fundraiser Products</li>
            <li>View/Add/Edit orders</li>
            <li>Track payment status of orders</li>
          </ul>
        </p>
      </div>
      <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>{renderActiveTab()}</div>
    </Container>
  );
};

export default Admin;
