import axios from 'axios';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_CHECKOUT_BUTTON_SELECTED,
	CART_REDIRECT_TO,
} from '../constants/cartConstants';

import {
	CART_ITEMS,
	SHIPPING_ADDRESS,
	PAYMENT_METHOD,
	CHECKOUT_BUTTON_SELECTED,
} from '../constants/localStoreConstants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);
	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	});

	localStorage.setItem(CART_ITEMS, JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	});

	localStorage.setItem(CART_ITEMS, JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	});

	localStorage.setItem(SHIPPING_ADDRESS, JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	});

	// paymentMethod: 'PayPal'
	localStorage.setItem(PAYMENT_METHOD, JSON.stringify(data));
};

export const saveCheckoutButtonSelected = () => (dispatch) => {
	dispatch({
		type: CART_SAVE_CHECKOUT_BUTTON_SELECTED,
	});

	localStorage.setItem(CHECKOUT_BUTTON_SELECTED, JSON.stringify(true));
};

export const redirectToPage = (page) => (dispatch) => {
	dispatch({
		type: CART_REDIRECT_TO,
		payload: page,
	});

	localStorage.setItem(CHECKOUT_BUTTON_SELECTED, JSON.stringify(true));
};
