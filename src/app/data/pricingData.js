import React from "react";
import { gradients } from "./constants";

export const getPricingTiers = (annualBilling) => [
  {
    title: "Frontend Only",
    description: "Perfect for static websites and content presentation",
    price: annualBilling ? "KES 12,000" : "KES 15,000",
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
    gradient: gradients[0],
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
    price: annualBilling ? "KES 12,000" : "KES 25,000",
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
    gradient: gradients[1],
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
    price: annualBilling ? "KES 15,000" : "KES 45,000",
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
    gradient: gradients[2],
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
