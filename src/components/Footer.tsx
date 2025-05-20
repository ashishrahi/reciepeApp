import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 text-center py-4">
      &copy; {new Date().getFullYear()} Your Company. All rights reserved.
    </footer>
  );
};

export default Footer;
