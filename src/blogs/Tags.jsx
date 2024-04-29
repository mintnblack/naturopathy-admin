import React, { useEffect, useRef, useState } from "react";
import { Space, Input, Tag, Tooltip } from "antd";

const Tags = (props) => {
  const { tagsData } = props;

  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    setTags(tagsData)
  }, [tagsData])
  
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    props.onGetTags(newTags);
    setTags(newTags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = (e) => {
    e.preventDefault();
    if (inputValue && tags) {
      if(tags?.indexOf(inputValue) === -1){
        setTags([...tags, inputValue]);
      }
    }else if(inputValue){
      setTags([inputValue]);
    }
    props.onGetTags(tags);
    setInputVisible(false);
    setInputValue("");
  };

  const tagInputStyle = {
    width: 64,
    height: 22,
    marginInlineEnd: 8,
    verticalAlign: "top",
  };
 
  return (
    <div>
      <Space size={[0, 8]} wrap  style={{"marginBottom": "22px"}}>
        <Space size={[0, 8]} wrap>
          {tags?.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={tag}
                  size="small"
                  style={tagInputStyle}
                  value={editInputValue}
                />
              );
            }
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                key={tag}
                closable
                style={{
                  userSelect: "none",
                }}
                onClose={() => handleClose(tag)}
              >
                <span
                  onDoubleClick={(e) => {
                    if (index !== 0) {
                      setEditInputIndex(index);
                      setEditInputValue(tag);
                      e.preventDefault();
                    }
                  }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
        </Space>
      </Space>

      <div className="textInput" style={{"marginBottom": "22px"}}>
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          placeholder="Add Tags"
        />
      </div>
    </div>
  );
};
export default Tags;
