import Pagination from "react-bootstrap/Pagination";

type Props = {
  currentPage :number;
  totalPages: number;
  goToPage : (value : number ) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
};

function TablePagination(props: Props) {
  const { totalPages, goToPage,currentPage,onPrevPage, onNextPage } = props;
  const totalPagesArray = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  return (
    <Pagination>
      <Pagination.First  onClick={() => {goToPage(1)}} disabled={isFirstPage} />
      <Pagination.Prev onClick={onPrevPage} disabled={isFirstPage}/>
      {totalPagesArray.map((page) => {
        return <Pagination.Item active={page===currentPage} onClick={() => {goToPage(page)}}>{page}</Pagination.Item>;
      })}
      <Pagination.Next onClick={onNextPage} disabled={isLastPage}/>
      <Pagination.Last  onClick={() => {goToPage(totalPages)}}  disabled={isLastPage}/>
    </Pagination>
  );
}

export default TablePagination;
