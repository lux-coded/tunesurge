import React from 'react';
import './Nav.scss';

class Nav extends React.Component {

  render() {
    return (
      <nav>
        <a href='/'>
          <h1 id='nav-logo'>TuneSurge</h1>
        </a>
        <h1>Links</h1>
      </nav>
    );
  }
}

export default Nav;
