import axios from 'axios';
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_TOP_FAIL,
} from '../constants/productConstants';

// Function within a function (redux-thunk)
//export const listProducts = (keyword = '', pageNumber = '') => async (

export const listProducts = (
	keyword = '',
	pageNumber = '',
	pageSize = '4'
) => async (dispatch) => {
	try {
		// Send the request
		dispatch({ type: PRODUCT_LIST_REQUEST });

		const { data } = await axios.get(
			`/api/products?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}`
		);

		// Request was success
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		// Request was a failure
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listProductDetails = (id) => async (dispatch) => {
	try {
		// Send the request
		dispatch({ type: PRODUCT_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/products/${id}`);

		// Request was success
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
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

		await axios.delete(`/api/products/${id}`, config);

		// get details
		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
		});
	} catch (error) {
		// Request was a failure
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST,
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

		const { data } = await axios.post(`/api/products`, {}, config);

		// get details
		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		// Request was a failure
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_UPDATE_REQUEST,
		});

		// testa bryta upp
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(
			`/api/products/${product._id}`,
			product,
			config
		);

		// update details
		dispatch({
			type: PRODUCT_UPDATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		// Request was a failure
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createProductReview = (productId, review) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_REQUEST,
		});

		// testa bryta upp
		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'Application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.post(`/api/products/${productId}/reviews`, review, config);

		// get details
		dispatch({
			type: PRODUCT_CREATE_REVIEW_SUCCESS,
		});
	} catch (error) {
		// Request was a failure
		dispatch({
			type: PRODUCT_CREATE_REVIEW_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
// Function within a function (redux-thunk)
//export const listProducts = (keyword = '', pageNumber = '') => async (

export const listTopProducts = () => async (dispatch) => {
	try {
		// Send the request
		dispatch({ type: PRODUCT_TOP_REQUEST });

		const { data } = await axios.get(`/api/products/top`);

		// Request was success
		dispatch({
			type: PRODUCT_TOP_SUCCESS,
			payload: data,
		});
	} catch (error) {
		// Request was a failure
		dispatch({
			type: PRODUCT_TOP_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
