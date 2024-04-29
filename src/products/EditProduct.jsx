import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import Design from "./Products.module.css";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../store/actions/toastAction";
import { websiteLinkValidator } from "../utils/functions/validators";

function EditProduct(props) {
  const { id: productId } = useParams();
  console.log(productId);
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [url, setURL] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/product/${productId}`)
      .then((response) => {
        console.log(response);
        setProductName(response.data.data.name);
        setURL(response.data.data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onHandleValidation = () => {
    if (!productName) {
      props.openSnackbar("Please enter Product Name", "error", true);
      setLoading(false);
      return false;
    } else if (!url) {
      props.openSnackbar("Please enter Url", "error", true);
      setLoading(false);
      return false;
    }else if (!websiteLinkValidator(url)) {
      props.openSnackbar("Please enter valid Product URL", "error", true);
      setLoading(false);
      return false;
    }
    return true;
  };

  const onUpdateProduct = () => {
    setLoading(true);
    if (onHandleValidation()) {
      axios
        .put(`${BASE_URL}/product/${productId}`, {
          name: productName,
          url: url,
        })
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar(
              "Product Updated successfully",
              "success",
              true
            );
            setLoading(false);
            setTimeout(() => {
              navigate("/product");
            }, 1000);
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
        <Header title={"Update Product"} />
      </div>
      <div className="topMargin">
        <div className={Design.CreateBlogContent}>
          <h5>Product Name</h5>
          <div className="textInput">
            <input
              value={productName}
              type="text"
              placeholder=""
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
              placeholder=""
              onChange={(e) => {
                setURL(e.target.value);
              }}
            />
          </div>
          <div className="mt">
          <span onClick={onUpdateProduct}>
            <PrimaryBtn title={"Update"} loading={loading} />
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

export default connect(null, mapDispatchToProps)(EditProduct);
