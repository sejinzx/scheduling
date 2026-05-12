import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <span>© 2026 MyTodo</span>
      <span className="divider">|</span>
      <span className="link">이용약관</span>
      <span className="divider">|</span>
      <span className="link">개인정보처리방침</span>
    </footer>
  );
};

export default Footer;
