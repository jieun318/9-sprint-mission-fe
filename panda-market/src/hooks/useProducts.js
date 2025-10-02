import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../api/productService"; 

export function useProducts(page, pageSize, keyword, sortBy) {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts({ 
        offset: (page - 1) * pageSize,
        limit: pageSize,
        q: keyword,
        sort: sortBy === "latest" ? "recent" : "favorite"
      });

      setProducts(data.items);
      setTotalPages(Math.ceil(data.total / pageSize));
    } catch (err) {
      console.error(err);
      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, keyword, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, totalPages, loading };
}
