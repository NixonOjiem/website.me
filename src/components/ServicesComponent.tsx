import React, { useState } from "react";

function ServicesComponent() {
  const [annualBilling, setAnnualBilling] = useState(false);

  const pricingTiers = [
    {
      title: "Frontend Only",
      description: "Perfect for static websites and content presentation",
      price: annualBilling ? "$799" : "$999",
      billing: annualBilling ? "/year" : "/project",
      features: [
        "Responsive Design",
        "Modern UI/UX Implementation",
        "SEO Optimization",
        "Cross-browser Compatibility",
        "Contact Forms",
        "1 Month Support",
      ],
      cta: "Get Started",
      popular: false,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
      ),
    },
    {
      title: "Full Stack Basic",
      description: "Dynamic websites with backend functionality",
      price: annualBilling ? "$1,999" : "$2,499",
      billing: annualBilling ? "/year" : "/project",
      features: [
        "Everything in Frontend Only",
        "Custom Backend Development",
        "Database Integration",
        "User Authentication",
        "Content Management System",
        "API Integrations",
        "3 Months Support",
      ],
      cta: "Get Started",
      popular: true,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          ></path>
        </svg>
      ),
    },
    {
      title: "E-Commerce & Payments",
      description: "Complete online stores with payment processing",
      price: annualBilling ? "$3,999" : "$4,999",
      billing: annualBilling ? "/year" : "/project",
      features: [
        "Everything in Full Stack",
        "Payment Gateway Integration",
        "Shopping Cart System",
        "Inventory Management",
        "Order Processing",
        "SSL Certificate",
        "E-commerce Analytics",
        "6 Months Support",
      ],
      cta: "Get Started",
      popular: false,
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          ></path>
        </svg>
      ),
    },
  ];

  return (
    <>
      <section className="services-section">
        {/* Hero Section */}
        <div className="services-hero pt-[3rem]">
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

                <button className="card-cta">{tier.cta}</button>
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
            {/* Service 1: Frontend Development */}
            <div className="service-item">
              <div className="service-icon">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="service-title">Dynamic Frontend Development</h3>
              <p className="service-description">
                Building responsive, accessible, and scalable user interfaces
                with modern frameworks like React, Next.js, and Vue.js to
                deliver a seamless user experience.
              </p>
            </div>

            {/* Service 2: Backend & API Development */}
            <div className="service-item">
              <div className="service-icon">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                  ></path>
                </svg>
              </div>
              <h3 className="service-title">Backend & API Development</h3>
              <p className="service-description">
                Engineering robust server-side solutions using Node.js, Express,
                and Laravel. I design and integrate RESTful APIs and GraphQL for
                efficient data communication.
              </p>
            </div>

            {/* Service 3: Full-Stack Solutions */}
            <div className="service-item">
              <div className="service-icon">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  ></path>
                </svg>
              </div>
              <h3 className="service-title">Full-Stack Solutions</h3>
              <p className="service-description">
                From concept to deployment, I build complete, end-to-end
                applications, including e-commerce platforms and specialized
                systems for sectors like healthcare.
              </p>
            </div>

            {/* Service 4: Database Management */}
            <div className="service-item">
              <div className="service-icon">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7a8 8 0 0116 0"
                  ></path>
                </svg>
              </div>
              <h3 className="service-title">Database Management</h3>
              <p className="service-description">
                Managing structured and unstructured data with expertise in
                MySQL, PostgreSQL, and MongoDB to ensure data integrity,
                security, and performance.
              </p>
            </div>

            {/* Service 5: DevOps & Automation */}
            <div className="service-item">
              <div className="service-icon">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="service-title">DevOps & Automation</h3>
              <p className="service-description">
                Implementing CI/CD pipelines with GitHub Actions and using
                Docker for containerization to streamline development workflows
                and enhance deployment reliability.
              </p>
            </div>

            {/* Service 6: SEO & Performance */}
            <div className="service-item">
              <div className="service-icon">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  ></path>
                </svg>
              </div>
              <h3 className="service-title">SEO & Performance Optimization</h3>
              <p className="service-description">
                Improving your site's visibility with on-page (technical,
                content) and off-page (backlinks) SEO strategies, plus
                performance tuning for faster load times.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-section {
          padding: 4rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .services-hero {
          text-align: center;
          margin-bottom: 4rem;
        }

        .services-heading {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #2b6879 0%, #16353d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .services-subheading {
          font-size: 1.2rem;
          color: #666;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
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
          color: #2b6879;
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
          background-color: #ccc;
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
          background-color: #2b6879;
        }

        input:checked + .toggle-slider:before {
          transform: translateX(30px);
        }

        .discount-badge {
          background: #ffd700;
          color: #333;
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
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #eaeaea;
          display: flex;
          flex-direction: column;
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
          background: #2b6879;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
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
          color: #2b6879;
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
          background: #2b6879;
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-top: auto;
        }

        .card-cta:hover {
          background: #16353d;
        }

        /* Services Grid */
        .services-grid-section {
          margin: 6rem 0;
        }

        .services-grid-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 700;
          color: #2b6879;
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
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .service-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .service-icon {
          color: #2b6879;
          margin-bottom: 1rem;
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
