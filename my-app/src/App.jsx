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

/* ───────────── STORE VIEW ───────────── */
function Store({ products }) {
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [added, setAdded] = useState(null);
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => { setTimeout(() => setHeroIn(true), 80); }, []);

  const filtered = products
    .filter(p => (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === "asc" ? a.price - b.price : sort === "desc" ? b.price - a.price : 0);

  const toggleWish = id => setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
  const handleAdd = id => { setAdded(id); setTimeout(() => setAdded(null), 1400); };

  return (
    <div style={{ background: "#FAF9F7", minHeight: "100vh", color: "#1C1C1A" }}>
      <style>{`
        .pcard{transition:transform .4s cubic-bezier(.22,1,.36,1);}
        .pcard:hover{transform:translateY(-6px);}
        .pcard:hover .pimg{transform:scale(1.06);}
        .pimg{transition:transform .6s cubic-bezier(.22,1,.36,1);}
        .chip{cursor:pointer;font-size:12px;letter-spacing:.1em;padding:7px 20px;border-radius:100px;border:1px solid #D4D0C8;background:transparent;color:#7A7870;font-family:inherit;font-weight:400;transition:all .2s;}
        .chip.on{background:#1C1C1A;border-color:#1C1C1A;color:#FAF9F7;}
        .chip:hover:not(.on){border-color:#1C1C1A;color:#1C1C1A;}
        .sinp{width:100%;padding:10px 14px 10px 38px;border:1px solid #E0DDD8;background:#FFF;border-radius:8px;font-size:13px;font-family:inherit;color:#1C1C1A;outline:none;transition:border-color .2s;}
        .sinp:focus{border-color:#1C1C1A;}
        .abtn{border:none;cursor:pointer;font-family:inherit;font-size:11px;letter-spacing:.12em;font-weight:500;border-radius:7px;transition:all .2s;}
        .abtn-d{background:#1C1C1A;color:#FAF9F7;padding:10px 0;width:100%;}
        .abtn-d:hover{background:#3A3A37;}
        .abtn-done{background:#C8C4BC;color:#FAF9F7;padding:10px 0;width:100%;cursor:default;}
        .wbtn{background:none;border:none;cursor:pointer;font-size:18px;transition:transform .15s;line-height:1;}
        .wbtn:hover{transform:scale(1.2);}
        .fade-s{opacity:0;transform:translateY(22px);transition:opacity .8s ease,transform .8s ease;}
        .fade-s.in{opacity:1;transform:translateY(0);}
      `}</style>

      {/* HERO */}
      <div style={{ background: "#F0EDE8", borderBottom: "1px solid #E8E5E0", padding: "72px 32px 64px" }}>
        <div className={`fade-s ${heroIn ? "in" : ""}`} style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: ".3em", color: "#A09890", fontWeight: 500, marginBottom: 18 }}>SPRING — SUMMER 2026</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(40px,6vw,64px)", fontWeight: 400, lineHeight: 1.1, color: "#1C1C1A", marginBottom: 18 }}>
            Refined Essentials,<br /><em>Timeless Form</em>
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#7A7870", maxWidth: 400, margin: "0 auto 28px" }}>
            A curated edit of the season's most considered pieces — built to last, worn forever.
          </p>
          <button onClick={() => document.getElementById("shop-grid").scrollIntoView({ behavior: "smooth" })}
            style={{ background: "#1C1C1A", color: "#FAF9F7", border: "none", padding: "13px 40px", borderRadius: 8, fontSize: 12, letterSpacing: ".18em", fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
            EXPLORE COLLECTION
          </button>
        </div>
      </div>

      {/* TRUST */}
      <div style={{ background: "#FFF", borderBottom: "1px solid #E8E5E0", padding: "14px 32px", display: "flex", justifyContent: "center", gap: "clamp(20px,5vw,64px)", flexWrap: "wrap" }}>
        {["Free shipping over ₹2,000", "Easy 30-day returns", "Sustainably sourced", "Certified quality"].map(t => (
          <span key={t} style={{ fontSize: 11, letterSpacing: ".1em", color: "#9A9890", display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 7, color: "#C8C4BC" }}>✦</span>{t.toUpperCase()}
          </span>
        ))}
      </div>

      {/* SHOP */}
      <div id="shop-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 24px 80px" }}>
        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["All", ...CATS].map(c => (
              <button key={c} className={`chip ${cat === c ? "on" : ""}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A09890" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input className="sinp" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} style={{ width: 200 }} />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)}
              style={{ padding: "10px 12px", border: "1px solid #E0DDD8", borderRadius: 8, background: "#FFF", fontSize: 13, fontFamily: "inherit", color: "#1C1C1A", outline: "none", cursor: "pointer" }}>
              <option value="default">Featured</option>
              <option value="asc">Price ↑</option>
              <option value="desc">Price ↓</option>
            </select>
          </div>
        </div>

        <p style={{ fontSize: 11, letterSpacing: ".18em", color: "#B0ACA4", marginBottom: 24, fontWeight: 500 }}>{filtered.length} PIECE{filtered.length !== 1 ? "S" : ""}</p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#B0ACA4" }}>
            <p style={{ fontSize: 13, letterSpacing: ".15em" }}>NO PIECES FOUND</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(256px,1fr))", gap: 24 }}>
            {filtered.map(p => (
              <div key={p.id} className="pcard" style={{ background: "#FFF", border: "1px solid #E8E5E0", borderRadius: 12, overflow: "hidden" }}>
                <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#F0EDE8" }}>
                  <img src={p.img} alt={p.name} className="pimg" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    {p.badge === "Bestseller" && <span style={{ background: "#EDE8E0", color: "#7A6A50", fontSize: 10, letterSpacing: ".12em", fontWeight: 600, padding: "3px 9px", borderRadius: 100 }}>BESTSELLER</span>}
                    {p.badge === "New" && <span style={{ background: "#1C1C1A", color: "#FAF9F7", fontSize: 10, letterSpacing: ".12em", fontWeight: 600, padding: "3px 9px", borderRadius: 100 }}>NEW</span>}
                  </div>
                  <button className="wbtn" onClick={() => toggleWish(p.id)} style={{ position: "absolute", top: 10, right: 12, color: wishlist.includes(p.id) ? "#C0392B" : "#CCC" }}>
                    {wishlist.includes(p.id) ? "♥" : "♡"}
                  </button>
                </div>
                <div style={{ padding: "16px 16px 18px" }}>
                  <p style={{ fontSize: 10, letterSpacing: ".18em", color: "#B0ACA4", marginBottom: 5, fontWeight: 500 }}>{p.category.toUpperCase()}</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 17, fontWeight: 600, color: "#1C1C1A", marginBottom: 10, lineHeight: 1.3 }}>{p.name}</h3>
                  <div style={{ borderTop: "1px solid #EDE9E4", marginBottom: 14 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16, fontWeight: 500, color: "#1C1C1A" }}>₹{p.price.toLocaleString("en-IN")}</span>
                    <button className={`abtn ${added === p.id ? "abtn-done" : "abtn-d"}`} style={{ flex: 1 }} onClick={() => handleAdd(p.id)} disabled={added === p.id}>
                      {added === p.id ? "ADDED ✓" : "ADD TO BAG"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ background: "#1C1C1A", color: "#7A7870" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "44px 32px", display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 600, color: "#FAF9F7", letterSpacing: ".04em", marginBottom: 6 }}>MAISON</p>
            <p style={{ fontSize: 12, lineHeight: 1.8, maxWidth: 220, color: "#5A5A58" }}>Refined essentials for the considered wardrobe.</p>
          </div>
          {[["Shop", ["Men", "Women", "Accessories"]], ["Company", ["About", "Sustainability", "Contact"]]].map(([title, links]) => (
            <div key={title}>
              <p style={{ fontSize: 10, letterSpacing: ".2em", color: "#5A5A58", marginBottom: 14, fontWeight: 500 }}>{title.toUpperCase()}</p>
              {links.map(l => <p key={l} style={{ fontSize: 13, color: "#7A7870", marginBottom: 7, cursor: "pointer" }}>{l}</p>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid #2C2C2A", padding: "18px 32px" }}>
          <p style={{ fontSize: 11, color: "#3A3A38", letterSpacing: ".12em", maxWidth: 1280, margin: "0 auto" }}>© 2026 MAISON · ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────── ADMIN VIEW ───────────── */
function Admin({ products, setProducts }) {
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);
  const [tab, setTab] = useState("products");
  const [search, setSearch] = useState("");

  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 2600); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) e.price = "Valid price required";
    if (!form.img.trim()) e.img = "Image URL is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editing !== null) {
      setProducts(p => p.map(x => x.id === editing ? { ...x, ...form, price: Number(form.price) } : x));
      showToast("Product updated");
      setEditing(null);
    } else {
      setProducts(p => [{ ...form, price: Number(form.price), id: Date.now() }, ...p]);
      showToast("Product added — live on store instantly!");
    }
    setForm(EMPTY); setErrors({});
  };

  const startEdit = p => { setEditing(p.id); setForm({ name: p.name, price: String(p.price), category: p.category, badge: p.badge, img: p.img }); setErrors({}); setTab("add"); };
  const cancelEdit = () => { setEditing(null); setForm(EMPTY); setErrors({}); };
  const handleDelete = id => { setProducts(p => p.filter(x => x.id !== id)); setDelConfirm(null); showToast("Product removed", "danger"); };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const stats = [{ label: "Total", value: products.length }, ...CATS.map(c => ({ label: c, value: products.filter(p => p.category === c).length }))];

  return (
    <div style={{ background: "#F5F4F1", minHeight: "100vh", color: "#1C1C1A" }}>
      <style>{`
        .ainp{width:100%;padding:10px 14px;border:1px solid #DDD9D2;border-radius:8px;font-size:14px;font-family:inherit;color:#1C1C1A;background:#FFF;outline:none;transition:border-color .2s;}
        .ainp:focus{border-color:#1C1C1A;}
        .ainp.err{border-color:#C0392B;}
        select.ainp{cursor:pointer;}
        .ap{border:none;cursor:pointer;font-family:inherit;font-size:12px;letter-spacing:.1em;font-weight:500;border-radius:7px;transition:all .2s;padding:9px 18px;}
        .ap-dk{background:#1C1C1A;color:#FAF9F7;} .ap-dk:hover{background:#3A3A37;}
        .ap-gh{background:transparent;color:#7A7870;border:1px solid #DDD9D2;} .ap-gh:hover{border-color:#1C1C1A;color:#1C1C1A;}
        .ap-del{background:#FDF1F0;color:#C0392B;border:1px solid #F5C6C2;} .ap-del:hover{background:#FAE0DE;}
        .ap-ed{background:#F0EDE8;color:#5A4A3A;border:1px solid #E0D9CE;} .ap-ed:hover{background:#E8E2D8;}
        .arow{display:grid;grid-template-columns:52px 1fr 100px 110px 110px 110px;align-items:center;gap:14px;padding:13px 18px;border-bottom:1px solid #EDE9E4;transition:background .15s;}
        .arow:hover{background:#F8F6F3;}
        .toast{position:fixed;bottom:26px;right:26px;z-index:300;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:500;letter-spacing:.04em;animation:sup .3s ease;}
        @keyframes sup{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
        .ov{position:fixed;inset:0;background:rgba(28,28,26,.4);z-index:200;display:flex;align-items:center;justify-content:center;}
        .modal{background:#FFF;border-radius:14px;padding:30px;max-width:360px;width:90%;}
      `}</style>

      {toast && (
        <div className="toast" style={{ background: toast.type === "danger" ? "#FDF1F0" : "#F0F7F2", color: toast.type === "danger" ? "#C0392B" : "#1E6B3C", border: `1px solid ${toast.type === "danger" ? "#F5C6C2" : "#AEDBC0"}` }}>
          {toast.type === "success" ? "✓ " : "✕ "}{toast.msg}
        </div>
      )}

      {delConfirm && (
        <div className="ov" onClick={() => setDelConfirm(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Remove product?</p>
            <p style={{ fontSize: 13, color: "#7A7870", lineHeight: 1.7, marginBottom: 22 }}><strong style={{ color: "#1C1C1A" }}>{delConfirm.name}</strong> will be permanently removed from the store.</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button className="ap ap-gh" onClick={() => setDelConfirm(null)}>CANCEL</button>
              <button className="ap ap-del" onClick={() => handleDelete(delConfirm.id)}>REMOVE</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* SIDEBAR */}
        <aside style={{ width: 210, background: "#1C1C1A", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          <div style={{ padding: "26px 22px 22px", borderBottom: "1px solid #2C2C2A" }}>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600, color: "#FAF9F7", letterSpacing: ".06em" }}>MAISON</p>
            <p style={{ fontSize: 10, letterSpacing: ".2em", color: "#5A5A58", marginTop: 2 }}>ADMIN PANEL</p>
          </div>
          <nav style={{ padding: "18px 12px", display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
            {[{ key: "products", icon: "▤", label: "All Products" }, { key: "add", icon: "+", label: editing ? "Edit Product" : "Add Product" }].map(({ key, icon, label }) => (
              <button key={key} onClick={() => { setTab(key); if (key === "products") cancelEdit(); }}
                style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 13px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 500, letterSpacing: ".06em", transition: "all .18s", background: tab === key ? "#2E2E2B" : "transparent", color: tab === key ? "#FAF9F7" : "#6A6A68" }}>
                <span style={{ fontSize: 14 }}>{icon}</span>{label}
              </button>
            ))}
          </nav>
          <div style={{ padding: "14px 22px", borderTop: "1px solid #2C2C2A" }}>
            <p style={{ fontSize: 11, color: "#3A3A38", letterSpacing: ".1em" }}>{products.length} PRODUCTS LIVE</p>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, overflow: "hidden" }}>
          <div style={{ background: "#FFF", borderBottom: "1px solid #E8E5E0", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h1 style={{ fontSize: 17, fontWeight: 600 }}>{tab === "products" ? "Product Catalogue" : editing ? "Edit Product" : "Add New Product"}</h1>
              <p style={{ fontSize: 12, color: "#A09890", marginTop: 2, letterSpacing: ".06em" }}>{tab === "products" ? `${filtered.length} items` : "Changes reflect on the store instantly"}</p>
            </div>
            {tab === "products" && <button className="ap ap-dk" onClick={() => { setTab("add"); cancelEdit(); }}>+ ADD PRODUCT</button>}
          </div>

          <div style={{ padding: "24px 28px" }}>
            {tab === "products" && (
              <>
                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
                  {stats.map(s => (
                    <div key={s.label} style={{ background: "#FFF", border: "1px solid #E8E5E0", borderRadius: 10, padding: "16px 18px" }}>
                      <p style={{ fontSize: 10, letterSpacing: ".14em", color: "#A09890", fontWeight: 500, marginBottom: 6 }}>{s.label.toUpperCase()}</p>
                      <p style={{ fontSize: 26, fontWeight: 600, color: "#1C1C1A", fontFamily: "'Cormorant Garamond',serif" }}>{s.value}</p>
                    </div>
                  ))}
                </div>
                {/* Table */}
                <div style={{ background: "#FFF", border: "1px solid #E8E5E0", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ padding: "13px 18px", borderBottom: "1px solid #EDE9E4", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ position: "relative", width: 240 }}>
                      <svg style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)" }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A09890" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                      <input className="ainp" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34, fontSize: 13 }} />
                    </div>
                    <p style={{ fontSize: 12, color: "#B0ACA4", letterSpacing: ".1em" }}>{filtered.length} / {products.length}</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "52px 1fr 100px 110px 110px 110px", gap: 14, padding: "9px 18px", background: "#F8F6F3" }}>
                    {["", "Product", "Price", "Category", "Badge", "Actions"].map(h => (
                      <p key={h} style={{ fontSize: 10, letterSpacing: ".18em", color: "#A09890", fontWeight: 600 }}>{h.toUpperCase()}</p>
                    ))}
                  </div>
                  {filtered.length === 0
                    ? <div style={{ padding: "44px 0", textAlign: "center", color: "#B0ACA4", fontSize: 13, letterSpacing: ".1em" }}>NO PRODUCTS FOUND</div>
                    : filtered.map(p => (
                      <div key={p.id} className="arow">
                        <img src={p.img} alt="" style={{ width: 44, height: 52, objectFit: "cover", borderRadius: 6 }} />
                        <div>
                          <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{p.name}</p>
                          <p style={{ fontSize: 11, color: "#A09890" }}>#{p.id}</p>
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 500 }}>₹{p.price.toLocaleString("en-IN")}</p>
                        <p style={{ fontSize: 13, color: "#5A5A58" }}>{p.category}</p>
                        <div>
                          {p.badge === "Bestseller" && <span style={{ background: "#EDE8E0", color: "#7A6A50", fontSize: 10, letterSpacing: ".1em", fontWeight: 600, padding: "3px 8px", borderRadius: 100 }}>BEST</span>}
                          {p.badge === "New" && <span style={{ background: "#1C1C1A", color: "#FAF9F7", fontSize: 10, letterSpacing: ".1em", fontWeight: 600, padding: "3px 8px", borderRadius: 100 }}>NEW</span>}
                          {!p.badge && <span style={{ background: "#F0EDE8", color: "#A09890", fontSize: 10, padding: "3px 8px", borderRadius: 100 }}>—</span>}
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button className="ap ap-ed" style={{ padding: "6px 12px", fontSize: 11 }} onClick={() => startEdit(p)}>EDIT</button>
                          <button className="ap ap-del" style={{ padding: "6px 12px", fontSize: 11 }} onClick={() => setDelConfirm(p)}>DEL</button>
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}

            {tab === "add" && (
              <div style={{ maxWidth: 620, background: "#FFF", border: "1px solid #E8E5E0", borderRadius: 12, padding: "28px" }}>
                {editing && (
                  <div style={{ background: "#F0EDE8", border: "1px solid #E0D9CE", borderRadius: 8, padding: "10px 15px", marginBottom: 22, display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 13, color: "#7A6A50" }}>Editing: <strong>{products.find(p => p.id === editing)?.name}</strong></span>
                    <button onClick={cancelEdit} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#A09890" }}>✕ Cancel</button>
                  </div>
                )}
                <div style={{ display: "grid", gap: 18 }}>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: ".14em", color: "#7A7870", fontWeight: 500, display: "block", marginBottom: 6 }}>PRODUCT NAME *</label>
                    <input className={`ainp ${errors.name ? "err" : ""}`} placeholder="e.g. Cashmere Blend Coat" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    {errors.name && <p style={{ fontSize: 11, color: "#C0392B", marginTop: 4 }}>{errors.name}</p>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: ".14em", color: "#7A7870", fontWeight: 500, display: "block", marginBottom: 6 }}>PRICE (₹) *</label>
                      <input className={`ainp ${errors.price ? "err" : ""}`} type="number" placeholder="9999" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                      {errors.price && <p style={{ fontSize: 11, color: "#C0392B", marginTop: 4 }}>{errors.price}</p>}
                    </div>
                    <div>
                      <label style={{ fontSize: 11, letterSpacing: ".14em", color: "#7A7870", fontWeight: 500, display: "block", marginBottom: 6 }}>CATEGORY</label>
                      <select className="ainp" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                        {CATS.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: ".14em", color: "#7A7870", fontWeight: 500, display: "block", marginBottom: 6 }}>BADGE</label>
                    <div style={{ display: "flex", gap: 8 }}>
                      {BADGES.map(b => (
                        <button key={b} onClick={() => setForm(f => ({ ...f, badge: b }))}
                          style={{ padding: "7px 16px", borderRadius: 100, border: `1px solid ${form.badge === b ? "#1C1C1A" : "#DDD9D2"}`, background: form.badge === b ? "#1C1C1A" : "#FFF", color: form.badge === b ? "#FAF9F7" : "#7A7870", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 500, transition: "all .18s" }}>
                          {b === "" ? "None" : b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 11, letterSpacing: ".14em", color: "#7A7870", fontWeight: 500, display: "block", marginBottom: 6 }}>IMAGE URL *</label>
                    <input className={`ainp ${errors.img ? "err" : ""}`} placeholder="https://images.unsplash.com/…" value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))} />
                    {errors.img && <p style={{ fontSize: 11, color: "#C0392B", marginTop: 4 }}>{errors.img}</p>}
                  </div>
                  {form.img && (
                    <div style={{ border: "1px solid #E8E5E0", borderRadius: 10, padding: 12, display: "flex", gap: 14, alignItems: "center", background: "#FAF9F7" }}>
                      <img src={form.img} alt="" style={{ width: 56, height: 68, objectFit: "cover", borderRadius: 7, background: "#EDE8E0" }} onError={e => e.target.style.display = "none"} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 500 }}>{form.name || "Product name"}</p>
                        <p style={{ fontSize: 12, color: "#A09890", marginTop: 3 }}>{form.category} · {form.price ? `₹${Number(form.price).toLocaleString("en-IN")}` : "₹—"}</p>
                      </div>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, paddingTop: 4 }}>
                    {editing && <button className="ap ap-gh" onClick={cancelEdit}>CANCEL</button>}
                    <button className="ap ap-dk" style={{ padding: "11px 30px" }} onClick={handleSubmit}>
                      {editing ? "SAVE CHANGES" : "ADD TO STORE"}
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

/* ───────────── ROOT ───────────── */
export default function Root() {
  const [view, setView] = useState("store");
  const [products, setProducts] = useState(INIT);

  return (
    <div style={{ fontFamily: "'Inter','Helvetica Neue',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>

      {/* TOP SWITCHER */}
      <div style={{ position: "fixed", top: 16, right: 20, zIndex: 999, display: "flex", background: "rgba(28,28,26,0.92)", backdropFilter: "blur(12px)", borderRadius: 100, padding: "4px", gap: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.18)" }}>
        {[{ key: "store", label: "🛍 Store" }, { key: "admin", label: "⚙ Admin" }].map(({ key, label }) => (
          <button key={key} onClick={() => setView(key)}
            style={{ padding: "8px 20px", borderRadius: 100, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: 500, letterSpacing: ".08em", transition: "all .2s", background: view === key ? "#FAF9F7" : "transparent", color: view === key ? "#1C1C1A" : "#7A7870" }}>
            {label}
          </button>
        ))}
        <div style={{ display: "flex", alignItems: "center", paddingRight: 12, paddingLeft: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4CAF50", display: "inline-block" }} />
          <span style={{ fontSize: 10, color: "#5A9E5A", marginLeft: 5, letterSpacing: ".1em" }}>{products.length} LIVE</span>
        </div>
      </div>

      {view === "store" ? <Store products={products} /> : <Admin products={products} setProducts={setProducts} />}
    </div>
  );
}