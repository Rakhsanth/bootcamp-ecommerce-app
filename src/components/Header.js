import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// action creator
import { logout } from '../actions';
// Global variables
const btnBorderBlueLight = 'rgb(40, 150, 169)';
const lightGreySearchBarBorder = 'rgb(152, 149, 134)';

function Header(props) {
    const { loading, isLoggedIn } = props;
    const { logout } = props;

    const openMenu = () => {
        const sidenav = document.querySelector('.sidenav');
        sidenav.style.width = '100vw';
    };

    const closeMenu = (event) => {
        console.log(event);
        if (
            event.target.id === 'sidenav' ||
            event.target.id === 'sidenav-close'
        ) {
            const sidenav = document.querySelector('.sidenav');
            sidenav.style.width = '0vw';
        }
    };

    const searchInputFocus = () => {
        const headerSearchArea = document.querySelector('.top-header-search');
        const headerSearchIcon = document.querySelector(
            '.top-header-search-icons-icon'
        );
        headerSearchArea.style.border = `2px solid ${btnBorderBlueLight}`;
        headerSearchIcon.style.fill = `${btnBorderBlueLight}`;
    };
    const searchInputFocusOut = () => {
        const headerSearchArea = document.querySelector('.top-header-search');
        const headerSearchIcon = document.querySelector(
            '.top-header-search-icons-icon'
        );
        headerSearchArea.style.border = `2px solid ${lightGreySearchBarBorder}`;
        headerSearchIcon.style.fill = `${lightGreySearchBarBorder}`;
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <Fragment>
            <header className="top-header">
                <Link to="/" className="top-header-logo"></Link>
                <nav className="top-header-navbar">
                    <span className="top-header-navbar-title">Categories</span>
                    <div className="top-header-navbar-dropdown">
                        <ul className="top-header-navbar-dropdown-list">
                            <li className="top-header-navbar-dropdown-list-item">
                                <Link
                                    to="/"
                                    className="top-header-navbar-dropdown-list-item-link"
                                >
                                    <span className="top-header-navbar-dropdown-list-item-link-text">
                                        Development
                                    </span>
                                </Link>
                            </li>
                            <li className="top-header-navbar-dropdown-list-item">
                                <Link
                                    to="/"
                                    className="top-header-navbar-dropdown-list-item-link"
                                >
                                    <span className="top-header-navbar-dropdown-list-item-link-text">
                                        Design
                                    </span>
                                </Link>
                            </li>
                            <li className="top-header-navbar-dropdown-list-item">
                                <Link
                                    to="/"
                                    className="top-header-navbar-dropdown-list-item-link"
                                >
                                    <span className="top-header-navbar-dropdown-list-item-link-text">
                                        Data Science
                                    </span>
                                </Link>
                            </li>
                            <li className="top-header-navbar-dropdown-list-item">
                                <Link
                                    to="/"
                                    className="top-header-navbar-dropdown-list-item-link"
                                >
                                    <span className="top-header-navbar-dropdown-list-item-link-text">
                                        Digital Marketing
                                    </span>
                                </Link>
                            </li>
                            <li className="top-header-navbar-dropdown-list-item">
                                <Link
                                    to="/"
                                    className="top-header-navbar-dropdown-list-item-link"
                                >
                                    <span className="top-header-navbar-dropdown-list-item-link-text">
                                        Finance
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="top-header-search">
                    <div className="top-header-search-bar">
                        <input
                            type="text"
                            className="top-header-search-bar-input"
                            placeholder="Search Courses or Bootcamps"
                            onFocus={searchInputFocus}
                            onBlur={searchInputFocusOut}
                        />
                    </div>
                    <div className="top-header-search-icons">
                        <svg className="top-header-search-icons-icon">
                            <use xlinkHref="img/sprite.svg#icon-search"></use>
                        </svg>
                    </div>
                </div>
                <Link to="/cart" className="top-header-cart">
                    <svg className="top-header-cart-icon">
                        <use xlinkHref="img/sprite.svg#icon-cart"></use>
                    </svg>
                    <span className="top-header-cart-count">
                        <span className="top-header-cart-count-text">10</span>
                    </span>
                </Link>
                <Fragment>
                    {isLoggedIn ? (
                        <Link to="/">
                            <button
                                className="btn btn-secondary btn-md"
                                onClick={handleLogout}
                            >
                                Log out
                            </button>
                        </Link>
                    ) : (
                        <Fragment>
                            <Link to="/login">
                                <button className="btn btn-secondary btn-md">
                                    Log in
                                </button>
                            </Link>
                            <Link to="/register">
                                <button className="btn btn-primary btn-md">
                                    Sign up
                                </button>
                            </Link>
                        </Fragment>
                    )}
                </Fragment>
            </header>

            <header className="small-header">
                <svg
                    className="small-header-icon-menu"
                    onClick={(event) => openMenu(event)}
                >
                    <use xlinkHref="img/sprite.svg#icon-menu"></use>
                </svg>
                <div className="top-header-logo"></div>
                <div className="small-header-cart">
                    <svg className="small-header-cart-icon">
                        <use xlinkHref="img/sprite.svg#icon-cart"></use>
                    </svg>
                    <span className="small-header-cart-count">
                        <span className="top-header-cart-count-text">10</span>
                    </span>
                </div>
            </header>

            <section
                className="sidenav"
                id="sidenav"
                onClick={(event) => closeMenu(event)}
            >
                <div className="sidenav-main">
                    <div className="top-header-search">
                        <div className="top-header-search-bar">
                            <input
                                type="text"
                                className="top-header-search-bar-input"
                                placeholder="Search Courses or Bootcamps"
                            />
                        </div>
                        <div className="top-header-search-icons">
                            <svg className="top-header-search-icons-icon">
                                <use xlinkHref="img/sprite.svg#icon-search"></use>
                            </svg>
                        </div>
                    </div>
                    <div className="sidenav-main-top">
                        <Link to="/" className="sidenav-main-top-login">
                            Login
                        </Link>
                        <Link to="/" className="sidenav-main-top-signup">
                            Sign up
                        </Link>
                    </div>
                    <div className="sidenav-main-categories">
                        <h3 className="sidenav-main-categories-header">
                            Categories
                        </h3>
                        <ul className="sidenav-main-categories-list">
                            <li className="sidenav-main-categories-list-item">
                                <span className="sidenav-main-categories-list-item-text">
                                    Development
                                </span>
                                <svg className="sidenav-main-categories-list-item-icon">
                                    <use xlinkHref="img/sprite.svg#icon-chevron-right"></use>
                                </svg>
                            </li>
                            <li className="sidenav-main-categories-list-item">
                                <span className="sidenav-main-categories-list-item-text">
                                    Design
                                </span>
                                <svg className="sidenav-main-categories-list-item-icon">
                                    <use xlinkHref="img/sprite.svg#icon-chevron-right"></use>
                                </svg>
                            </li>
                            <li className="sidenav-main-categories-list-item">
                                <span className="sidenav-main-categories-list-item-text">
                                    Data Science
                                </span>
                                <svg className="sidenav-main-categories-list-item-icon">
                                    <use xlinkHref="img/sprite.svg#icon-chevron-right"></use>
                                </svg>
                            </li>
                            <li className="sidenav-main-categories-list-item">
                                <span className="sidenav-main-categories-list-item-text">
                                    Digital Marketing
                                </span>
                                <svg className="sidenav-main-categories-list-item-icon">
                                    <use xlinkHref="img/sprite.svg#icon-chevron-right"></use>
                                </svg>
                            </li>
                            <li className="sidenav-main-categories-list-item">
                                <span className="sidenav-main-categories-list-item-text">
                                    Finance
                                </span>
                                <svg className="sidenav-main-categories-list-item-icon">
                                    <use xlinkHref="img/sprite.svg#icon-chevron-right"></use>
                                </svg>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="sidenav-close" id="sidenav-close">
                    <svg className="sidenav-close-icon" id="sidenav-close">
                        <use
                            xlinkHref="img/sprite.svg#icon-cross"
                            id="sidenav-close"
                        ></use>
                    </svg>
                </div>
            </section>
        </Fragment>
    );
}

const mapStateToProps = (store) => {
    return {
        loading: store.auth.loading,
        isLoggedIn: store.auth.loggedIn,
    };
};

export default connect(mapStateToProps, { logout })(Header);
