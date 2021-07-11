import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import AddProductModal from './addProductModal';
import API from '../lib/API';
import EditProductModal from './editProductModal';
import { useStoreContext } from '../store/store';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

// Disabling filterFactory for now - not used
// import filterFactory, {
//   textFilter,
//   numberFilter,
// } from 'react-bootstrap-table2-filter';
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

  const [errorMsg, setErrorMsg] = useState(null);

  // react-bootstrap-table-next - lets set up our columns here

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

  const handleCellEdit = async (oldValue, newValue, row, column) => {
    const productObj = {
      name: row.name,
      description: row.description,
      price: row.price,
      active: row.active,
      FundraiserId: state.currentFundraiser.id,
    };
    setErrorMsg(null);

    try {
      const productData = await API.Products.updateOne(productObj, row.id);
      setErrorMsg('Product Updated');

      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
    } catch (err) {
      console.log(err);
      setErrorMsg(err.message);
    }
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

      {errorMsg && <p>{errorMsg}</p>}

      <BootstrapTable
        keyField='id'
        data={products}
        columns={columns}
        defaultSorted={defaultSorted}
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
        // condensed
        bootstrap4
        blurToSave
      />
    </Container>
  );
};

Products2Tab.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  price: PropTypes.number,
};

export default Products2Tab;
