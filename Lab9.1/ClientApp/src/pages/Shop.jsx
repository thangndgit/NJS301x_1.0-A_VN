import { useEffect, useState } from "react";
import api, { call } from "../api/api";

const Shop = () => {
  const [prods, setProds] = useState([]);

  useEffect(() => {
    call(api.product.getAll(), (data) => setProds(data.items));
  }, []);

  const handleAddToCart = (prod) => {
    const action = "ADD_TO_CART";
    const productId = prod.id;
    const productPrice = prod.price;
    call(api.cart.update(), (data) => alert(data.message), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, productId, productPrice }),
    });
  };

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
                <img src={prod.imageUrl} alt="product" />
              </div>
              <div className="card__content">
                <h2 className="product__price">${prod.price}</h2>
                <p className="product__description">{prod.description}</p>
                <div className="card__actions">
                  <button className="btn">Details</button>
                  <button className="btn" onClick={() => handleAddToCart(prod)}>
                    Add To Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default Shop;
