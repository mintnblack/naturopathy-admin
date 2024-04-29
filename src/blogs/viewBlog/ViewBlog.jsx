import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatDateToDDMMYY } from "../../utils/functions/convertors";
import Design from "./ViewBlog.module.css";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import LoadingScreen from "../../components/LoadingScreen";
import { LOADING_SCREEN } from "../../utils/constants/constants";

export default function ViewBlog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    const content = document.getElementById("content");

    axios
      .get(`${BASE_URL}/blog/${blogId}`)
      .then((response) => {
        setBlog(response.data.data);
        if (content) {
          content.innerHTML = response.data.data.html;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const date = formatDateToDDMMYY(blog.updated);

  setTimeout(() => {
    setLoadingScreen(false);
  }, LOADING_SCREEN);

  return (
    <div>
      {loadingScreen ? (
        <LoadingScreen />
      ) : (
        <div className={Design.marginBottom}>
          <div className={Design.container}>
            <div className={Design.dateAndAuthor}>
              <span>
                {date.day} {date.shortMonthName}, {date.year}
              </span>
              <span className={Design.verticalLine}>|</span>
              <span>{blog.author}</span>
            </div>
            <h1>{blog.title}</h1>

            <div className={Design.shortDescription}>{blog.content}</div>
          </div>
          <img
            className={Design.bannerImage}
            src={`${BASE_URL}/image/${blog.image_path}`}
            alt="banner"
          ></img>
          <div className={Design.container}>
            <div
              id="content"
              className={Design.htmlText}
              dangerouslySetInnerHTML={{ __html: blog ? blog.html : "" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
