import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import AddProductModal from './addProductModal';
import API from '../lib/API';
import EditProductModal from './editProductModal';
import { useStoreContext } from '../store/store';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory, {
  textFilter,
  numberFilter,
} from 'react-bootstrap-table2-filter';
import PropTypes from 'prop-types';

const Products2Tab = () => {
  const [state, dispatch] = useStoreContext();
  const [products, setProducts] = useState([
    { name: '', price: '', description: '', active: '' },
  ]);
  const [product, setProduct] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [toggleRender, setToggleRender] = useState(false);

  const [productIndex, setProductIndex] = useState(0);

  const columns = [
    {
      dataField: 'id',
      text: 'Product ID',
      sort: true,
      type: 'number',
      // filter: numberFilter(),
    },
    {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
      validator: (newValue, row, column) => {
        if (newValue.length === 0) {
          return {
            valid: false,
            message: 'Must have a Product Name',
          };
        }
      },
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: true,
    },
    {
      dataField: 'price',
      text: 'Product Price',
      sort: true,
      type: 'number',
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: 'Price should be numeric',
          };
        }
      },

      // filter: numberFilter(),
    },
    {
      dataField: 'active',
      text: 'Active/Hidden',
      sort: true,
    },
  ];

  const defaultSorted = [
    {
      dataField: 'name',
      order: 'desc',
      type: 'number',
    },
  ];

  // const cellEdit = {
  //   afterSaveCell: (oldValue, newValue, row, column) => {
  //     console.log(oldValue, newValue, row, column);
  //   },
  // };

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
      {/* https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/basic-celledit.html */}
      <BootstrapTable
        keyField='id'
        data={products}
        columns={columns}
        defaultSorted={defaultSorted}
        noDataIndication='No products defined'
        cellEdit={cellEditFactory({ mode: 'click' })}
        // afterSaveCell={cellEdit.afterSaveCell()}
        // filter={filterFactory()}
        striped
        hover
        condensed
        bootstrap4
      />
      {/* <Table striped bordered hover className='mt-3'>
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
      </Table> */}
    </Container>
  );
};

Products2Tab.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  price: PropTypes.number,
};

export default Products2Tab;
