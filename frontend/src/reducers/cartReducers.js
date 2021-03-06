import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_RESET,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_REMOVE_SHIPPING_ADDRESS,
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

export const cartReducer = (
	state = {
		cartItems: [],
		shippingAddress: { address: '', city: '', postalCode: '', country: '' },
		paymentMethod: '',
		checkoutButtonSelected: false,
	},
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const addedItem = action.payload;
			const existItem = state.cartItems.find(
				(listItem) => listItem.product === addedItem.product
			);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((item) =>
						item.product === existItem.product ? addedItem : item
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, addedItem],
				};
			}

		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(cartItem) => cartItem.product !== action.payload
				),
			};
		case CART_SAVE_CHECKOUT_BUTTON_SELECTED:
			return {
				...state,
				checkoutButtonSelected: true,
			};

		case CART_RESET:
			localStorage.removeItem(CART_ITEMS);
			localStorage.removeItem(SHIPPING_ADDRESS);
			localStorage.removeItem(PAYMENT_METHOD);
			localStorage.removeItem(CHECKOUT_BUTTON_SELECTED);
			return {
				...state,
				cartItems: [],
				shippingAddress: {
					address: '',
					city: '',
					postalCode: '',
					country: '',
				},
				paymentMethod: '',
				checkoutButtonSelected: false,
			};

		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};

		case CART_REMOVE_SHIPPING_ADDRESS:
			localStorage.removeItem(SHIPPING_ADDRESS);

			return {
				...state,
				shippingAddress: {
					address: '',
					city: '',
					postalCode: '',
					country: '',
				},
			};

		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};

		case CART_REDIRECT_TO:
			return {
				...state,
				redirectTo: action.payload,
			};
		/*
		case CART_REMOVE_PAYMENT_METHOD:
			localStorage.removeItem(PAYMENT_METHOD);

			return {
				...state,
				paymentMethod: 'PayPal',
			};
*/
		default:
			return state;
	}
};
