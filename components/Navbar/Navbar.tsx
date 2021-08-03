import React from 'react'
import { Link } from 'react-router-dom';
import './NavBar.scss';

const Navbar: React.FC = () : JSX.Element => {
    return (
      <header>
        <nav className="navbar">
            <div className="container">
                <Link className="navbar_item" to="/home">Yii + React App</Link>
                <div className="navbar_wrapper">
                    <Link className="navbar_item" to="/users">Users</Link>
                    <Link className="navbar_item" to="/home">Home</Link>
                </div>
            </div>
        </nav>
      </header>
    )
  }
  
export { Navbar };