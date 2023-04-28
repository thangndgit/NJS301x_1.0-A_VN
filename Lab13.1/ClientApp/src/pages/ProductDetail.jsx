import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { call } from "../api/api";
import AddToCart from "../components/AddToCart";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    imageUrl: "",
    title: "",
    price: 0,
    description: "",
    id: "",
  });

  useEffect(() => {
    call(api.product.getById(productId), (data) => setProduct(data.item));
  }, [productId]);

  return (
    <div className="centered">
      <hr />
      <div className="image">
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <h2>{product.price}</h2>
      <p>{product.description}</p>
      <AddToCart productId={product.id} />
    </div>
  );
};

export default ProductDetail;
