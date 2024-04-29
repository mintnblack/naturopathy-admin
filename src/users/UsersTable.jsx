import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import ReactLoading from "react-loading";
import Design from "./Users.module.css";
import { SHOW_TOAST } from "../store/actions/toastAction";
import { SHOW_POPUP } from "../store/actions/popUpActions";
import { EditOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';

const UsersTable = (props) => {
  const navigate = useNavigate()
  const {
    confirmAction,
    action,
    openSnackbar,
    onOpenPopup,
    onCheckBulkDelete,
    tableLoading,
    availableClinics
  } = props;
  const { users } = props;
  console.log(users)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  

  const columns = [
    // {
    //   title: "#ID",
    //   dataIndex: "id",
    // },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps('email'),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      ...getColumnSearchProps('phone'),
      sorter: (a, b) => a.phone.length - b.phone.length,
      sortDirections: ['descend', 'ascend'],
    },
 
    // {
    //     title: "Edit",
    //     render: (record) => (
    //       <a href={`users/edit/${record.id}`} >
    //     <EditOutlined style={{color: "#000"}}/>
    //       </a>
    //     ),
    //   },
  ];
  

  const data = [];

  users.forEach((user) => {
   

    data.push({
      id: user.id,
      name: user.name,
      email: user.username,
      phone: user.phone,
    });
  });

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className={Design.userTableContainer}>
      <div>
         
        <div className={Design.slidingTable}>
          <Table
            columns={columns}
            dataSource={data}onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  navigate(`/users/appointment/${record.id}`); // Use the key or another unique identifier
                }
              };
            }}
          />
        </div>
      </div>

      {tableLoading ? (
        <div className={Design.appointmentTableLoading}>
          <div className={Design.loadingScreen}>
            <div className={Design.loadingContainer}>
              <ReactLoading
                type={"spinningBubbles"}
                color={"#5B5EDB"}
                height={150}
                width={150}
              />
              <h1>LOADING...</h1>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
    onOpenPopup: (showPopup, confirmAction, action) =>
      dispatch({ type: SHOW_POPUP, showPopup, confirmAction, action }),
  };
};

const mapStateToProps = (state) => {
  return {
    action: state.popupReducer.action,
    confirmAction: state.popupReducer.confirmAction,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);
