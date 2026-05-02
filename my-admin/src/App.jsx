import { useState, useEffect } from "react";

const INIT = [
  { id: 1, name: "Oversized Cashmere Hoodie", price: 8999, category: "Men", badge: "Bestseller", img: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=500&q=80" },
  { id: 2, name: "Silk Slip Midi Dress", price: 6499, category: "Women", badge: "New", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80" },
  { id: 3, name: "Brushed Leather Tote", price: 14999, category: "Accessories", badge: "", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80" },
  { id: 4, name: "Merino Ribbed Sweater", price: 5999, category: "Men", badge: "New", img: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=500&q=80" },
  { id: 5, name: "Sculpted Heel Mules", price: 9499, category: "Women", badge: "Bestseller", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80" },
  { id: 6, name: "Slim Titanium Watch", price: 22999, category: "Accessories", badge: "", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80" },
  { id: 7, name: "Linen Relaxed Blazer", price: 11999, category: "Men", badge: "", img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80" },
  { id: 8, name: "Cropped Wool Jacket", price: 13499, category: "Women", badge: "Bestseller", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80" },
];

const CATS = ["Men", "Women", "Accessories"];
const BADGES = ["", "New", "Bestseller"];
const EMPTY = { name: "", price: "", category: "Men", badge: "", img: "" };

function getProducts() {
  try {
    const s = sessionStorage.getItem("maison_products");
    return s ? JSON.parse(s) : INIT;
  } catch { return INIT; }
}
function saveProducts(p) {
  try { sessionStorage.setItem("maison_products", JSON.stringify(p)); } catch {}
}

export default function Admin() {
  const [products, setProducts] = useState(getProducts);
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);
  const [tab, setTab] = useState("products");
  const [search, setSearch] = useState("");

  useEffect(() => { saveProducts(products); }, [products]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2600);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Valid price required";
    if (!form.img.trim()) e.img = "Image URL is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editing !== null) {
      setProducts(p => p.map(x => x.id === editing ? { ...x, ...form, price: Number(form.price) } : x));
      showToast("Product updated successfully");
      setEditing(null);
    } else {
      const newP = { ...form, price: Number(form.price), id: Date.now() };
      setProducts(p => [newP, ...p]);
      showToast("Product added successfully");
    }
    setForm(EMPTY);
    setErrors({});
  };

  const startEdit = p => {
    setEditing(p.id);
    setForm({ name: p.name, price: String(p.price), category: p.category, badge: p.badge, img: p.img });
    setErrors({});
    setTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => { setEditing(null); setForm(EMPTY); setErrors({}); };

  const handleDelete = id => {
    setProducts(p => p.filter(x => x.id !== id));
    setDelConfirm(null);
    showToast("Product removed", "danger");
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const stats = [
    { label: "Total Products", value: products.length },
    { label: "Men", value: products.filter(p => p.category === "Men").length },
    { label: "Women", value: products.filter(p => p.category === "Women").length },
    { label: "Accessories", value: products.filter(p => p.category === "Accessories").length },
  ];

  return (
    <div style={{ fontFamily: "'Inter','Helvetica Neue',sans-serif", background: "#F5F4F1", minHeight: "100vh", color: "#1C1C1A" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .inp{width:100%;padding:10px 14px;border:1px solid #DDD9D2;border-radius:8px;font-size:14px;font-family:inherit;color:#1C1C1A;background:#FFF;outline:none;transition:border-color 0.2s;}
        .inp:focus{border-color:#1C1C1A;}
        .inp.err{border-color:#C0392B;}
        select.inp{cursor:pointer;}
        .pbtn{border:none;cursor:pointer;font-family:inherit;font-size:12px;letter-spacing:0.1em;font-weight:500;border-radius:7px;transition:all 0.2s;padding:10px 20px;}
        .pbtn-dark{background:#1C1C1A;color:#FAF9F7;}
        .pbtn-dark:hover{background:#3A3A37;}
        .pbtn-ghost{background:transparent;color:#7A7870;border:1px solid #DDD9D2;}
        .pbtn-ghost:hover{border-color:#1C1C1A;color:#1C1C1A;}
        .pbtn-danger{background:#FDF1F0;color:#C0392B;border:1px solid #F5C6C2;}
        .pbtn-danger:hover{background:#FAE0DE;}
        .pbtn-edit{background:#F0EDE8;color:#5A4A3A;border:1px solid #E0D9CE;}
        .pbtn-edit:hover{background:#E8E2D8;}
        .row{display:flex;align-items:center;gap:10px;}
        .tab{padding:9px 20px;border-radius:7px;cursor:pointer;font-size:13px;letter-spacing:0.08em;font-weight:500;border:none;font-family:inherit;transition:all 0.18s;}
        .tab.on{background:#1C1C1A;color:#FAF9F7;}
        .tab.off{background:transparent;color:#7A7870;}
        .tab.off:hover{background:#E8E5E0;color:#1C1C1A;}
        .badge-best{background:#EDE8E0;color:#7A6A50;font-size:10px;letter-spacing:0.12em;font-weight:600;padding:3px 9px;border-radius:100px;}
        .badge-new{background:#1C1C1A;color:#FAF9F7;font-size:10px;letter-spacing:0.12em;font-weight:600;padding:3px 9px;border-radius:100px;}
        .badge-none{background:#F0EDE8;color:#A09890;font-size:10px;letter-spacing:0.1em;padding:3px 9px;border-radius:100px;}
        .prow{display:grid;grid-template-columns:56px 1fr 100px 110px 120px 100px;align-items:center;gap:16px;padding:14px 20px;border-bottom:1px solid #EDE9E4;transition:background 0.15s;}
        .prow:hover{background:#F8F6F3;}
        .toast{position:fixed;bottom:28px;right:28px;z-index:200;padding:13px 22px;border-radius:10px;font-size:13px;font-weight:500;letter-spacing:0.04em;box-shadow:0 4px 24px rgba(0,0,0,0.10);animation:slideup 0.3s ease;}
        @keyframes slideup{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
        .overlay{position:fixed;inset:0;background:rgba(28,28,26,0.35);z-index:100;display:flex;align-items:center;justify-content:center;}
        .modal{background:#FFF;border-radius:14px;padding:32px;max-width:380px;width:90%;box-shadow:0 8px 40px rgba(0,0,0,0.12);}
        ::-webkit-scrollbar{width:3px;} ::-webkit-scrollbar-thumb{background:#D4D0C8;}
      `}</style>

      {/* TOAST */}
      {toast && (
        <div className="toast" style={{ background: toast.type === "danger" ? "#FDF1F0" : "#F0F7F2", color: toast.type === "danger" ? "#C0392B" : "#1E6B3C", border: `1px solid ${toast.type === "danger" ? "#F5C6C2" : "#AEDBC0"}` }}>
          {toast.type === "success" ? "✓ " : "✕ "}{toast.msg}
        </div>
      )}

      {/* DELETE CONFIRM */}
      {delConfirm && (
        <div className="overlay" onClick={() => setDelConfirm(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Remove product?</p>
            <p style={{ fontSize: 13, color: "#7A7870", lineHeight: 1.7, marginBottom: 24 }}>
              <strong style={{ color: "#1C1C1A" }}>{delConfirm.name}</strong> will be permanently removed from the store.
            </p>
            <div className="row" style={{ justifyContent: "flex-end" }}>
              <button className="pbtn pbtn-ghost" onClick={() => setDelConfirm(null)}>CANCEL</button>
              <button className="pbtn pbtn-danger" onClick={() => handleDelete(delConfirm.id)}>REMOVE</button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR + MAIN */}
      <div style={{ display: "flex", minHeight: "100vh" }}>

        {/* SIDEBAR */}
        <aside style={{ width: 220, background: "#1C1C1A", padding: "0 0 32px", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "28px 24px 24px", borderBottom: "1px solid #2C2C2A" }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: "#FAF9F7", letterSpacing: "0.06em" }}>MAISON</p>
            <p style={{ fontSize: 10, letterSpacing: "0.2em", color: "#5A5A58", marginTop: 3 }}>ADMIN PANEL</p>
          </div>
          <nav style={{ padding: "20px 14px", display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            {[
              { key: "products", label: "All Products", icon: "▤" },
              { key: "add", label: editing ? "Edit Product" : "Add Product", icon: "+" },
            ].map(({ key, label, icon }) => (
              <button key={key} onClick={() => { setTab(key); if (key === "products") cancelEdit(); }}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 500, letterSpacing: "0.06em", transition: "all 0.18s", background: tab === key ? "#2E2E2B" : "transparent", color: tab === key ? "#FAF9F7" : "#6A6A68" }}>
                <span style={{ fontSize: 15 }}>{icon}</span>{label}
              </button>
            ))}
          </nav>
          <div style={{ padding: "16px 24px", borderTop: "1px solid #2C2C2A" }}>
            <p style={{ fontSize: 11, color: "#3A3A38", letterSpacing: "0.1em" }}>{products.length} PRODUCTS LIVE</p>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, overflowX: "hidden" }}>

          {/* HEADER */}
          <div style={{ background: "#FFF", borderBottom: "1px solid #E8E5E0", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 600, color: "#1C1C1A" }}>{tab === "products" ? "Product Catalogue" : editing ? "Edit Product" : "Add New Product"}</h1>
              <p style={{ fontSize: 12, color: "#A09890", marginTop: 2, letterSpacing: "0.06em" }}>{tab === "products" ? `${filtered.length} items` : "Fill in the product details below"}</p>
            </div>
            {tab === "products" && (
              <button className="pbtn pbtn-dark" onClick={() => { setTab("add"); cancelEdit(); }}>+ ADD PRODUCT</button>
            )}
          </div>

          <div style={{ padding: "28px 32px" }}>

            {/* STATS */}
            {tab === "products" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 28 }}>
                {stats.map(s => (
                  <div key={s.label} style={{ background: "#FFF", border: "1px solid #E8E5E0", borderRadius: 10, padding: "18px 20px" }}>
                    <p style={{ fontSize: 11, letterSpacing: "0.14em", color: "#A09890", fontWeight: 500, marginBottom: 8 }}>{s.label.toUpperCase()}</p>
                    <p style={{ fontSize: 28, fontWeight: 600, color: "#1C1C1A", fontFamily: "'Cormorant Garamond',serif" }}>{s.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* PRODUCT LIST */}
            {tab === "products" && (
              <div style={{ background: "#FFF", border: "1px solid #E8E5E0", borderRadius: 12, overflow: "hidden" }}>
                {/* Table header */}
                <div style={{ padding: "14px 20px", borderBottom: "1px solid #EDE9E4", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ position: "relative", width: 260 }}>
                    <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A09890" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input className="inp" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36, fontSize: 13 }} />
                  </div>
                  <p style={{ fontSize: 12, color: "#B0ACA4", letterSpacing: "0.1em" }}>{filtered.length} OF {products.length}</p>
                </div>
                {/* Col headers */}
                <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 100px 110px 120px 100px", gap: 16, padding: "10px 20px", background: "#F8F6F3" }}>
                  {["", "Product", "Price", "Category", "Badge", "Actions"].map(h => (
                    <p key={h} style={{ fontSize: 10, letterSpacing: "0.18em", color: "#A09890", fontWeight: 600 }}>{h.toUpperCase()}</p>
                  ))}
                </div>
                {/* Rows */}
                {filtered.length === 0 ? (
                  <div style={{ padding: "48px 0", textAlign: "center", color: "#B0ACA4", fontSize: 13, letterSpacing: "0.1em" }}>NO PRODUCTS FOUND</div>
                ) : filtered.map(p => (
                  <div key={p.id} className="prow">
                    <img src={p.img} alt={p.name} style={{ width: 48, height: 56, objectFit: "cover", borderRadius: 6, background: "#F0EDE8" }} />
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: "#1C1C1A", marginBottom: 2 }}>{p.name}</p>
                      <p style={{ fontSize: 11, color: "#A09890" }}>ID #{p.id}</p>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 500 }}>₹{p.price.toLocaleString("en-IN")}</p>
                    <p style={{ fontSize: 13, color: "#5A5A58" }}>{p.category}</p>
                    <div>
                      {p.badge === "Bestseller" ? <span className="badge-best">BESTSELLER</span>
                        : p.badge === "New" ? <span className="badge-new">NEW</span>
                        : <span className="badge-none">NONE</span>}
                    </div>
                    <div className="row" style={{ gap: 6 }}>
                      <button className="pbtn pbtn-edit" style={{ padding: "7px 14px", fontSize: 11 }} onClick={() => startEdit(p)}>EDIT</button>
                      <button className="pbtn pbtn-danger" style={{ padding: "7px 14px", fontSize: 11 }} onClick={() => setDelConfirm(p)}>DEL</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ADD / EDIT FORM */}
            {tab === "add" && (
              <div style={{ maxWidth: 660, background: "#FFF", border: "1px solid #E8E5E0", borderRadius: 12, padding: "32px" }}>
                {editing && (
                  <div style={{ background: "#F0EDE8", border: "1px solid #E0D9CE", borderRadius: 8, padding: "11px 16px", marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, color: "#7A6A50" }}>Editing: <strong>{products.find(p => p.id === editing)?.name}</strong></span>
                    <button onClick={cancelEdit} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#A09890" }}>✕ Cancel</button>
                  </div>
                )}
                <div style={{ display: "grid", gap: 20 }}>
                  {/* Name */}
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: "0.14em", color: "#7A7870", fontWeight: 500, display: "block", marginBottom: 7 }}>PRODUCT NAME *</label>
                    <input className={`inp ${errors.name ? "err" : ""}`} placeholder="e.g. Cashmere Blend Coat" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    {errors.name && <p style={{ fontSize: 11, color: "#C0392B", marginTop: 5 }}>{errors.name}</p>}
                  </div>
                  {/* Price + Category */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: "0.14em", color: "#7A7870", fontWeight: 500, display: "block", marginBottom: 7 }}>PRICE (₹) *</label>
                      <input className={`inp ${errors.price ? "err" : ""}`} type="number" placeholder="e.g. 9999" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                      {errors.price && <p style={{ fontSize: 11, color: "#C0392B", marginTop: 5 }}>{errors.price}</p>}
                    </div>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: "0.14em", color: "#7A7870", fontWeight: 500, display: "block", marginBottom: 7 }}>CATEGORY</label>
                      <select className="inp" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                        {CATS.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  {/* Badge */}
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: "0.14em", color: "#7A7870", fontWeight: 500, display: "block", marginBottom: 7 }}>BADGE</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {BADGES.map(b => (
                        <button key={b} onClick={() => setForm(f => ({ ...f, badge: b }))}
                          style={{ padding: "8px 18px", borderRadius: 100, border: `1px solid ${form.badge === b ? "#1C1C1A" : "#DDD9D2"}`, background: form.badge === b ? "#1C1C1A" : "#FFF", color: form.badge === b ? "#FAF9F7" : "#7A7870", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 500, transition: "all 0.18s" }}>
                          {b === "" ? "None" : b}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Image URL */}
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: "0.14em", color: "#7A7870", fontWeight: 500, display: "block", marginBottom: 7 }}>IMAGE URL *</label>
                    <input className={`inp ${errors.img ? "err" : ""}`} placeholder="https://images.unsplash.com/..." value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))} />
                    {errors.img && <p style={{ fontSize: 11, color: "#C0392B", marginTop: 5 }}>{errors.img}</p>}
                  </div>
                  {/* Preview */}
                  {form.img && (
                    <div style={{ border: "1px solid #E8E5E0", borderRadius: 10, padding: 12, display: "flex", gap: 14, alignItems: "center", background: "#FAF9F7" }}>
                      <img src={form.img} alt="preview" style={{ width: 60, height: 72, objectFit: "cover", borderRadius: 7, background: "#EDE8E0" }} onError={e => { e.target.style.display = "none"; }} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500, color: "#1C1C1A" }}>{form.name || "Product name"}</p>
                        <p style={{ fontSize: 12, color: "#A09890", marginTop: 3 }}>{form.category} · {form.price ? `₹${Number(form.price).toLocaleString("en-IN")}` : "₹—"}</p>
                      </div>
                    </div>
                  )}
                  {/* Actions */}
                  <div className="row" style={{ justifyContent: "flex-end", gap: 10, paddingTop: 4 }}>
                    {editing && <button className="pbtn pbtn-ghost" onClick={cancelEdit}>CANCEL</button>}
                    <button className="pbtn pbtn-dark" style={{ padding: "11px 32px" }} onClick={handleSubmit}>
                      {editing ? "SAVE CHANGES" : "ADD PRODUCT"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}