import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 bg-gray-900 text-white text-center relative bottom-0">
      <div className="max-w-screen-xl mx-auto flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
        <div className="font-semibold">
          © {new Date().getFullYear()} Pratham
        </div>
        <div className="text-sm">
          <a
            href="/privacy"
            className="underline mr-4 text-white hover:text-gray-300"
          >
            Privacy Policy
          </a>
          <a href="/terms" className="underline text-white hover:text-gray-300">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
