import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-4 left-0 bottom-4">
        <Navbar />
      </div>
      <main className="pl-[90px] p-4">
        <div className=" mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
