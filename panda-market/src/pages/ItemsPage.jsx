import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts.js";
import ProductList from "../components/ProductList.jsx";
import Pagination from "../components/Pagination";

import "./ItemsPage.css";


const BEST_PRODUCTS_COUNT = 4;
const PRODUCTS_PER_PAGE = 12;


export default function ItemsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const { products, totalPages, loading } = useProducts(
    currentPage,
    PRODUCTS_PER_PAGE,
    keyword,
    sortBy
  );


  const { products: bestProducts, loading: bestLoading } = useProducts(
    1,
    BEST_PRODUCTS_COUNT, 
    "",
    "favorite"
  );
  
 

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleSortChange(e) {
    setSortBy(e.target.value);
    setCurrentPage(1);
  }

  function handleSearchChange(e) {
    setKeyword(e.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="items-page">
      <h2>베스트 상품</h2>
      {bestLoading ? <p>로딩 중...</p> : <ProductList products={bestProducts} />}

      <h2>판매 중인 상품</h2>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요"
          value={keyword}
          onChange={handleSearchChange}
          className="search-input"
        />
        <div className="filter-actions">
          <Link to="/registration" className="add-btn">상품 등록하기</Link>
          <select value={sortBy} onChange={handleSortChange} className="sort-select">
            <option value="latest">최신순</option>
            <option value="favorite">좋아요순</option>
          </select>
        </div>
      </div>

      {loading ? <p>로딩 중...</p> : <ProductList products={products} />}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}