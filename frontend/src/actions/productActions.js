import axios from 'axios';
import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

// Function within a function (redux-thunk)
export const listProducts = () => async (dispatch) => {
	try {
		// Send the request
		dispatch({ type: PRODUCT_LIST_REQUEST });
		// const { data } = await axios.get('/api/products');

		/* Doing it in steps */
		const productListResponse = await axios.get('/api/products');
		const { data } = productListResponse;

		//	console.log('producrActions.productListRespone', productListResponse);
		//	console.log('data', data);
		/* ** */

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
		// Request was a failure
		//console.log('productAction.listProductDetails.error', error);
		//console.log('error.response', error.response);
		//console.log('error.message', error.message);

		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
