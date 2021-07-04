import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import AddProductModal from './addProductModal';
import API from '../lib/API';
import EditProductModal from './editProductModal';
import { useStoreContext } from '../store/store';
import BootstrapTable from 'react-bootstrap-table-next';

const ProductsTab = () => {
  const [state, dispatch] = useStoreContext();
  const [products, setProducts] = useState([
    { name: '', price: '', description: '', active: '' },
  ]);
  const [product, setProduct] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [toggleRender, setToggleRender] = useState(false);

  const [productIndex, setProductIndex] = useState(0);

  const getProductData = async () => {
    const productData = await API.Products.getAdminAllForFundraiser(
      state.currentFundraiser
    );
    setProducts(productData.data);
  };

  useEffect(() => {
    getProductData();
  }, [toggleRender]);

  const handleRowClick = async (i) => {
    setShowEdit(true);
    setProductIndex(i);
  };

  return (
    <Container>
      <Button
        variant='primary'
        className='my-2'
        onClick={() => setShowAdd(true)}
      >
        Add Product
      </Button>
      <AddProductModal
        toggleRender={toggleRender}
        setToggleRender={setToggleRender}
        showAdd={showAdd}
        setShowAdd={setShowAdd}
      />
      <EditProductModal
        product={products[productIndex]}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
      />
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
            <tr key={i} onClick={() => handleRowClick(i)}>
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

export default ProductsTab;
