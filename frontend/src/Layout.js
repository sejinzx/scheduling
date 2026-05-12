import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import TodoMain from "./Main/TodoMain";

const Layout = ({ date, setDate }) => {
  return (
    <div className="container">
      <Header date={date} setDate={setDate} />
      <TodoMain date={date} />
      <Footer />
    </div>
  );
};

export default Layout;
