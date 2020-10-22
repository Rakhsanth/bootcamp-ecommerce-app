import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// actions
import { addToCart, removeFromCart } from '../actions';

function Cart(props) {
    const { loading, cartItems, addToCart, removeFromCart } = props;

    const getTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += Number(item.price);
        });
        return totalPrice;
    };

    const handleRemoveItem = (id) => {
        removeFromCart(id);
    };

    return !loading ? (
        <div className="main-conatiner-cart">
            <section className="shoping-header">
                <h2 className="shoping-header-text">Shoping Cart</h2>
            </section>
            <div className="cart-items">
                {cartItems.length > 0 ? (
                    <Fragment>
                        <h4 className="cart-items-text">3 Courses in cart</h4>
                        <div className="cart-items-container">
                            {cartItems.map((cartItem, index) => (
                                <div
                                    key={cartItem.id}
                                    className="cart-items-card"
                                >
                                    <img
                                        src={cartItem.image}
                                        alt="mockdemy-cart-item"
                                        className="cart-items-card-img"
                                    />
                                    <div className="cart-items-card-text">
                                        <h5 className="cart-items-card-text-title">
                                            {cartItem.title}
                                        </h5>
                                        <p className="cart-items-card-text-desc">
                                            {cartItem.description}
                                        </p>
                                        <button
                                            className="btn btn-md btn-tertiary"
                                            onClick={() =>
                                                handleRemoveItem(cartItem.id)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <h4 className="cart-items-card-price">
                                        &#8377; {cartItem.price}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </Fragment>
                ) : (
                    <h1>Cart is empty continue shopping</h1>
                )}
            </div>
            {cartItems.length > 0 ? (
                <div className="cart-checkout">
                    <h4 className="cart-checkout-total-price">
                        Total : &#8377; {getTotalPrice()}
                    </h4>
                    <button className="btn btn-lg btn-tertiary">
                        Checkout
                    </button>
                </div>
            ) : null}
        </div>
    ) : (
        <h1>Loading ...</h1>
    );
}

const mapStateToProps = (store) => ({
    loading: store.cart.loading,
    cartItems: store.cart.cartItems,
});

export default connect(mapStateToProps, { addToCart, removeFromCart })(Cart);
