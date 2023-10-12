import "./Pagination.css";

function Pagination({ currentPage, totalPages, paginate }) {
  const pageNumbers = [];
  const maxPageButtons = 10;

  if (totalPages <= maxPageButtons) {
    // Display all page buttons if total pages are 10 or less
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    // Display a subset of page buttons
    if (currentPage <= Math.floor(maxPageButtons / 2)) {
      // If current page is near the beginning
      for (let i = 1; i <= maxPageButtons; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage >= totalPages - Math.floor(maxPageButtons / 2)) {
      // If current page is near the end
      for (let i = totalPages - maxPageButtons + 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Display current page in the middle
      const halfButtons = Math.floor(maxPageButtons / 2);
      for (
        let i = currentPage - halfButtons;
        i <= currentPage + halfButtons;
        i++
      ) {
        pageNumbers.push(i);
      }
    }
  }

  return (
    <div className="pagination">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <ul className="page-numbers">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
