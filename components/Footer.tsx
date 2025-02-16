import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-green-800 py-4 text-center">
      <p className="text-white text-sm">
        © {new Date().getFullYear()} STOA. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
