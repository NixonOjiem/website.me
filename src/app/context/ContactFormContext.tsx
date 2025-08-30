"use client";

import { createContext, useContext } from "react";

// Define the shape of the context data
interface ContactFormContextType {
  openContactForm: () => void;
}

// Create the context with a default empty function
const ContactFormContext = createContext<ContactFormContextType>({
  openContactForm: () => {},
});

// Create a custom hook for easy access to the context
export const useContactForm = () => {
  return useContext(ContactFormContext);
};

export default ContactFormContext;
