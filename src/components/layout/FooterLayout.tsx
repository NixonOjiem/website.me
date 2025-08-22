import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
interface FooterLayoutProps {
  onContactClick: () => void;
}

const FooterLayout: React.FC<FooterLayoutProps> = ({ onContactClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  // handle Contact clicked.
  const handleContactClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault(); // Prevent navigation
    onContactClick(); // Call the function passed from the parent
    setIsOpen(false); // Close mobile menu if open
  };
  return (
    <footer className="bg-[#2B6879] w-full mt-auto flex flex-col items-center justify-center px-6 py-12">
      {/* Contact Me */}
      <div className="max-w-3xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Contact Me
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Got a project, idea, or just want to say hi? Let’s connect.
        </p>
        <a
          onClick={handleContactClick}
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-md shadow-md hover:scale-105 transform transition-all duration-200"
        >
          Say Hello
        </a>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-200 dark:bg-gray-700 my-10"></div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-6 justify-center text-gray-600 dark:text-gray-400">
        <a href="/services" className="hover:text-blue-500 transition">
          Services
        </a>
        <a href="/projects" className="hover:text-blue-500 transition">
          Projects
        </a>
        <a href="/contact" className="hover:text-blue-500 transition">
          Contact me
        </a>
      </div>

      {/* Social Icons */}
      <div className="flex gap-6 mt-6">
        <a
          href="https://github.com/NixonOjiem"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
        >
          <FaGithub size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/nicksonojiem/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
        >
          <FaLinkedin size={24} />
        </a>
        {/* <a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition"
        >
          <FaTwitter size={24} />
        </a> */}
      </div>

      {/* Copyright */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
        © {new Date().getFullYear()} Nixon Ojiem. All rights reserved.
      </p>
    </footer>
  );
};

export default FooterLayout;
