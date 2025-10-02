import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  tags: [String],
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);


app.get("/health", (req, res) => res.json({ ok: true }));

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(4000, () => console.log(" 서버 실행중 (http://localhost:4000)"));
});
// ✅ 상품 목록 조회 API (GET /api/products)
app.get("/api/products", async (req, res) => {
  try {
    // 쿼리 파라미터 받기
    const offset = parseInt(req.query.offset) || 0;
    const limit = Math.min(parseInt(req.query.limit) || 12, 50); // 최대 50개 제한
    const q = req.query.q || "";
    const sort = req.query.sort || "recent";

    // 검색 조건
    let filter = {};
    if (q) {
      filter = {
        $or: [
          { name: { $regex: q, $options: "i" } },        // 대소문자 구분 없이 검색
          { description: { $regex: q, $options: "i" } }
        ]
      };
    }

    // 정렬 조건
    let sortOption = {};
    if (sort === "recent") {
      sortOption = { createdAt: -1 }; // 최신순
    }

    // DB 조회
    const [items, total] = await Promise.all([
      Product.find(filter)
        .sort(sortOption)
        .skip(offset)
        .limit(limit)
        .select("name price createdAt"), // 필요한 필드만 선택
      Product.countDocuments(filter)
    ]);

    // 응답 변환
    const results = items.map(item => ({
      id: item._id,
      name: item.name,
      price: item.price,
      createdAt: item.createdAt
    }));

    return res.json({
      total,
      offset,
      limit,
      items: results
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});
