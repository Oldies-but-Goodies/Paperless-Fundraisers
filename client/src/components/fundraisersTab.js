import React, { useState, useEffect } from 'react';
import {  Container } from 'react-bootstrap';
import AddFundraiserModal from './addFundraiserModal';
import API from '../lib/API';
import { useStoreContext } from '../store/store';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

const FundraisersTab = () => {
  const [state, dispatch] = useStoreContext();

  const [fundraisers, setFundraisers] = useState([]);
  const [toggleRender, setToggleRender] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);


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

  const getFundraiserData = async () => {
    const fundraiserData = await API.Fundraisers.getFundraisers();
    setFundraisers(fundraiserData.data);
  };

  useEffect(() => {
    getFundraiserData();
  }, [toggleRender]);

  const handleCellEdit = async (oldValue, newValue, row, column) => {
    const fundraiserObj = {
      id: row.id,
      name: row.name,
      description: row.description,
      goal: row.goal,
      start: row.start,
      end: row.end,
    };
    setErrorMsg(null);

    try {
      const productData = await API.Fundraisers.updateFundraiser(fundraiserObj);
      setErrorMsg('Fundraiser Updated');

      setTimeout(() => {
        setErrorMsg(null);
      }, 3000);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  

  return (
    <Container>
      <AddFundraiserModal
        toggleRender={toggleRender}
        setToggleRender={setToggleRender}
      ></AddFundraiserModal>

      <BootstrapTable
        keyField='id'
        data={fundraisers}
        columns={columns}
        defaultSorted={defaultSorted}
        noDataIndication='No Fundraisers Found'
        cellEdit={cellEditFactory({
          mode: 'click',
          afterSaveCell: (oldValue, newValue, row, column) => {
            handleCellEdit(oldValue, newValue, row, column);
          },
        })}
        striped
        hover
        bootstrap4
        condensed
      />
    </Container>
  );
};

export default FundraisersTab;
