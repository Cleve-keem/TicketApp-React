export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title" data-testid="">
      <div className="decorative-circle circle-1" aria-hidden="true"></div>
      <div className="decorative-circle circle-2" aria-hidden="true"></div>

      <div className="hero-inner container" style={{ maxWidth: 1200 }}>
        <div>
          <h1 id="hero-title">TicketApp — Manage support tickets easily</h1>
          <p>
            Build a robust ticket workflow with create, view, update, and delete
            functionality. Authentication is simulated and pages are protected
            via a session token stored in localStorage under
            <code>ticketapp_session</code>.
          </p>
          <div className="hero-cta">
            <a href="/auth/login" className="btn primary" role="button">
              Login
            </a>
            <a href="/auth/signup" className="btn ghost" role="button">
              Get Started
            </a>
          </div>
        </div>

        <div className="card" aria-hidden="false">
          <h3 style={{ marginTop: 0 }}>Quick stats</h3>
          <p className="helper">
            Preview how the Dashboard will show aggregated ticket counts.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <div style={{ flex: 1 }} className="card">
              <div className="stat-title">
                <p>Total tickets</p>
              </div>
              <div className="stat-value">—</div>
            </div>
            <div style={{ flex: 1 }} className="card">
              <div className="stat-title">
                <p>Open</p>
              </div>
              <div className="stat-value">—</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: "white" }}
        >
          <path
            d="M0,0 C300,150 900,-50 1200,100 L1200,200 L0,200 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
