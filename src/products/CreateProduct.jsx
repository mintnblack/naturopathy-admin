import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import Design from "./Products.module.css";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";
import { websiteLinkValidator } from "../utils/functions/validators";
function CreateProduct(props) {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [url, setURL] = useState();

  const [loading, setLoading] = useState(false);

  const onHandleValidation = () => {
    if (!productName) {
      props.openSnackbar("Please enter Product Name", "error", true);
      setLoading(false);
      return false;
    } else if (!url) {
      props.openSnackbar("Please enter Product URL", "error", true);
      setLoading(false);
      return false;
    } else if (!websiteLinkValidator(url)) {
      props.openSnackbar("Please enter valid Product URL", "error", true);
      setLoading(false);
      return false;
    }
    return true;
  };

  const onCreateProduct = () => {
    setLoading(true);
    if (onHandleValidation()) {
      axios
        .post(`${BASE_URL}/product/`, {
          name: productName,
          url: url,
        })
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar("Product successfully added", "success", true);
            setLoading(false);
            setTimeout(() => {
              navigate("/product");
            }, SNACKBAR_AUTO_HIDE_DURATION);
          }
        })
        .catch((error) => {
          setLoading(false);
          props.openSnackbar("Something went wrong", "error", true);
          console.log(error);
        });
    }
  };

  return (
    <div>
      <div className="headerSection">
        <Header title={"Create Product"} />
      </div>
      <div className="topMargin">
        <div className={Design.CreateBlogContent}>
          <h5>Product Name</h5>
          <div className="textInput">
            <input
              value={productName}
              type="text"
              placeholder="Title"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </div>
          <h5>URL</h5>
          <div className="textInput">
            <input
              value={url}
              type="text"
              rows={10}
              placeholder="URL"
              onChange={(e) => {
                setURL(e.target.value);
              }}
            />
          </div>

          <div></div>
          <div className="mt">
          <span onClick={onCreateProduct}>
            <PrimaryBtn title={"Add"} loading={loading} />
          </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(null, mapDispatchToProps)(CreateProduct);
