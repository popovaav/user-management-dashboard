import PaginationButton from './PaginationButton';

interface Pagination {
  totalItems: number;
  itemsPerPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  page,
  setPage,
}: Pagination) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isShowButton = totalPages !== 1 && totalPages !== 0;

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="flex gap-x-3 font-bold absolute bottom-10 items-center place-self-end">
      {isShowButton && (
        <PaginationButton onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </PaginationButton>
      )}
      <p className="text-black font-medium text-sm">{`Page ${page} of ${
        totalPages || 1
      }`}</p>
      {isShowButton && (
        <PaginationButton
          onClick={handleNextPage}
          disabled={page >= totalPages}
        >
          Next
        </PaginationButton>
      )}
    </div>
  );
};

export default Pagination;
