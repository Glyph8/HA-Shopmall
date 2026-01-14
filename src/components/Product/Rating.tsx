import type { Product } from "../../types";
import styles from "./Rating.module.css";

interface RenderStarsProps {
  product: Product;
}

export const RenderStars = ({ product }: RenderStarsProps) => {
  const fullStars = Math.floor(product.rating);

  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <span key={i} className={styles.star}>
          ⭐
        </span>
      );
    } else {
      stars.push(
        <span key={i} className={styles.starEmpty}>
          ☆
        </span>
      );
    }
  }

  return (
    <div className={styles.rating}>
      {stars.map((star) => star)}
      <span className={styles.ratingText}>
        {product.rating} ({product.reviewCount}개 리뷰)
      </span>
    </div>
  );
};
