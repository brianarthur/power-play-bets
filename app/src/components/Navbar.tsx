import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar is-info is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-menu" id="navbarPPBets">
                <div className="navbar-start">
                    <Link to='/' className="navbar-item">
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;