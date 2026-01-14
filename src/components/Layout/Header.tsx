import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./Header.module.css";
export default function Header() {
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* 로고 */}
        <Link to="/" className={styles.logo}>
          🛒 ShopMall
        </Link>
        {/* 네비게이션 */}
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            홈
          </Link>
          <Link to="/products" className={styles.navLink}>
            상품 목록
          </Link>
        </nav>
        {/* 우측 메뉴 */}
        <div className={styles.actions}>
          {/* 다크모드 토글 */}
          <button onClick={toggleTheme} className={styles.themeButton}>
            {theme === "light" ? "🌙" : "☀"}
          </button>
          {/* 장바구니 */}
          <Link to="/cart" className={styles.cartButton}>
            🛒 장바구니
            {totalItems > 0 && (
              <span className={styles.badge}>{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
