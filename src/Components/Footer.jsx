import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-10">
      <div className="container mx-auto">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Your Clinic Name. All rights
          reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
