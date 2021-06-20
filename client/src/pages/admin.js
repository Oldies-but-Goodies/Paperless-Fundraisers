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
