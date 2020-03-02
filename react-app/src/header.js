import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const headerStyle = {
      margin: '50px auto'
    }
    return (
      <div style={headerStyle}>
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Link className="nav-link active" to="/menu">Menu</Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to='/inventory'>Inventory</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/ingredient'>Ingredient</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Header;