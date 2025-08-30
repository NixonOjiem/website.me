import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useContactForm } from "@/app/context/ContactFormContext";
interface FooterLayoutProps {
  onContactClick?: () => void;
}

const FooterLayout: React.FC<FooterLayoutProps> = () => {
  const { openContactForm } = useContactForm();
  return (
    <footer className="w-full bg-gradient-to-br from-[#2b6879ff] via-[#357f94] to-black text-gray-300 px-6 py-12 relative overflow-hidden">
      {/* Animated background accent */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-indigo-500 via-[#8b718a] to-transparent animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand / About */}
        <div className="flex flex-col items-start space-y-3">
          {/* SVG Logo */}
          <div className="p-3 bg-[#357f94] rounded-full hover:scale-105 transition-transform duration-300">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current text-[#8b718a]"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            Nixon Ojiem
          </h2>
          <p className="text-sm leading-6 text-white max-w-xs">
            Full-stack developer crafting scalable, visually unique solutions.
            Always building for performance, clarity, and impact.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/projects"
                className="hover:text-[#8b718a] transition-colors"
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-[#8b718a] transition-colors"
              >
                Services
              </Link>
            </li>
            <li
              className="hover:text-[#8b718a] transition-colors"
              onClick={openContactForm}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
          <div className="flex space-x-5">
            <Link
              href="https://github.com/NixonOjiem"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#357f94] hover:bg-[#8b718a] hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <FaGithub size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/nicksonojiem/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#357f94] hover:bg-[#8b718a] hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <FaLinkedin size={20} />
            </Link>
            <Link
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#357f94] hover:bg-[#8b718a] hover:text-white transition-all duration-300 transform hover:scale-110"
            >
              <FaTwitter size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative mt-10 border-t border-[#357f94] pt-5 text-center text-xs text-white">
        © {new Date().getFullYear()} Nixon Ojiem. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterLayout;
