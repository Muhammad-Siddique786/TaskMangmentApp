import React from 'react'

const Footer = () => {
  const fullyear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white text-center py-4 mt-auto">
      <p className="text-sm">
        &copy; {fullyear} Task Management App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer
