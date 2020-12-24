import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Pusher from 'pusher-js';
// action creator
import { logout, getNotificationCount } from '../actions';
// API calls
import { getProfileDetails } from '../api';
// Config values
import { pusherApiKey, pusherCluster } from '../config/config';

// Global variables
const btnBorderBlueLight = 'rgb(40, 150, 169)';
const lightGreySearchBarBorder = 'rgb(152, 149, 134)';

function Header(props) {
    const { loading, isLoggedIn, cartCount, user, notificationCount } = props;
    const { logout, getNotificationCount } = props;

    const [userProfile, setuserProfile] = useState(null);
    console.log(userProfile);

    // Pusher related stuff for realtime DB related updations
    const pusher = new Pusher(pusherApiKey, {
        cluster: pusherCluster,
    });
    const channel = pusher.subscribe('notifications');
    channel.bind('updated', function (data) {
        console.log('Pusher subscribed notification change');
        console.log(data);
        getNotificationCount(data.doc.unReadCount);
    });

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
    const getProfileDetailsUtil = async () => {
        const profile = await getProfileDetails(user._id);
        console.log(profile);
        if (profile) {
            getNotificationCount(profile.unReadCount);
        } else {
            getNotificationCount(0);
        }
        setuserProfile(profile);
    };
    useEffect(() => {
        if (!loading && isLoggedIn) {
            getProfileDetailsUtil();
        }
    }, [loading, isLoggedIn]);

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
                {user === null ||
                user.role === 'user' ||
                user.role === 'unknown' ? (
                    <Link to="/cart" className="top-header-cart">
                        <svg className="top-header-cart-icon">
                            <use xlinkHref="img/sprite.svg#icon-cart"></use>
                        </svg>
                        <span className="top-header-cart-count">
                            <span className="top-header-cart-count-text">
                                {cartCount}
                            </span>
                        </span>
                    </Link>
                ) : null}

                <Fragment>
                    {isLoggedIn ? (
                        <Fragment>
                            <Link
                                to={`/notifications/${
                                    user.role === 'publisher'
                                        ? 'publisher'
                                        : user.role === 'user'
                                        ? 'user'
                                        : ''
                                }/${userProfile ? userProfile._id : ''}`}
                                class="top-header-notify"
                            >
                                <svg class="top-header-notify-icon">
                                    <use xlinkHref="img/sprite.svg#icon-bell"></use>
                                </svg>
                                {notificationCount > 0 ? (
                                    <span class="top-header-notify-count">
                                        <span class="top-header-notify-count-text">
                                            {notificationCount}
                                        </span>
                                    </span>
                                ) : null}
                            </Link>
                            <Link to="/user/profile" class="top-header-user">
                                <svg class="top-header-user-icon">
                                    <use xlinkHref="img/sprite.svg#icon-user-circle-o"></use>
                                </svg>
                            </Link>
                            <Link to="/">
                                <button
                                    className="btn btn-secondary btn-md"
                                    onClick={handleLogout}
                                >
                                    Log out
                                </button>
                            </Link>
                        </Fragment>
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
                <Link to="/" className="top-header-logo"></Link>
                {user === null ||
                user.role === 'user' ||
                user.role === 'unknown' ? (
                    <Link to="/cart" className="small-header-cart">
                        <svg className="small-header-cart-icon">
                            <use xlinkHref="img/sprite.svg#icon-cart"></use>
                        </svg>
                        <span className="small-header-cart-count">
                            <span className="top-header-cart-count-text">
                                {cartCount}
                            </span>
                        </span>
                    </Link>
                ) : null}
                {isLoggedIn ? (
                    <Fragment>
                        <Link
                            to={`/notifications/${
                                user.role === 'publisher'
                                    ? 'publisher'
                                    : user.role === 'user'
                                    ? 'user'
                                    : ''
                            }/${userProfile ? userProfile._id : ''}`}
                            class="small-header-notify"
                        >
                            <svg class="small-header-notify-icon">
                                <use xlinkHref="img/sprite.svg#icon-bell"></use>
                            </svg>
                            {notificationCount > 0 ? (
                                <span class="small-header-notify-count">
                                    <span class="top-header-notify-count-text">
                                        {notificationCount}
                                    </span>
                                </span>
                            ) : null}
                        </Link>
                        <Link to="/user/profile" class="small-header-user">
                            <svg class="small-header-user-icon">
                                <use xlinkHref="img/sprite.svg#icon-user-circle-o"></use>
                            </svg>
                        </Link>
                    </Fragment>
                ) : null}
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
                        {isLoggedIn ? (
                            <Fragment>
                                <Link
                                    to="/"
                                    className="sidenav-main-top-login"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Link>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Link
                                    to="/login"
                                    className="sidenav-main-top-login"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="sidenav-main-top-signup"
                                >
                                    Sign up
                                </Link>
                            </Fragment>
                        )}
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
        user: store.auth.user,
        cartCount: store.cart.cartItems.length,
        notificationCount: store.notification.count,
    };
};

export default connect(mapStateToProps, { logout, getNotificationCount })(
    Header
);
