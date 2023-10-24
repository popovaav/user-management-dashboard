import { Dispatch, SetStateAction } from 'react';

interface Pagination {
  totalItems: number;
  itemsPerPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  page,
  setPage,
}: Pagination) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <div className="flex gap-x-3 font-bold">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          aria-disabled={page === 1}
          className="aria-disabled:text-slate-400 aria-disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          aria-disabled={page === totalPages}
          className="aria-disabled:text-slate-400 aria-disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
