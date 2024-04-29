import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import { Table } from 'antd';
import { SHOW_TOAST } from "../../store/actions/toastAction";
import Header from "../../components/Header";

function AppointmentDetails({ openSnackbar }) {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/prescription/${id}`)
      .then((res) => {
        if (res.data.code === 200) {
          setPrescription(res.data.data);
        } else {
          openSnackbar(res.data.message, "error", true);
        }
      })
      .catch((err) => {
        console.log(err);
        openSnackbar("Failed to fetch prescription details.", "error", true);
      });
  }, [id, openSnackbar]);

  if (!prescription) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Dosage',
      dataIndex: 'dosage',
      key: 'dosage',
    }
  ];

  return (
    <div>
      <div>
          <Header title={"Notes"} />
        </div>
      <p>{prescription.notes}</p>
      <br></br>
      <div>
          <Header title={"Prescription"} />
        </div>
      <Table columns={columns} dataSource={prescription.products} rowKey="name" />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(null, mapDispatchToProps)(AppointmentDetails);
