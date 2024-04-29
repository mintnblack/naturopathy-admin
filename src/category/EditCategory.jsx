import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import Design from "../products/Products.module.css";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../store/actions/toastAction";

function EditCategory(props) {
  const { id: categoryId } = useParams();
console.log(categoryId)
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/category/${categoryId}`)
      .then((response) => {
        console.log(response)
        setName(response.data.data.name);
        setDescription(response.data.data.description);
       
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onHandleValidation = () => {
    if (!name) {
        props.openSnackbar("Please enter title", "error", true);
        setLoading(false);
        return false;
      } 
      return true;
  };

  const onUpdateCategory = () => {
    setLoading(true);
    if (onHandleValidation()) {
      axios
        .put(`${BASE_URL}/category/${categoryId}`, {
          name: name,
          description: description,
         

        })
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar(
              "Category Updated successfully",
              "success",
              true
            );
            setLoading(false);
            setTimeout(() => {
              navigate("/category");
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
        <Header title={"Update Course"} />
      </div>
      <div className="topMargin">
        <div className={Design.CreateBlogContent}>
        <h5>Title</h5>
          <div className="textInput">
            <input
              value={name}
              type="text"
              placeholder="Title"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        
          <div className="mt">
          <span onClick={onUpdateCategory}>
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

export default connect(null, mapDispatchToProps)(EditCategory);
