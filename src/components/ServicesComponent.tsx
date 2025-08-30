import React, { useState } from "react";
import { services } from "../app/data/servicesData";
import { getPricingTiers } from "../app/data/pricingData";

function ServicesComponent() {
  const [annualBilling, setAnnualBilling] = useState(false);

  // Get the pricing tiers based on the current billing state
  const pricingTiers = getPricingTiers(annualBilling);

  return (
    <>
      <section className="services-section ">
        {/* Hero Section */}
        <div className="services-hero ">
          <h1 className="services-heading">
            Digital Solutions That Drive Growth
          </h1>
          <p className="services-subheading">
            From dynamic front-end experiences to robust back-end systems, I
            provide end-to-end development services to bring your vision to
            life.
          </p>
        </div>

        {/* Pricing Section */}
        <div className="pricing-section">
          <div className="pricing-header">
            <h2 className="pricing-title">Transparent Pricing</h2>
            <p className="pricing-subtitle">
              Choose the plan that works for your business
            </p>

            <div className="billing-toggle">
              <span className={!annualBilling ? "active" : ""}>
                Monthly Billing
              </span>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={annualBilling}
                  onChange={() => setAnnualBilling(!annualBilling)}
                />
                <span className="toggle-slider"></span>
              </label>
              <span className={annualBilling ? "active" : ""}>
                Annual Billing
              </span>
              <span className="discount-badge">Save 20%</span>
            </div>
          </div>

          <div className="pricing-cards">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`pricing-card ${tier.popular ? "popular" : ""}`}
              >
                {tier.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}

                <div className="card-header">
                  <div className="card-icon">{tier.icon}</div>
                  <h3 className="card-title">{tier.title}</h3>
                  <p className="card-description">{tier.description}</p>
                </div>

                <div className="card-price">
                  <span className="price-amount">{tier.price}</span>
                  <span className="price-billing">{tier.billing}</span>
                </div>

                <ul className="card-features">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="feature-item">
                      <svg
                        className="feature-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`card-cta bg-gradient-to-r ${tier.gradient}`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-grid-section">
          <h2 className="services-grid-title">
            Comprehensive Development Services
          </h2>
          <p className="services-grid-subtitle">
            I offer a full range of services to meet your digital needs
          </p>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-item">
                <div
                  className={`service-icon-container bg-gradient-to-br ${service.gradient}`}
                >
                  <div className="service-icon">{service.icon}</div>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Your existing CSS styles go here... */
        .services-section {
          padding: 4rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .services-hero {
          text-align: center;
          margin-bottom: 4rem;
          background: linear-gradient(
            135deg,
            #0f766e 0%,
            #0d9488 50%,
            #06b6d4 100%
          );
          padding: 3rem 2rem;
          border-radius: 16px;
          color: white;
          margin-top: 4rem;
        }

        .services-heading {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .services-subheading {
          font-size: 1.2rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
          opacity: 0.9;
        }

        /* Pricing Section */
        .pricing-section {
          margin: 5rem 0;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .pricing-title {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #2b6879 0%, #16353d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .pricing-subtitle {
          color: #666;
          margin-bottom: 1.5rem;
        }

        .billing-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .billing-toggle span {
          color: #888;
          font-weight: 500;
        }

        .billing-toggle span.active {
          color: #2b6879;
          font-weight: 600;
        }

        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 30px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to right, #0d9488, #06b6d4);
          transition: 0.4s;
          border-radius: 34px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 22px;
          width: 22px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }

        input:checked + .toggle-slider {
          background: linear-gradient(to right, #06b6d4, #0d9488);
        }

        input:checked + .toggle-slider:before {
          transform: translateX(30px);
        }

        .discount-badge {
          background: linear-gradient(to right, #f59e0b, #ef4444);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-left: 0.5rem;
        }

        .pricing-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .pricing-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #eaeaea;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .pricing-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(to right, #0d9488, #06b6d4);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .pricing-card:hover::before {
          opacity: 1;
        }

        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }

        .pricing-card.popular {
          border: 2px solid #2b6879;
          transform: scale(1.03);
        }

        .popular-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(to right, #ec4899, #ef4444);
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 4px 10px rgba(236, 72, 153, 0.3);
        }

        .card-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .card-icon {
          color: #2b6879;
          margin-bottom: 1rem;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2b6879;
          margin-bottom: 0.5rem;
        }

        .card-description {
          color: #666;
          font-size: 0.9rem;
        }

        .card-price {
          text-align: center;
          margin: 1.5rem 0;
        }

        .price-amount {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #2b6879 0%, #16353d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .price-billing {
          color: #888;
          font-size: 0.9rem;
        }

        .card-features {
          list-style: none;
          padding: 0;
          margin: 1.5rem 0;
          flex-grow: 1;
        }

        .feature-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
          color: #444;
        }

        .feature-icon {
          width: 1.2rem;
          height: 1.2rem;
          color: #2b6879;
          margin-right: 0.75rem;
          flex-shrink: 0;
        }

        .card-cta {
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }

        /* Services Grid */
        .services-grid-section {
          margin: 6rem 0;
        }

        .services-grid-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #2b6879 0%, #16353d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .services-grid-subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 3rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .service-item {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .service-item::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(to right, #0d9488, #06b6d4);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .service-item:hover::after {
          opacity: 1;
        }

        .service-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .service-icon-container {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          border-radius: 16px;
          margin-bottom: 1.5rem;
          color: white;
        }

        .service-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #2b6879;
          margin-bottom: 1rem;
        }

        .service-description {
          color: #666;
          line-height: 1.6;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .services-heading {
            font-size: 2rem;
          }

          .services-hero {
            padding: 2rem 1rem;
          }

          .pricing-cards {
            grid-template-columns: 1fr;
          }

          .pricing-card.popular {
            transform: scale(1);
          }

          .billing-toggle {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  );
}

export default ServicesComponent;
