import ProductCard from "./ProductCard";
import "./ProductCard.css";   
export default function ProductList({ products }) {
  if (!products.length) {
    return <p>상품이 없습니다.</p>;
  }

  return (
    <div className="product-list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
