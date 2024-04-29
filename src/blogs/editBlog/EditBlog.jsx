import axios from "axios";
import { connect } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import PrimaryBtn from "../../components/PrimaryBtn";
import TextEditorContainer from "../../components/TextEditorContainer";
import { BASE_URL } from "../../utils/constants/applicationConstants";
import Design from "../createBlog/CreateBlog.module.css";
import { SHOW_TOAST } from "../../store/actions/toastAction";
import { SNACKBAR_AUTO_HIDE_DURATION } from "../../utils/constants/constants";
import UploadDesign from "../BannerImage.module.css";
import addPhoto from "../../images/addPhoto.svg";
import { Switch } from "antd";

function EditBlog(props) {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [content, setContent] = useState();
  const [image, setImage] = useState();
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState();
  const [preview, setPreview] = useState();
  const [existingImage, setExistingImage] = useState();
  const placeholder = existingImage;
  const fileInputRef = useRef(null);

  let imgpth;
  let imgtag;
  let imageChange = 0;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/category/`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${BASE_URL}/blog/${blogId}`)
      .then((response) => {
        setTitle(response.data.data.title);
        setAuthor(response.data.data.author);
        setCategoryId(response.data.data.category_id);
        setCategoryName(response.data.data.category_name);
        setContent(response.data.data.html);
        setExistingImage(`${BASE_URL}/image/${response.data.data.image_path}`);
        setFeatured(response.data.data.featured);
        console.log("existingImage", existingImage);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onHandleValidation = () => {
    if (!title) {
      props.openSnackbar("Please enter title", "error", true);
      setLoading(false);
      return false;
    } else if (!author) {
      props.openSnackbar("Please enter author", "error", true);
      setLoading(false);
      return false;
    } else if (!categoryId && !categoryName) {
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

  const onSelectCategory = (event) => {
    const selectedId = event.target.value;
    const selectedIndex = event.target.selectedIndex;
    const selectedName = event.target.options[selectedIndex].text;

    setCategoryId(selectedId);
    setCategoryName(selectedName);
    console.log("categoryId", categoryId);
  };
  function extractTagFromUrl(url) {
    // Split the URL by '/'
    const parts = url.split("/");
    // Get the last part of the URL
    const lastSegment = parts.pop();
    // Split the last part by '.' to separate the tag from the file extension
    const tagWithExtension = lastSegment.split(".");
    // Return the first part which is the tag
    return tagWithExtension[0];
  }

  const imageUpload = async (image) => {
    if (!image) {
      console.error("No image file provided.");
      return false;
    }

    console.log(existingImage);
    const existingImagePth = extractTagFromUrl(existingImage);
    debugger;

    if (existingImagePth) {
      try {
        const deleteResponse = await axios.delete(`${BASE_URL}/image/${existingImagePth}`);
        if (deleteResponse.status !== 200) {
          console.error("Failed to delete the old image.");
          return false; // Stop the upload if deletion fails
        }
      } catch (err) {
        console.error("Error deleting the old image:", err);
        return false;
      }
    }

    // Proceed with uploading the new image
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

        // Assume these are global or component state variables
        imgpth = response.data.data.filename;
        imgtag = response.data.data.tag;

        setTimeout(() => {
          // Any follow-up action if needed
        }, SNACKBAR_AUTO_HIDE_DURATION);

        return true; // Successful upload
      } else {
        console.error("Failed to upload image. Status code:", response.status);
        return false; // Upload failed but no exception was thrown
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      return false; // Error occurred during upload
    }
  };

  const onSwitchChange = (checked) => {
    setFeatured(checked);
    console.log(`switch to ${checked}`);
  };

  const onFileChange = (event) => {
    imageChange = 0;
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

  const onUpdateBlog = async () => {
    setLoading(true);
    if (onHandleValidation()) {
      const ImageUpload = await imageUpload(image);
      if (!ImageUpload && imageChange == 1) {
        props.openSnackbar("Failed to upload image", "error", true);
        setLoading(false);
        return;
      }

      axios
        .put(`${BASE_URL}/blog/${blogId}`, {
          title: title,
          author: author,
          image_path: imgpth,
          image_tag: imgtag,
          html: content,
          category_id: categoryId,
          category_name: categoryName,
          featured: featured,
        })
        .then((response) => {
          if (response.status === 200) {
            props.openSnackbar("Blog successfully updated", "success", true);
            setLoading(false);
            setTimeout(() => {
              navigate("/blogs");
            }, SNACKBAR_AUTO_HIDE_DURATION);
          }
        })
        .catch((error) => {
          props.openSnackbar("Something went wrong", "error", true);
          setLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <div className={Design.CreateBlog}>
      <div className="headerSection">
        <Header title={"Edit Blog"} />
      </div>
      <div className="topMargin">
        <div className={Design.CreateBlogContent}>
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
          <h5>Title</h5>
          <div className="textInput">
            <input
              type="text"
              value={title}
              placeholder="Blog title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
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
              value={categoryId || "Select Category"}
              onChange={onSelectCategory}
              disabled={!categories.length}
            >
              <option value="Select Category" disabled>
                Select Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <h5>Set Featured</h5>
          <div className="textInput">
            {" "}
            <Switch checked={!!featured} onChange={onSwitchChange} />{" "}
          </div>
          <h5>Content</h5>
          <div>
            <TextEditorContainer
              blog={content}
              setBlog={(value) => setContent(value)}
            />
          </div>
          <span onClick={onUpdateBlog}>
            <PrimaryBtn title={"Update Blog"} loading={loading} />
          </span>
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

export default connect(null, mapDispatchToProps)(EditBlog);
