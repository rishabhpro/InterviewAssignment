import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { RiSubtractLine } from "react-icons/ri";
import { BsTrash } from "react-icons/bs";
import './display.css';

const Display: React.FC = () => {
  const [productDetails, setProductDetails] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const data: Product[] = response.data.products;
        setProductDetails(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const increaseQuantity = (productId: number) => {
    setProductDetails((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, stock: product.stock + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (productId: number) => {
    setProductDetails((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.stock > 0
          ? { ...product, stock: product.stock - 1 }
          : product
      )
    );
  };

  const deleteProduct = (productId: number) => {
    setProductDetails((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <div className="card">
      <h1 style={{ textAlign: "center", color: "#333" }}>Product List</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {productDetails.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "1rem",
              boxShadow: "0 2px 5px rgba(10, 10, 10, 1)",
            }}
          >
            <img
              src={product.images[0]}
              alt={product.title}
              style={{ width: "100%", height: 'auto', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',  margin: "1rem ", filter: 'grayscale(50%)' }}
            />
            <h2 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              {product.title}
            </h2>
            <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
              Price: ${product.price}
            </p>
            <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
              Discount: ${product.discountPercentage}
            </p>
            <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
              Quantity: {product.stock}
            </p>
            <button
              onClick={() => increaseQuantity(product.id)}
              style={{
                padding: "0.5rem",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
                marginRight: "0.5rem",
              }}
            >
              <FaPlus />
            </button>
            <button
              onClick={() => decreaseQuantity(product.id)}
              style={{
                padding: "0.5rem",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
                marginRight: "0.5rem",
              }}
            >
              <RiSubtractLine />
            </button>
            <button
              onClick={() => deleteProduct(product.id)}
              style={{
                padding: "0.5rem",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
              }}
            >
              <BsTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
