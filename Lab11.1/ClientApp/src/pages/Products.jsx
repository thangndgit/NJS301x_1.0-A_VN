import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { call } from "../api/api";
import AddToCart from "../components/AddToCart";

const Products = () => {
  const navigate = useNavigate();
  const [prods, setProds] = useState([]);

  useEffect(() => {
    call(api.product.getAll(), (data) => setProds(data.items));
  }, []);

  return (
    <main>
      {!prods.length && <h1>No Products Found!</h1>}
      {!!prods.length && (
        <div className="grid">
          {prods.map((prod, i) => (
            <article className="card product-item" key={i}>
              <header className="card__header">
                <h1 className="product__title">{prod.title}</h1>
              </header>
              <div className="card__image">
                <img src={prod.imageUrl} alt={prod.title} />
              </div>
              <div className="card__content">
                <h2 className="product__price">${prod.price}</h2>
                <p className="product__description">{prod.description}</p>
                <div className="card__actions">
                  <button className="btn" onClick={() => navigate("/products/" + prod.id)}>
                    Details
                  </button>
                  <AddToCart productId={prod.id} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Products;
