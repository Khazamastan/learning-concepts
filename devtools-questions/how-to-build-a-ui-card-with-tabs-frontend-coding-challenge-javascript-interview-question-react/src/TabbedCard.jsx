import * as React from "react";

const TAB_CONFIG = [
  {
    id: "overview",
    label: "Overview",
    description: "Short summary",
    content: (
      <div>
        <p>
          Give visitors the elevator pitch. Concise copy, one key metric, and a
          single call to action make the card scan-friendly.
        </p>
        <ul>
          <li>Highlight the value proposition.</li>
          <li>Add a prominent button below the fold.</li>
          <li>Keep the background calm so text is readable.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "features",
    label: "Features",
    description: "What you get",
    content: (
      <ul className="feature-list">
        <li>
          <span className="feature-title">Real-time metrics</span>
          <span className="feature-copy">Updated every 60 seconds.</span>
        </li>
        <li>
          <span className="feature-title">Collaboration</span>
          <span className="feature-copy">Invite teammates and share notes.</span>
        </li>
        <li>
          <span className="feature-title">Automation</span>
          <span className="feature-copy">Trigger workflows when KPIs change.</span>
        </li>
      </ul>
    ),
  },
  {
    id: "pricing",
    label: "Pricing",
    description: "Pick a plan",
    content: (
      <div className="pricing-grid">
        <div className="pricing-tier">
          <span className="tier-name">Starter</span>
          <span className="tier-price">$19</span>
          <span className="tier-copy">Essential dashboards for small teams.</span>
        </div>
        <div className="pricing-tier">
          <span className="tier-name">Pro</span>
          <span className="tier-price">$49</span>
          <span className="tier-copy">Unlimited projects and alerts.</span>
        </div>
        <div className="pricing-tier">
          <span className="tier-name">Enterprise</span>
          <span className="tier-price">{"Let's chat"}</span>
          <span className="tier-copy">SOC2 reports, SSO, and dedicated support.</span>
        </div>
      </div>
    ),
  },
];

export function TabbedCard() {
  const [activeTab, setActiveTab] = React.useState(TAB_CONFIG[0].id);
  const tabsRef = React.useRef([]);

  React.useEffect(() => {
    const index = TAB_CONFIG.findIndex((tab) => tab.id === activeTab);
    const node = tabsRef.current[index];
    if (node) {
      node.focus({ preventScroll: true });
    }
  }, [activeTab]);

  return (
    <article className="card" role="region" aria-labelledby="card-heading">
      <header className="card-header">
        <div className="card-meta">
          <h2 id="card-heading">Product Performance</h2>
          <p className="card-subtitle">
            Switch between tabs to explore different slices of the content.
          </p>
        </div>
        <nav className="tablist" aria-label="Card tabs">
          <ul role="tablist">
            {TAB_CONFIG.map((tab, index) => (
              <li key={tab.id}>
                <button
                  ref={(node) => {
                    tabsRef.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  className={
                    activeTab === tab.id ? "tab tab--active" : "tab"
                  }
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowRight") {
                      const next = (index + 1) % TAB_CONFIG.length;
                      setActiveTab(TAB_CONFIG[next].id);
                    } else if (event.key === "ArrowLeft") {
                      const prev =
                        (index + TAB_CONFIG.length - 1) % TAB_CONFIG.length;
                      setActiveTab(TAB_CONFIG[prev].id);
                    }
                  }}
                >
                  <span className="tab-label">{tab.label}</span>
                  <span className="tab-description">{tab.description}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {TAB_CONFIG.map((tab) => (
        <section
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={tab.id !== activeTab}
          className="tab-panel"
        >
          {tab.content}
        </section>
      ))}
    </article>
  );
}
