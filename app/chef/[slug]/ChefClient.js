"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const BG = ["#FEF3C7","#FEE2E2","#E0F2FE","#F3E8FF","#ECFDF5","#FFF7ED"];
const DISH_BG = ["#FEF9EC","#FFF0EE","#EEF7FF"];

export default function ChefClient({ chef, dishes }) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [toast, setToast] = useState(null);
  const [count, setCount] = useState(chef.follower_count || 0);

  useEffect(() => {
    if (localStorage.getItem(`following_${chef.id}`)) setIsFollowing(true);
  }, [chef.id]);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleFollow(e) {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    localStorage.setItem(`following_${chef.id}`, "1");
    setIsFollowing(true);
    setCount((c) => c + 1);
    setShowModal(false);
    showToast(`Following Chef ${chef.name.split(" ")[0]}! You'll get updates on WhatsApp.`);
  }

  function handleOrder(platform) {
    const url = platform === "zomato" ? chef.zomato_url : chef.swiggy_url;
    if (url) window.open(url, "_blank");
    else showToast("Order link not set yet");
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo" style={{cursor:"pointer"}} onClick={() => router.push("/")}>Chef<span style={{color:"#C4570A"}}>On</span>Me</div>
      </nav>
      <main className="page-content">
        <button className="back-btn" onClick={() => router.back()}>← Back</button>

        <div className="profile-hero">
          <div className="profile-avatar" style={{ background: BG[chef.name.length % BG.length] }}>
            {chef.photo_url
              ? <img src={chef.photo_url} alt={chef.name} style={{ width:"100%", height:"100%", borderRadius:"50%", objectFit:"cover" }} />
              : "👨‍🍳"}
          </div>
          <div style={{ flex: 1 }}>
            <div className="profile-name">{chef.name}</div>
            <div className="profile-cuisine">{chef.specialty} · {chef.city}</div>
            <div className="profile-stats">
              <div className="stat"><div className="val">{count.toLocaleString()}</div><div className="lbl">followers</div></div>
              <div className="stat"><div className="val">★ {chef.rating}</div><div className="lbl">{chef.review_count} reviews</div></div>
              <div className="stat"><div className="val">{dishes.length}</div><div className="lbl">dishes</div></div>
            </div>
            <button
              className={`btn ${isFollowing ? "btn-follow-active" : "btn-primary"}`}
              onClick={() => !isFollowing && setShowModal(true)}
            >
              {isFollowing ? `✓ Following ${chef.name.split(" ")[0]}` : `+ Follow ${chef.name.split(" ")[0]}`}
            </button>
          </div>
        </div>

        {chef.bio && (
          <div className="chef-story">
            <blockquote>"{chef.bio}"</blockquote>
          </div>
        )}

        <div className="order-strip">
          <p>Order {chef.name.split(" ")[0]}'s food on your preferred delivery app</p>
          <button className="btn btn-zomato" onClick={() => handleOrder("zomato")}>🔴 Zomato</button>
          <button className="btn btn-swiggy" onClick={() => handleOrder("swiggy")}>🟠 Swiggy</button>
        </div>

        {dishes.length > 0 && (
          <div className="dishes-section">
            <div className="section-label">Signature dishes</div>
            <div className="dishes-grid">
              {dishes.map((dish, i) => (
                <div key={dish.id} className="dish-card">
                  <div className="dish-img" style={{ background: DISH_BG[i % DISH_BG.length] }}>
                    {dish.photo_url
                      ? <img src={dish.photo_url} alt={dish.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      : "🍽️"}
                    {dish.is_exclusive && <div className="exclusive-tag">Only here</div>}
                  </div>
                  <div className="dish-body">
                    <div className="dish-name">{dish.name}</div>
                    {dish.price_approx && <div className="dish-price">₹{dish.price_approx}</div>}
                    {dish.description && <div className="dish-desc">{dish.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Follow Chef {chef.name.split(" ")[0]}</h3>
            <p>Get a WhatsApp message when {chef.name.split(" ")[0]} adds a new dish. No spam.</p>
            <form onSubmit={handleFollow}>
              <div className="form-group">
                <label className="form-label">Your name (optional)</label>
                <input className="form-input" type="text" placeholder="e.g. Rahul" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">WhatsApp number *</label>
                <input className="form-input" type="tel" placeholder="10-digit number" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} required />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Follow & Get Updates</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}