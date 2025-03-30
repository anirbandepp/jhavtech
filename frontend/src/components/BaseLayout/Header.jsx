import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg border-bottom border-body">
            <div className="container-fluid">
                <NavLink className="navbar-brand"
                    to="https://github.com/anirbandepp/jhavtech"
                    target='_blank'>
                    Github Repository
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className="nav-link"
                            >
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/employee-tree"
                                className="nav-link"
                            >
                                View Tree
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header