import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import AddProductModal from './addProductModal';
import API from '../lib/API';
import { useStoreContext } from '../store/store';

const OrdersTab = () => {
  const [state, dispatch] = useStoreContext();
  const [products, setProducts] = useState([]);

  const getProductData = async () => {
    console.log(state.currentFundraiser);
    const productData = await API.Products.getAllForFundraiser(
      state.currentFundraiser
    );
    console.log(productData);
    setProducts(productData.data);
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Container>
      <AddProductModal></AddProductModal>
      <Table striped bordered hover className='mt-3'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price </th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr key={i}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>{product.active ? 'ACTIVE' : 'HIDDEN'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrdersTab;
