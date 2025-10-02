import "./Pagination.css";

/**
 * 페이지네이션 컴포넌트
 * @param {Object} props
 * @param {number} props.currentPage - 현재 페이지
 * @param {number} props.totalPages - 전체 페이지 수
 * @param {function} props.onPageChange - 페이지 변경 핸들러
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;


  const visiblePages = 5;
  const half = Math.floor(visiblePages / 2);

  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + visiblePages - 1);


  if (end - start < visiblePages - 1) {
    start = Math.max(1, end - visiblePages + 1);
  }

  const pageNumbers = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="pagination">
      {/* 이전 버튼 */}
      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
      >
        &lt;
      </button>

      {/* 페이지 번호 */}
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`page-btn ${currentPage === num ? "active" : ""}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        className="page-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
      >
        &gt;
      </button>
    </div>
  );
}
