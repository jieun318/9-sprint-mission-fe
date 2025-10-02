import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/productService";

export default function RegistrationPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    tags: []
  });
  const [tagInput, setTagInput] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
        ...form, 
        price: Number(form.price), 
        tags: form.tags 
      };
      const { id } = await createProduct(payload);
      navigate(`/items/${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <main>
      <h2>상품 등록하기</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>상품명</label>
          <input name="name" value={form.name} onChange={onChange} />
        </div>
        <div>
          <label>상품 소개</label>
          <textarea name="description" value={form.description} onChange={onChange} />
        </div>
        <div>
          <label>가격</label>
          <input name="price" value={form.price} onChange={onChange} />
        </div>
        <div>
          <label>태그</label>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={onTagKeyDown}
            placeholder="엔터로 태그 추가"
          />
          <div>
            {form.tags.map((t, i) => (
              <span key={i}>#{t} </span>
            ))}
          </div>
        </div>
        <button type="submit">등록</button>
      </form>
    </main>
  );
}
