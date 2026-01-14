import { useProducts } from "../../contexts/ProductContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

import type { Category } from "../../types";
export default function Home() {
  const { getBestProducts, getNewProducts } = useProducts();
  const bestProducts = getBestProducts();
  const newProducts = getNewProducts();
  const categories: Category[] = [
    "전자기기",
    "패션",
    "식품",
    "도서",
    "생활용품",
  ];
  return (
    <div className={styles.home}>
      {/* 히어로 섹션 */}
      <section className={styles.hero}>
        <h1>🛒 ShopMall에 오 신 것을 환영합니다!</h1>
        <p>최고의 상품을 최저가로 만나보세요</p>
        <Link to="/products" className={styles.heroButton}>
          전체 상품 보기
        </Link>
      </section>
      {/* 카테고리 섹션 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>카테고리</h2>
        <div className={styles.categories}>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/products?category=${category}`}
              className={styles.categoryCard}
            >
              {category}
            </Link>
          ))}
        </div>
      </section>
      {/* 베스트 상품 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>🔥 베스트 상품</h2>
        <div className={styles.productGrid}>
          {bestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      {/* 신상품 */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>✨ 신상품</h2>
        <div className={styles.productGrid}>
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

