import styles from "./ProductDetail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContext";
import { useCart } from "../../contexts/CartContext";
import { useState } from "react";
import Button from "../../components/common/Button";
import { Rating } from "../../components/Product/Rating";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();

  const product = getProduct(Number(id));
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const [quantity, setQuantity] = useState(1);
  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>상품을 찾을 수 없습니다</h2>
        <Button onClick={() => navigate("/products")}>상품 목록으로</Button>
      </div>
    );
  }
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };
  const isAllOptionsSelected = () => {
    if (!product.options) return true;
    return product.options.every((option) => selectedOptions[option.name]);
  };
  const handleAddToCart = () => {
    if (!isAllOptionsSelected()) {
      alert("옵션을 선택해주세요!");
      return;
    }
    addToCart(product, quantity, selectedOptions);
    if (
      window.confirm("장바구니에 담았습니다.\n장바구니로 이동하시겠습니까?")
    ) {
      navigate("/cart");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.imageSection}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.image}
          />
        </div>
        <div className={styles.infoSection}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.name}>{product.name}</h1>
          <Rating product={product} />
          <p className={styles.description}>{product.description}</p>
          <div className={styles.divider}></div>
          {product.options && product.options.length > 0 && (
            <div className={styles.options}>
              {product.options.map((option) => (
                <div key={option.name} className={styles.optionGroup}>
                  <label className={styles.optionLabel}>{option.name}</label>
                  <select
                    value={selectedOptions[option.name] || ""}
                    onChange={(e) =>
                      handleOptionChange(option.name, e.target.value)
                    }
                    className={styles.select}
                  >
                    <option value="">선택하세요</option>
                    {option.values.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
          <div className={styles.quantitySection}>
            <label className={styles.label}>수량</label>
            <div className={styles.quantityControl}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className={styles.quantityBtn}
              >
                -
              </button>
              <span className={styles.quantity}>{quantity}</span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className={styles.quantityBtn}
              >
                +
              </button>
            </div>
            <p className={styles.stock}>재고: {product.stock}개</p>
          </div>
          <div className={styles.totalPrice}>
            <span>총 금액</span>
            <span className={styles.totalAmount}>
              {(product.price * quantity).toLocaleString()}원
            </span>
          </div>
          <div className={styles.actions}>
            <Button
              variant="primary"
              fullWidth
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "장바구니 담기" : "품절"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
