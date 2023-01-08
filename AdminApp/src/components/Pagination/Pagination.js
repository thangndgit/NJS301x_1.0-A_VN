import { useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import "./Pagination.css";

const Pagination = ({ onFetch }) => {
  // Current page state
  const pageSize = 8;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [itemCount, setItemCount] = useState(0);

  // Fetch data when page change
  useEffect(() => {
    console.log("run");
    onFetch(page, (data) => {
      setPage(data.page);
      setPageCount(data.page_count);
      setItemCount(data.item_count);
    });
  }, [onFetch, page]);

  // Handle when click next page
  const handleNextPage = () => {
    if (page >= pageCount) return;
    setPage(page + 1);
  };

  // Handle when click prev page
  const handlePrevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  return (
    <div className="pagination">
      {itemCount ? (
        <>
          <span className="infoPage">
            {page * pageSize - pageSize + 1}-
            {Math.min(page * pageSize, itemCount)} of {itemCount}
          </span>
          <span className="prevPage" onClick={handlePrevPage}>
            <RiArrowLeftSLine />
          </span>
          <span className="nextPage" onClick={handleNextPage}>
            <RiArrowRightSLine />
          </span>
        </>
      ) : (
        <>No document found</>
      )}
    </div>
  );
};

export default Pagination;
