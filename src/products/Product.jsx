import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import Design from "./Products.module.css";
import { BASE_URL } from "../utils/constants/applicationConstants";
import {
  LOADING_SCREEN,
  SNACKBAR_AUTO_HIDE_DURATION,
} from "../utils/constants/constants";
import { SHOW_POPUP } from "../store/actions/popUpActions";

import { SHOW_TOAST } from "../store/actions/toastAction";
import LoadingScreen from "../components/LoadingScreen";
import EmptyProduct from "./EmptyProduct";
import editIcon from "../images/edit.svg";
import deleteIcon from "../images/delete.svg";

function Product(props) {
  const { confirmAction, action, userId } = props;
  const [ product, setProduct] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const navigate = useNavigate();

  const confirmDeleteProduct = (ProductId) => {
    props.onOpenPopup(true, false, ProductId, "delete");
  };
  const onEditProduct = () =>{
    navigate(`/product/create`)
  }
  

  useEffect(() => {
    axios
      .get(`${BASE_URL}/product/`)
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (props.confirmAction && props.action === "delete") {
      axios
        .delete(`${BASE_URL}/product/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar(
              "Product successfully deleted",
              "success",
              true
            );
            setTimeout(() => {
              window.location.reload();
            }, SNACKBAR_AUTO_HIDE_DURATION);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [confirmAction, action, userId]);

  setTimeout(() => {
    setLoadingScreen(false);
  }, LOADING_SCREEN);

  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="headerSection">
            <Header title={"Product"} />
            <span className={Design.headerBtn}>
              <NavLink to="/product/create">
                <PrimaryBtn title={"+ Create New"} />
              </NavLink>
            </span>
          </div>

          <div className="topMargin">
            <div className="container">
              <div
                style={{
                  display: product.length === 0 ? "none" : "block",
                }}
              >
                <div >
                  {product?.map((product) => {
                    return (

                      <div className={Design.courseContainer}>
                        
                          <div>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                          </div>
                         
                        <div className={Design.courseInfoManageBtnsContainer}>
                          <span onClick={() => confirmDeleteProduct(product.id)}>
                            <img width={20} src={deleteIcon} alt="delete" key={"delete"} />
                          </span>
                          <NavLink to={`/product/edit/${product.id}`} className={Design.navlink}>
                          <span>
                            <img width={20} src={editIcon} alt="edit" key={"edit"} />
                          </span>
                          </NavLink>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                style={{
                  display: product.length === 0 ? "block" : "none",
                }}
              >
                <EmptyProduct />
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.popupReducer.userId,
    action: state.popupReducer.action,
    confirmAction: state.popupReducer.confirmAction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenPopup: (showPopup, confirmAction, userId, action) => {
      dispatch({ type: SHOW_POPUP, showPopup, confirmAction, userId, action });
    },
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
