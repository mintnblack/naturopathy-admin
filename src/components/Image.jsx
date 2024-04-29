import React from "react";
import { useEffect, useState } from "react";

import Avatar from '@mui/material/Avatar';

function Image(props) {
  const { url, size } = props;
  const [image, setImage] = useState("");

  const style = {
    width: size ?? "40px",
    height: size ?? "40px",
  }

  return (
    <Avatar src={image} sx={style}/>
  );
}

export default Image;