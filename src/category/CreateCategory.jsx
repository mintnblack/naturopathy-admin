import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import Design from "../products/Products.module.css";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../utils/constants/constants";

function CreateCategory(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  

  const [loading, setLoading] = useState(false);

  const onHandleValidation = () => {
    if (!title) {
      props.openSnackbar("Please enter title", "error", true);
      setLoading(false);
      return false;
    } 
    return true;
  };

  const onCreateCategory = () => {
    setLoading(true);
    if (onHandleValidation()) {
      axios
        .post(`${BASE_URL}/category/`, {
          name: title,
        })
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar("Category successfully added", "success", true);
            setLoading(false);
            setTimeout(() => {
              navigate("/category");
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
        <Header title={"Create Category"} />
      </div>
      <div className="topMargin">
        <div className={Design.CreateBlogContent}>
          <h5>Title</h5>
          <div className="textInput">
            <input
              value={title}
              type="text"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          
         


          <div>
           
          </div>
          <div className="mt">
          <span onClick={onCreateCategory}>
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

export default connect(null, mapDispatchToProps)(CreateCategory);
