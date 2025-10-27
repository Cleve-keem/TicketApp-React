import Hero from "../components/Hero";

export default function Landing() {
  return (
    <section aria-labelledby="main-heading" style={{ paddingBottom: 20 }}>
      <Hero />
      <div className="container">
        <div className="card-grid">
          <div className="card">
            <h3>Manage tickets</h3>
            <p className="helper">
              Create, view, edit and delete tickets with strict validation and
              visual feedback.
            </p>
          </div>
          <div className="card">
            <h3>Protected views</h3>
            <p className="helper">
              Dashboard and ticket manager are protected — only accessible after
              login.
            </p>
          </div>
          <div className="card">
            <h3>Accessible & responsive</h3>
            <p className="helper">
              Semantic HTML, visible focus states, and a mobile-first responsive
              layout.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
