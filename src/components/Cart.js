import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
// custom
import { apiBaseURL, razorpayAPIKeyId } from '../config/config';
// actions
import { addToCart, removeFromCart } from '../actions';

function Cart(props) {
    const { loading, cartItems, addToCart, removeFromCart } = props;
    const { history } = props;

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

    const handleCheckout = async () => {
        const amount = getTotalPrice();
        let token;
        if (localStorage.token) {
            token = localStorage.getItem('token');
        }
        let data;
        try {
            const axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const response = await axios.get(
                `${apiBaseURL}/payment/order/${amount}`,
                axiosConfig
            );
            data = response.data.data;
        } catch (err) {
            console.log(err.response.data);
        }
        const options = {
            key: razorpayAPIKeyId,
            currency: data.currency,
            amount: data.amount,
            name: 'Tech Network',
            description: 'Payment processing to bootcamp bank account',
            order_id: data.id,
            handler: async (response) => {
                const {
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                } = response;
                const body = {
                    order_id: data.id,
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                };
                const axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                };
                const confirmedResponse = await axios.post(
                    `${apiBaseURL}/confirm`,
                    body,
                    axiosConfig
                );
                // console.log(confirmedResponse.data);
                if (confirmedResponse.data.success) {
                    props.setAlert(
                        confirmedResponse.data.data.message,
                        'success'
                    );
                } else {
                    props.setAlert(confirmedResponse.data.data, 'danger');
                }
                history.replace('/');
            },
            theme: {
                color: '#686CFD',
            },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return !loading ? (
        <div className="main-conatiner-cart">
            <section className="shoping-header">
                <h2 className="shoping-header-text">Shoping Cart</h2>
            </section>
            <div className="cart-items">
                {cartItems.length > 0 ? (
                    <Fragment>
                        <h4 className="cart-items-text">
                            {cartItems.length} Courses in cart
                        </h4>
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
                    <button
                        className="btn btn-lg btn-tertiary"
                        onClick={handleCheckout}
                    >
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

export default connect(mapStateToProps, { addToCart, removeFromCart })(
    withRouter(Cart)
);
