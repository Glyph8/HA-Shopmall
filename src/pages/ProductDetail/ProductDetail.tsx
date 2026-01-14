import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../contexts/ProductContext";
import { useCart } from "../../contexts/CartContext";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct } = useProducts();
  const { addToCart } = useCart();

  const product = getProduct(Number(id));

  return (
    <div>
      <h1>상품 상세 페이지</h1>
      <p>팀원 C가 여기를 만들 거예요.</p>
    </div>
  );
}
