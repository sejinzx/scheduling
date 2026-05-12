import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Layout = ({ date, setDate }) => {
  return (
    <div className="container">
      <Header date={date} setDate={setDate} />

      <Outlet context={{ date, setDate }} />

      <Footer />
    </div>
  );
};

export default Layout;
