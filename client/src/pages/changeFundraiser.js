import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
// import AddFundraiserModal from './addFundraiserModal';
import API from '../lib/API';
import { useStoreContext } from '../store/store';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import { SET_FUNDRAISERS } from '../store/actions';

const ChangeFundraiser = () => {
  const [state, dispatch] = useStoreContext();
  const history = useHistory();

  const [fundraisers, setFundraisers] = useState([]);
  const [toggleRender, setToggleRender] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // react-bootstrap-table-next - lets setup our columns here

  console.log(
    'the current selected fundraiser is ' + state.currentFundraiser.id
  );

  const columns = [
    {
      dataField: 'id',
      text: 'Fundraiser ID',
      sort: true,
      type: 'number',
    },
    {
      dataField: 'name',
      text: 'Fundraiser Name',
      sort: true,
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: true,
    },
    {
      dataField: 'goal',
      text: 'Goal',
      sort: true,
      type: Number,
    },
    {
      dataField: 'start',
      text: 'Start Date',
      sort: true,
      type: 'date',
      formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== 'object') {
          dateObj = new Date(cell);
        }
        return `${('0' + dateObj.getUTCDate()).slice(-2)}/${(
          '0' +
          (dateObj.getUTCMonth() + 1)
        ).slice(-2)}/${dateObj.getUTCFullYear()}`;
      },
      editor: {
        type: Type.DATE,
      },
    },
    {
      dataField: 'end',
      text: 'End Date',
      sort: true,
      formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== 'object') {
          dateObj = new Date(cell);
        }
        return `${('0' + dateObj.getUTCDate()).slice(-2)}/${(
          '0' +
          (dateObj.getUTCMonth() + 1)
        ).slice(-2)}/${dateObj.getUTCFullYear()}`;
      },
      editor: {
        type: Type.DATE,
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: 'name',
      order: 'desc',
    },
  ];

  const getMyFundraiserData = async () => {
    const fundraiserData = await API.Fundraisers.getMyFundraisers();
    setFundraisers(fundraiserData.data.Fundraisers);
  };

  useEffect(() => {
    getMyFundraiserData();
  }, [toggleRender]);

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${rowIndex}`);
      console.table(row);
      console.log('switching to fundraiser ' + row.id);
      const fundraiserObj = {
        id: row.id,
        adminLevel: row.userFundraiser.admin_level,
      };

      dispatch({ type: SET_FUNDRAISERS, fundraiser: fundraiserObj });
      history.push('/');
      //   state.currentFundraiser
    },
  };

  // setToggleRender(!toggleRender);

  return (
    <Container>
      {/* <AddFundraiserModal
        toggleRender={toggleRender}
        setToggleRender={setToggleRender}
      ></AddFundraiserModal> */}

      <BootstrapTable
        keyField='id'
        data={fundraisers}
        columns={columns}
        rowEvents={rowEvents}
        defaultSorted={defaultSorted}
        noDataIndication='No Fundraisers Found'
        // cellEdit={cellEditFactory({
        //   mode: 'click',
        //   afterSaveCell: (oldValue, newValue, row, column) => {
        //     handleCellEdit(oldValue, newValue, row, column);
        //   },
        // })}
        striped
        hover
        bootstrap4
        condensed
      />
    </Container>
  );
};

export default ChangeFundraiser;
