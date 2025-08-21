import React, { useState, useEffect, useRef } from "react";

// --- SVG Icon for the Close Button (remains the same) ---
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const ContactForm = ({ show, onClose }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  // --- Store the GSAP timeline in a ref ---
  const tl = useRef(null);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  // --- FIX #2: The Corrected Animation Logic ---
  useEffect(() => {
    if (!window.gsap) return;
    const gsap = window.gsap;

    // Initialize the timeline only once
    if (!tl.current) {
      // Set the initial animation states (elements are already invisible via CSS)
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.set(cardRef.current, { opacity: 0, y: 60, scale: 0.95 });

      tl.current = gsap
        .timeline({
          paused: true,
          // When the REVERSE animation is complete, hide the container again
          onReverseComplete: () => {
            if (containerRef.current) {
              containerRef.current.classList.add("invisible");
            }
          },
        })
        // When the FORWARD animation starts, make the container visible
        .add(() => {
          if (containerRef.current) {
            containerRef.current.classList.remove("invisible");
          }
        })
        .to(overlayRef.current, { opacity: 1, duration: 0.3 })
        .to(
          cardRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power3.inOut",
          },
          "-=0.2"
        );
    }

    // Play or reverse the animation based on the 'show' prop
    if (show) {
      tl.current.play();
    } else {
      // Only reverse if the animation has played at all
      if (tl.current.progress() > 0) {
        tl.current.reverse();
      }
    }
  }, [show]); // This effect now correctly runs whenever 'show' changes

  // ... (rest of your component: handleChange, handleSubmit, JSX) remains the same
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!window.emailjs) {
      console.error("EmailJS SDK not loaded.");
      setStatus({
        state: "error",
        message: "An error occurred. Please refresh.",
      });
      return;
    }
    setStatus({ state: "sending", message: "Sending..." });
    const EMAILJS_PUBLIC_KEY =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";
    const EMAILJS_SERVICE_ID =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
    const EMAILJS_TEMPLATE_ID =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
    window.emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formData,
        EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus({
            state: "success",
            message: "Message sent successfully!",
          });
          setFormData({ from_name: "", from_email: "", message: "" });
          setTimeout(() => {
            onClose();
            setTimeout(() => setStatus({ state: "idle", message: "" }), 500);
          }, 2000);
        },
        (error) => {
          console.log("FAILED...", error);
          setStatus({
            state: "error",
            message: "Failed to send. Please try again.",
          });
        }
      );
  };
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 invisible"
    >
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      ></div>
      <div
        ref={cardRef}
        className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform-gpu"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <CloseIcon />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            I'd love to hear from you!
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="from_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                name="from_name"
                id="from_name"
                required
                value={formData.from_name}
                onChange={handleChange}
                className="form-input w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-600 transition"
              />
            </div>
            <div>
              <label
                htmlFor="from_email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                name="from_email"
                id="from_email"
                required
                value={formData.from_email}
                onChange={handleChange}
                className="form-input w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-600 transition"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                className="form-input w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-transparent rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-600 transition"
              ></textarea>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={status.state === "sending"}
              className="w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status.state === "sending" ? "Sending..." : "Send Message"}
            </button>
            <p
              className={`mt-4 text-sm h-5 ${
                status.state === "success"
                  ? "text-green-500"
                  : status.state === "error"
                  ? "text-red-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {status.message}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
