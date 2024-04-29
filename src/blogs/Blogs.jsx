import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import PrimaryBtn from "../components/PrimaryBtn";
import Blog from "./Blog";
import Design from "./Blogs.module.css";
import {
  LOADING_SCREEN,
  SNACKBAR_AUTO_HIDE_DURATION,
} from "../utils/constants/constants";
import { BASE_URL } from "../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../store/actions/toastAction";
import LoadingScreen from "../components/LoadingScreen";
import EmptyBlog from "./EmptyBlog";

function Blogs(props) {
  const { confirmAction, action, userId } = props;
  const [blogsList, setBlogsList] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    if (props.confirmAction && props.action === "delete") {
      axios
        .delete(`${BASE_URL}/blog/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar("Blog successfully deleted", "success", true);
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

  useEffect(() => {
    axios
      .get(`${BASE_URL}/blog/`)
      .then((response) => {
        setBlogsList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const blogs = blogsList.map((blog) => {
    return (
      <div className={Design.col} key={blog.id}>
        <Blog blog={blog} />
      </div>
    );
  });

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
            <Header title={"Blogs"} />
            <span className={Design.headerBtn}>
              <NavLink to="/create/blog">
                <PrimaryBtn title={"+ Create New"} />
              </NavLink>
            </span>
          </div>
          {/* <p>Your articles are listed here</p> */}

          <div className="topMargin">
            <div className="container">
              <div
                style={{ display: blogsList.length === 0 ? "none" : "block" }}
              >
                <div className={Design.row}>{blogs}</div>
              </div>
              <div style={{ display: blogsList.length === 0 ? "block" : "none" }}>
                <EmptyBlog />
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
    openSnackbar: (message, severity, open) =>
      dispatch({ type: SHOW_TOAST, message, severity, open }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
