import { useEffect, useState } from "react";
import api, { call } from "../api/api";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [prods, setProds] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    call(api.product.getAll(), (data) => setProds(data.items));
  }, [reload]);

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure to delete this product?"))
      call(
        api.product.deleteById(id),
        (data) => {
          alert(data.message);
          setReload((prev) => !prev);
        },
        { method: "DELETE" }
      );
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
                <img src={prod.imageUrl} alt={prod.title} />
              </div>
              <div className="card__content">
                <h2 className="product__price">${prod.price}</h2>
                <p className="product__description">{prod.description}</p>
                <div className="card__actions">
                  <button className="btn" onClick={() => navigate("/admin/edit-product/" + prod._id)}>
                    Update Product
                  </button>
                  <button className="btn" onClick={() => handleDeleteProduct(prod._id)}>
                    Delete
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

export default Admin;
