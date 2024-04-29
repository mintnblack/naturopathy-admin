import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";


export default function TextEditorContainer(props) {

  const { blog, setBlog } = props;

  const editor = useRef(null);
  const [content, setContent] = useState();

  const config = useMemo(
    () => ({
        placeholder: 'Start typing...',
        readonly: false, 
    }),
    []
);

  return (
    <div>
        <JoditEditor
              ref={editor}
              value={blog ? blog : content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => {setContent(newContent); setBlog(newContent)}} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {setContent(newContent); setBlog(newContent)}}
            />
    </div>
  )
}
