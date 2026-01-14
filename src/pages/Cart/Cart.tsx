import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import styles from "./Cart.module.css";
export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyIcon}>🛒</p>
        <h2>장바구니가 비어있습니다</h2>
        <p>쇼핑을 시작해보세요!</p>
        <Link to="/products">
          <Button variant="primary">상품 보러가기</Button>
        </Link>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>장바구니</h1>
      <div>
        {/* 장바구니 아이템 */}
        <div className={styles.items}>
          {items.map((item) => (
            <div key={item.id} className={styles.item}>
              {/* 이미지 */}
              <Link
                to={`/products/${item.product.id}`}
                className={styles.imageLink}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className={styles.image}
                />
              </Link>
              {/* 정보 */}
              <div className={styles.info}>
                <Link
                  to={`/products/${item.product.id}`}
                  className={styles.name}
                >
                  {item.product.name}
                </Link>
                {/* 선택한 옵션 */}
                {item.selectedOptions && (
                  <p className={styles.options}>
                    {Object.entries(item.selectedOptions)
                      .map(([key, value]) => (
                        <span key={key}>
                          {key}: {value}
                        </span>
                      ))
                      .reduce((prev, curr) => (
                        <>
                          {prev} / {curr}
                        </>
                      ))}
                  </p>
                )}
                <p className={styles.price}>
                  {item.product.price.toLocaleString()}원
                </p>
              </div>
              {/* 수량조절 */}
              <div className={styles.quantityControl}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className={styles.quantityBtn}
                >
                  -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className={styles.quantityBtn}
                  disabled={item.quantity >= item.product.stock}
                >
                  +
                </button>
              </div>
              {/* 합계 */}
              <div className={styles.itemTotal}>
                <p className={styles.itemTotalPrice}>
                  {(item.product.price * item.quantity).toLocaleString()}원
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className={styles.deleteBtn}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* 전체 삭제 */}
        <div className={styles.clearSection}>
          <button onClick={clearCart} className={styles.clearBtn}>
            전체 삭제
          </button>
        </div>
      </div>
      {/* 주문 요약 */}
      <div className={styles.summary}>
        <h2 className={styles.summaryTitle}>주문 요약</h2>
        <div className={styles.summaryRow}>
          <span>상품 개수</span>
          <span>{totalItems}개</span>
        </div>
        <div className={styles.summaryRow}>
          <span>상품 금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </div>
        <div className={styles.summaryRow}>
          <span>배송비</span>
          <span>{totalPrice >= 50000 ? "무료" : "3,000원"}</span>
        </div>
        <div className={styles.divider}></div>
        <div className={`${styles.summaryRow} ${styles.total}`}>
          <span>총 결제 금액</span>
          <span className={styles.totalPrice}>
            {(totalPrice + (totalPrice >= 50000 ? 0 : 3000)).toLocaleString()}원
          </span>
        </div>
        <Button variant="primary" fullWidth>
          주문하기
        </Button>
        <p className={styles.notice}>* 50,000원 이상 구매 시 배송비 무료</p>
      </div>
    </div>
  );
}