import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import PrimaryBtn from "../../components/PrimaryBtn";
import TextEditorContainer from "../../components/TextEditorContainer";
import Design from "./CreateBlog.module.css";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import { SHOW_TOAST } from "../../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../../utils/constants/constants";
import bannerPlaceholder from "../../images/bannerPlaceholder.jpeg";
import addPhoto from "../../images/addPhoto.svg";
import UploadDesign from "../BannerImage.module.css";
import { Switch } from "antd";

function CreateBlog(props) {
  let imgpth;
  let imgtag;

  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [imagePath, setImagePath] = useState();
  const [imagetag, setImagetag] = useState();
  const [disableCategory, setdisableCategory] = useState(false);
  const [featured, setFeatured] = useState();
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState();
  const { existingImage, onImageSelected } = props;
  const placeholder = existingImage ? existingImage : bannerPlaceholder;
  const fileInputRef = useRef(null);

  const onHandleValidation = () => {
    if (!image) {
      props.openSnackbar("Please attach an image", "error", true);
      setLoading(false);
      return false;
    } else if (!title) {
      props.openSnackbar("Please enter title", "error", true);
      setLoading(false);
      return false;
    } else if (!author) {
      props.openSnackbar("Please enter author", "error", true);
      setLoading(false);
      return false;
    } else if (!categoryId || !categoryName) {
      props.openSnackbar("Please enter category", "error", true);
      setLoading(false);
      return false;
    } else if (
      !content ||
      content === "<p><br></p>" ||
      content === "<p></p>" ||
      content === "<p><br/></p>" ||
      content === "<p>&nbsp;</p>"
    ) {
      props.openSnackbar("Please enter content", "error", true);
      setLoading(false);
      return false;
    }
    return true;
  };

  const onSwitchChange = (checked) => {
    setFeatured(checked);
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreview(null);
    }
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/category/`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSelectCategory = (event) => {
    const selectedId = event.target.value;
    const selectedIndex = event.target.selectedIndex;
    const selectedName = event.target.options[selectedIndex].text;

    setCategoryId(selectedId);
    setCategoryName(selectedName);
  };

  const imageUpload = async (image) => {
    if (!image) {
      console.error("No image file provided.");
      return false;
    }

    const formData = new FormData();
    formData.append("file", image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/image/upload/`,
        formData,
        config
      );
      if (response.status === 200) {
        console.log("Image Uploaded successfully.", response);
        setImagePath(response.data.data.filename);
        imgpth = response.data.data.filename;
        setImagetag(response.data.data.tag);
        imgtag = response.data.data.tag;
        setTimeout(() => {
        
        }, SNACKBAR_AUTO_HIDE_DURATION);
        return true; 
      } else {
        props.openSnackbar(
          "Failed to upload Image. Please try again.",
          "error",
          true
        );
        console.log("Failed to upload image. Status code:", response.status);
        return false; 
      }
    } catch (err) {
      props.openSnackbar(
        "Failed to upload Image. Please try again.",
        "error",
        true
      );
      console.error("Error uploading image:", err);
      return false; 
    }
  };

  const onCreateBlog = async () => {
    setLoading(true);

    if (onHandleValidation()) {

      const ImageUpload = await imageUpload(image);
      if (!ImageUpload) {
        props.openSnackbar("Failed to upload image", "error", true);
        setLoading(false);
        return;
      }

      const data = {
        title: title,
        author: author,
        image_path: imgpth,
        image_tag: imgtag,
        html: content,
        category_id: categoryId,
        category_name: categoryName,
        featured: featured,
      };
      axios
        .post(`${BASE_URL}/blog/`, data)
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar("Blog successfully added", "success", true);
            setLoading(false);
            setTimeout(() => {
              navigate("/blogs");
            }, SNACKBAR_AUTO_HIDE_DURATION);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <div className={UploadDesign.CreateBlog}>
      <div className="headerSection">
        <Header title={"Create Blog"} />
      </div>
      <div className="topMargin">
        <div className={UploadDesign.CreateBlogContent}>
          <h5>Banner Image</h5>
         

          <div className={UploadDesign.editPhoto}>
            <div className={UploadDesign.uploadedImageSection}>
              <div className={UploadDesign.uploadImage}>
                <img src={preview || placeholder} alt="banner" />
              </div>
              <div
                className={UploadDesign.photoEditBtn}
                onClick={() => fileInputRef.current.click()}
              >
                <img src={addPhoto} alt="Add Photo" />
                <p className={UploadDesign.addPhotoText}>Place Image</p>
              </div>
            </div>
            <input
              required
              accept=".png, .jpg, .jpeg"
              type="file"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={onFileChange}
            />
          </div>

          {/* <button onClick={imageUpload(image)}>add img</button> */}

          <h5>Title</h5>
          <div className="textInput">
            <input
              type="text"
              placeholder="Blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <h5>Author</h5>
          <div className="textInput">
            <input
              type="text"
              value={author}
              placeholder="Author's name"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <h5>Category</h5>
          <div className="textInput">
            <select
              id="categoryList"
              className={Design.selectorInput}
              onChange={onSelectCategory}
            >
              <option value={"Select Category"} disabled={disableCategory}>
                Select Category
              </option>
              {categories.map((category) => {
                return <option value={category.id}>{category.name}</option>;
              })}
            </select>
          </div>

          <h5>Set Featured</h5>
          <div className="textInput">
            {" "}
            <Switch onChange={onSwitchChange} />
          </div>
          <h5>Content</h5>
          <div>
            <TextEditorContainer setBlog={(value) => setContent(value)} />
          </div>
          <div className="mt">
            <span onClick={onCreateBlog}>
              <PrimaryBtn title={"Create"} loading={loading} />
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

export default connect(null, mapDispatchToProps)(CreateBlog);
