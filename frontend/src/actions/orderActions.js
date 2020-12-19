import axios from 'axios';
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_MY_LIST_REQUEST,
	ORDER_MY_LIST_SUCCESS,
	ORDER_MY_LIST_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_DELIVER_REQUEST,
	ORDER_DELIVER_SUCCESS,
	ORDER_DELIVER_FAIL,
} from '../constants/orderConstants';

import {
	//CART_REMOVE_SHIPPING_ADDRESS,
	//CART_REMOVE_PAYMENT_METHOD,
	CART_RESET,
} from '../constants/cartConstants';

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/orders`, order, config);

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});

		// Order is in DB, empty Cart
		dispatch({ type: CART_RESET });
	} catch (error) {
		// Request was a failure
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		});

		// testa bryta upp
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/${id}`, config);

		// get details
		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		// Request was a failure
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const payOrder = (orderId, paymentResult) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/orders/${orderId}/pay`,
			paymentResult,
			config
		);

		// get details
		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data,
		});
	} catch (error) {
		// Request was a failure
		dispatch({
			type: ORDER_PAY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deliverOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DELIVER_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/orders/${order._id}/delivered`,
			{},
			config
		);

		// get details
		dispatch({
			type: ORDER_DELIVER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		// Request was a failure
		dispatch({
			type: ORDER_DELIVER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listMyOrders = (pageNumber = '', pageSize = '4') => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: ORDER_MY_LIST_REQUEST,
		});

		// testa bryta upp
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(
			`/api/orders/myorders?pageNumber=${pageNumber}&pageSize=${pageSize}`,
			config
		);

		// get details
		dispatch({
			type: ORDER_MY_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		// Request was a failure
		dispatch({
			type: ORDER_MY_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listOrders = (pageNumber = '', pageSize = '4') => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: ORDER_LIST_REQUEST,
		});

		// testa bryta upp
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(
			`/api/orders?pageNumber=${pageNumber}&pageSize=${pageSize}`,
			config
		);

		// get details
		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		// Request was a failure
		dispatch({
			type: ORDER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
