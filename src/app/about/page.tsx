export default function AboutPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#FAFBFB", color: "#111", fontFamily: "-apple-system, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 12, letterSpacing: "0.1em", color: "#888", marginBottom: 8 }}>SYSTEM PROFILE</p>
        <h1 style={{ fontSize: 32, margin: "0 0 16px", fontWeight: 700 }}>About & Leadership</h1>
        <p style={{ color: "#666", fontSize: 14 }}>Stack, Design & Campus Roles — Coming Soon</p>
        <a href="/" style={{ color: "#1870C5", fontSize: 13, marginTop: 24, display: "inline-block" }}>‹ Back to Menu</a>
      </div>
    </main>
  );
}
