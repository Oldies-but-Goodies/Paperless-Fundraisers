import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import AddProductModal from './addProductModal';
import API from '../lib/API';
import { useStoreContext } from '../store/store';

const OrdersTab = () => {
  const [state, dispatch] = useStoreContext();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    const productData = await API.Products.getAllForFundraiser(
      state.currentFundraiser
    );
    setProducts(productData.data);
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleRowClick = async (productIdToEdit) => {
    const singleProductData = await API.Products.getOne(productIdToEdit);
    setProduct(singleProductData.data);
    console.log(productIdToEdit);
    console.table(product);
  };

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
            //
            // product.id corresponds to the row that is clicked on in the onClick we shall open the
            // edit product modal and prepopulate that with all the relevant data
            //
            <tr key={i} onClick={() => handleRowClick(product.id)}>
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
