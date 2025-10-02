
const API_BASE =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_BASE) ||
  process.env.REACT_APP_API_BASE ||
  "http://localhost:4000";

// 상품 목록 조회 
export async function getProducts({ offset = 0, limit = 12, q = "", sort = "recent" } = {}) {
  const params = new URLSearchParams({ offset, limit, sort });
  if (q) params.set("q", q);
  const res = await fetch(`${API_BASE}/api/products?${params.toString()}`);
  if (!res.ok) throw new Error("상품 목록 조회 실패");
  return res.json(); 
}

// 상품 등록
export async function createProduct({ name, description, price, tags = [] }) {
  const res = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, description, price, tags })
  });
  if (res.status === 201) return res.json(); 
  const data = await res.json().catch(() => ({}));
  throw new Error(data.message || "상품 등록 실패");
}

// 상품 상세
export async function getProduct(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (!res.ok) throw new Error("상품 상세 조회 실패");
  return res.json(); 
}
