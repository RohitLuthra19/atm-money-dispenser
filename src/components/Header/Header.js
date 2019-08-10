import React from 'react';
import './Header.css';

function Header(props) {
  return (
    <div className="header-wrapper">
      <header className="header">
        {props.title}
      </header>
    </div>
  );
}

export default Header;
