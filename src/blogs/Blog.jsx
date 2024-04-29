import React from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Card } from "antd";
import Design from "./Blogs.module.css";
import { UserOutlined } from '@ant-design/icons';
import deleteIcon from "../images/delete.svg";
import editIcon from "../images/edit.svg";
import { SHOW_POPUP } from "../store/actions/popUpActions";
import { BASE_URL } from "../utils/constants/applicationConstants";

const { Meta } = Card;

function Blog(props) {
  const navigate = useNavigate();
  const { blog, onOpenPopup } = props;

  const deleteBlog = () => {
    onOpenPopup(true, false, blog.id, "delete");
  };

  const editBlog = () => {
    navigate(`/edit/blog/${blog.id}`);
  };

  return (
    <div className={Design.card}>
      <Card
        style={{
          width: "100%",
        }}
        cover={
          <NavLink to={`/view/blog/${blog.id}`}>
            <img
              width={"99%"}
              height={150}
              style={{ objectFit: "cover", margin: "2px" }}
              alt="example"
              src={`${BASE_URL}/image/${blog.image_path}`}
            />
          </NavLink>
        }
        actions={[
          <img
            src={deleteIcon}
            alt="delete"
            key={"delete"}
            onClick={deleteBlog}
          />,
          <img src={editIcon} alt="edit" key={"edit"} onClick={editBlog} />,
        ]}
      >
        <NavLink to={`/view/blog/${blog.id}`}>
          <Meta
            title={blog.title}
            description={blog.desc}
          />
        </NavLink>
      </Card>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenPopup: (showPopup, confirmAction, userId, action) =>
      dispatch({ type: SHOW_POPUP, showPopup, confirmAction, userId, action }),
  };
};

export default connect(null, mapDispatchToProps)(Blog);