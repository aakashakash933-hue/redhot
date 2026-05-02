import { useState, useEffect } from "react";

const KEY = "redhot_products";

// 🔥 Hook to read products
export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = () => {
      try {
        const data = JSON.parse(localStorage.getItem(KEY)) || [];
        setProducts(data);
      } catch (e) {
        console.error("DB read error:", e);
        setProducts([]);
      }
    };

    load();

    // listen for manual updates
    window.addEventListener("redhot_update", load);

    return () => {
      window.removeEventListener("redhot_update", load);
    };
  }, []);

  return products;
}

// 🔥 helper to trigger UI refresh
function notifyUpdate() {
  window.dispatchEvent(new Event("redhot_update"));
}

// ➕ Add product
export function addProduct(product) {
  const data = JSON.parse(localStorage.getItem(KEY)) || [];

  const newProduct = {
    id: Date.now(),
    name: product.name || "Untitled",
    price: Number(product.price) || 0,
    category: product.category || "General",
    image: product.image || "",
    affiliate_link: product.affiliate_link || "#",
    badge: product.badge || "",
  };

  data.push(newProduct);
  localStorage.setItem(KEY, JSON.stringify(data));

  notifyUpdate();
}

// ✏️ Update product
export function updateProduct(id, updatedProduct) {
  const data = JSON.parse(localStorage.getItem(KEY)) || [];

  const newData = data.map(p =>
    p.id === id ? { ...p, ...updatedProduct } : p
  );

  localStorage.setItem(KEY, JSON.stringify(newData));

  notifyUpdate();
}

// ❌ Delete product
export function deleteProduct(id) {
  const data = JSON.parse(localStorage.getItem(KEY)) || [];

  const newData = data.filter(p => p.id !== id);

  localStorage.setItem(KEY, JSON.stringify(newData));

  notifyUpdate();
}
