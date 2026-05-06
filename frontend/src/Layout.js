import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";

const Layout = ({ date, setDate }) => {
  return (
    <div className="container">
      <Header date={date} setDate={setDate} />
      <Main date={date} />
      <Footer />
    </div>
  );
};

export default Layout;
