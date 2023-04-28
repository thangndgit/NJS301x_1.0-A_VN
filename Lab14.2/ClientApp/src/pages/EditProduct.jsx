import { useEffect, useState } from "react";
import api, { call } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = ({ mode }) => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    if (mode === "update") {
      call(api.product.getById(productId), (data) => {
        if (data.error) {
          alert(data.error);
          navigate("/");
        } else setFormData(data.item);
      });
    }
  }, [mode, navigate, productId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Add product
    if (mode === "add") {
      call(api.product.create(), (data) => navigate("/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: formData }),
      });
    }
    // Update product
    else if (mode === "update") {
      call(
        api.product.updateById(productId),
        (data) => {
          alert(data.message);
          navigate("/admin/products");
        },
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ update: formData }),
        }
      );
    }
  };

  return (
    <main>
      <form className="product-form" onSubmit={handleFormSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={formData.title} required onChange={handleInputChange} />
        </div>
        <div className="form-control">
          <label htmlFor="imageUrl">Image url</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price}
            min={0}
            step={0.01}
            required
            onChange={handleInputChange}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows="5"
            value={formData.description}
            required
            onChange={handleInputChange}
          />
        </div>
        <button className="btn" type="submit">
          {mode === "add" ? "Add Product" : "Update Product"}
        </button>
      </form>
    </main>
  );
};

export default EditProduct;
