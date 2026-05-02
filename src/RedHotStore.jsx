import { useState, useEffect, useRef } from "react";

// ─── SHARED localStorage DB ──────────────────────────────────────────────────
const DB_KEY = "redhot_products";
const DB_EVENT = "redhot_update";

const SAMPLE_PRODUCTS = [
  { id: 1, name: "Flame Oversized Hoodie",  price: 4999,  category: "Men",         image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80",  affiliate_link: "#", badge: "HOT" },
  { id: 2, name: "Crimson Slip Dress",       price: 3499,  category: "Women",       image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&q=80",  affiliate_link: "#", badge: "NEW" },
  { id: 3, name: "Ember Leather Watch",      price: 12999, category: "Accessories", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80",  affiliate_link: "#", badge: "" },
  { id: 4, name: "Blaze Wireless Earbuds",   price: 7999,  category: "Electronics", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80",  affiliate_link: "#", badge: "HOT" },
  { id: 5, name: "Inferno Cargo Pants",      price: 5499,  category: "Men",         image: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=400&q=80",  affiliate_link: "#", badge: "" },
  { id: 6, name: "Scarlet Chain Necklace",   price: 2199,  category: "Accessories", image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400&q=80",  affiliate_link: "#", badge: "NEW" },
  { id: 7, name: "Heat Sensor Smart Watch",  price: 18999, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",  affiliate_link: "#", badge: "" },
  { id: 8, name: "Lava Crop Jacket",         price: 6799,  category: "Women",       image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80",  affiliate_link: "#", badge: "HOT" },
];

function readDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(DB_KEY, JSON.stringify(SAMPLE_PRODUCTS));
  return SAMPLE_PRODUCTS;
}

function useProducts() {
  const [products, setProducts] = useState(readDB);

  useEffect(() => {
    const onSameTab = () => setProducts(readDB());
    const onOtherTab = (e) => { if (e.key === DB_KEY) setProducts(readDB()); };
    window.addEventListener(DB_EVENT, onSameTab);
    window.addEventListener("storage", onOtherTab);
    return () => {
      window.removeEventListener(DB_EVENT, onSameTab);
      window.removeEventListener("storage", onOtherTab);
    };
  }, []);

  return products;
}
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Men", "Women", "Accessories", "Electronics"];

export default function RedHotStore() {
  const products = useProducts();

  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");
  const [sort, setSort]           = useState("default");
  const [wishlist, setWishlist]   = useState([]);
  const [redirecting, setRedirecting] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => { setTimeout(() => setHeroVisible(true), 80); }, []);

  const filtered = products
    .filter(p => {
      const q = search.toLowerCase();
      return (
        (p.name || "").toLowerCase().includes(q) &&
        (category === "All" || p.category === category)
      );
    })
    .sort((a, b) => {
      if (sort === "price_asc")  return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "name")       return (a.name || "").localeCompare(b.name || "");
      return 0;
    });

  const toggleWishlist = (id) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const handleBuy = (product) => {
    setRedirecting(product.id);
    setTimeout(() => {
      setRedirecting(null);
      if (product.affiliate_link && product.affiliate_link !== "#") {
        window.open(product.affiliate_link, "_blank");
      } else {
        alert("Affiliate link not set for this product.");
      }
    }, 1100);
  };

  return (
    <div style={{ fontFamily:"'Jost',sans-serif", minHeight:"100vh", background:"#0a0a0a", color:"#f5e6d3" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-thumb { background:#c0392b; }
        .rhs-card { background:#111; border:1px solid #1a1a1a; border-radius:8px; overflow:hidden; transition:transform .35s, box-shadow .35s; }
        .rhs-card:hover { transform:translateY(-8px); box-shadow:0 24px 48px rgba(192,57,43,.22); }
        .rhs-pill { border:1px solid #333; color:#888; padding:8px 18px; border-radius:3px; font-family:'Jost',sans-serif; font-size:11px; letter-spacing:.15em; cursor:pointer; background:transparent; transition:all .2s; }
        .rhs-pill:hover { border-color:#555; color:#f5e6d3; }
        .rhs-pill.active { background:linear-gradient(135deg,#c0392b,#e74c3c); border-color:transparent; color:#fff; }
        .rhs-inp { width:100%; background:#111; border:1px solid #222; color:#f5e6d3; padding:10px 14px; border-radius:4px; font-size:13px; font-family:'Jost',sans-serif; outline:none; transition:border-color .2s; }
        .rhs-inp:focus { border-color:#c0392b; }
        .rhs-buy { background:linear-gradient(135deg,#c0392b,#e74c3c); border:none; color:#fff; padding:8px 20px; border-radius:3px; font-family:'Jost',sans-serif; font-size:11px; letter-spacing:.15em; font-weight:600; cursor:pointer; transition:all .2s; }
        .rhs-buy:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(192,57,43,.35); }
        .hero-fade { opacity:0; transform:translateY(28px); transition:opacity .9s, transform .9s; }
        .hero-fade.in { opacity:1; transform:translateY(0); }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>

      {redirecting && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,.85)", zIndex:999, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:18 }}>
          <div style={{ width:36, height:36, border:"3px solid #333", borderTopColor:"#c0392b", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
          <div style={{ fontSize:13, letterSpacing:"0.2em", color:"#888" }}>REDIRECTING…</div>
        </div>
      )}

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:50, background:"rgba(10,10,10,.96)", backdropFilter:"blur(12px)", borderBottom:"1px solid #1a1a1a", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 32px" }}>
        <div style={{ fontFamily:"'Playfair Display'", fontSize:22, fontWeight:900, color:"#c0392b" }}>
          redhot <span style={{ fontSize:18 }}>🔥</span>
        </div>
        {wishlist.length > 0 && (
          <span style={{ fontSize:11, letterSpacing:"0.15em", color:"#555" }}>
            ♥ {wishlist.length} SAVED
          </span>
        )}
      </nav>

      {/* HERO */}
      <div style={{ textAlign:"center", padding:"72px 32px 48px", borderBottom:"1px solid #111" }}>
        <div className={`hero-fade ${heroVisible ? "in" : ""}`}>
          <div style={{ fontSize:11, letterSpacing:"0.35em", color:"#c0392b", marginBottom:16, fontWeight:600 }}>NEW ARRIVALS</div>
          <h1 style={{ fontFamily:"'Playfair Display'", fontSize:"clamp(36px,6vw,72px)", fontWeight:900, lineHeight:1.1, marginBottom:16 }}>
            Discover What's<br />
            <span style={{ color:"#c0392b" }}>Burning Hot</span>
          </h1>
          <p style={{ fontSize:14, color:"#555", letterSpacing:"0.1em", maxWidth:400, margin:"0 auto" }}>
            Curated drops. Every piece on fire.
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"32px 32px 0" }}>
        <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:20 }}>
          <input
            className="rhs-inp"
            placeholder="🔍  Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex:1, minWidth:200 }}
          />
          <select value={sort} onChange={e => setSort(e.target.value)} className="rhs-inp" style={{ width:"auto", cursor:"pointer" }}>
            <option value="default">Sort: Default</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>

        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:28 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} className={`rhs-pill ${category === cat ? "active" : ""}`} onClick={() => setCategory(cat)}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ fontSize:11, letterSpacing:"0.18em", color:"#333", marginBottom:28 }}>
          SHOWING {filtered.length} OF {products.length} PRODUCTS
        </div>
      </div>

      {/* GRID */}
      <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 32px 80px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"100px 0", color:"#333" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🔥</div>
            <div style={{ fontSize:12, letterSpacing:"0.2em" }}>NO PRODUCTS FOUND</div>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:24 }}>
            {filtered.map(product => (
              <div key={product.id} className="rhs-card">
                <div style={{ position:"relative" }}>
                  <img
                    src={product.image || "https://via.placeholder.com/300x300?text=No+Image"}
                    alt={product.name}
                    style={{ width:"100%", height:280, objectFit:"cover", display:"block" }}
                    onError={e => { e.target.src = "https://via.placeholder.com/300x300?text=No+Image"; }}
                  />
                  {product.badge && (
                    <span style={{ position:"absolute", top:12, left:12, background: product.badge === "HOT" ? "#c0392b" : "#1a2a3a", color:"#fff", fontSize:9, letterSpacing:"0.2em", fontWeight:700, padding:"3px 10px", borderRadius:2, fontFamily:"'Jost',sans-serif" }}>
                      {product.badge}{product.badge === "HOT" ? " 🔥" : ""}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    style={{ position:"absolute", top:10, right:10, background:"rgba(0,0,0,.55)", backdropFilter:"blur(4px)", border:"none", borderRadius:"50%", width:34, height:34, display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, cursor:"pointer", color: wishlist.includes(product.id) ? "#c0392b" : "#888", transition:"color .2s" }}
                  >
                    {wishlist.includes(product.id) ? "♥" : "♡"}
                  </button>
                </div>
                <div style={{ padding:"18px 16px" }}>
                  <div style={{ fontSize:9, letterSpacing:"0.22em", color:"#444", marginBottom:5 }}>
                    {(product.category || "").toUpperCase()}
                  </div>
                  <h3 style={{ fontFamily:"'Playfair Display'", fontSize:16, fontWeight:700, marginBottom:14, lineHeight:1.3 }}>
                    {product.name}
                  </h3>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontSize:17, fontWeight:600, color:"#c0392b" }}>
                      ₹{(product.price || 0).toLocaleString()}
                    </span>
                    <button className="rhs-buy" onClick={() => handleBuy(product)}>BUY →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}