import React from "react";
import {useEffect, useState} from "react";
import Pagination from "@mui/material/Pagination";
import Design from "./BasicPagination.module.css";

export default function BasicPagination(props) {
  const { totalPages, page, tabIndex } = props;
  const [currentPage, setCurrentPage] = useState(1);
  let inputValue;
  
  const selectedPageNumber = (value) => {
    inputValue = value;
    let pageNumber = parseInt(value);
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    if(isNaN(currentPage)){
      setCurrentPage(1);
    }
    if(currentPage > totalPages){
      setCurrentPage(totalPages);
    }
    page(currentPage)
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(1);
  }, [tabIndex])
  
  

  return (
    <div className={Design.paginationContainer}>
      <Pagination count={totalPages} size="small" page={currentPage} onChange={(event, pageNumber)=> setCurrentPage(pageNumber)}/>
      <div className={Design.defaultPage}>
        <label className={Design.gotoPageLabel} htmlFor="page">
          Goto Page
        </label>
        <div className="textInput" style={{ width: "50px" }}>
          <input id="page" type="number" autoFocus={true} value={inputValue} onChange={(event)=> selectedPageNumber(event.target.value)} />
        </div>
      </div>
    </div>
  );
}