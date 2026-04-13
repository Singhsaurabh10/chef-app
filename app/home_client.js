"use client";
import { useState } from "react";
import Link from "next/link";

const BG = ["#FEF3C7","#FEE2E2","#E0F2FE","#F3E8FF","#ECFDF5","#FFF7ED"];
const EMOJI = ["👨‍🍳","👩‍🍳","🧑‍🍳","👨‍🍳","👩‍🍳","🧑‍🍳"];

export default function HomeClient({ chefs, cuisines }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? chefs : chefs.filter((c) => c.cuisine_type === filter);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">Chef<span>On</span>Me</div>
      </nav>
      <main className="page-content">
        <div className="hero">
          <h1>Order from the <em>chef</em>,<br />not the restaurant</h1>
          <p>Every chef has a story. Every dish has a reason. Find yours.</p>
        </div>
        <div className="filter-bar">
          {cuisines.map((c) => (
            <div key={c} className={`filter-pill ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</div>
          ))}
        </div>
        <div className="chefs-grid">
          {filtered.map((chef, i) => (
            <Link key={chef.id} href={`/chef/${chef.slug || chef.id}`}>
              <div className="chef-card">
                <div className="chef-card-img" style={{ background: BG[i % BG.length] }}>
                  {chef.photo_url
                    ? <img src={chef.photo_url} alt={chef.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span>{EMOJI[i % EMOJI.length]}</span>}
                  {chef.subscription_tier === "premium" && <div className="featured-badge">★ Featured</div>}
                </div>
                <div className="chef-card-body">
                  <h2>{chef.name}</h2>
                  <div className="chef-specialty">{chef.specialty} · {chef.city}</div>
                  <div className="chef-meta">
                    <span>★ {chef.rating}</span>
                    <span>{(chef.follower_count || 0).toLocaleString()} followers</span>
                  </div>
                  <div className="chef-actions">
                    <span className="btn btn-primary btn-sm">View Chef →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}