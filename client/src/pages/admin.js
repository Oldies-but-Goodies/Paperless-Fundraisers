import React, { Component, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import AdminNav from "../components/adminNav";
import { Container } from "react-bootstrap";
import SalesPersonTab from "../components/salesPersonTab";
import OrdersTab from "../components/ordersTab";
import ProductsTab from "../components/productsTab";

const Admin = (props) => {

  const [activeTab, setActiveTab] = useState("SALES_PERSON");

  return (
    <Container>
      <div>
        <p>As an admin for your fundraiser, you have the ability to make updates 
          to your fundraiser products, orders, etc.  Here is a list of a few things you 
          can do to make your fundraiser successfull.
          <ul>
            <li>Add New Sales People</li>
            <li>Add/Edit Fundraiser Products</li>
            <li>View/Add/Edit orders</li>
            <li>Track payment status of orders</li>
          </ul>
        </p>
      </div>
      <AdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
       
        {activeTab === "SALES_PERSON" ?
          <SalesPersonTab>
            
          </SalesPersonTab> : activeTab === "PRODUCTS" ?
          <div>
            <ProductsTab>
              
            </ProductsTab>
          </div> :
          <div>
            <OrdersTab>

            </OrdersTab>
          </div>
        }
      </div>
    </Container>
  );
};

export default Admin;
