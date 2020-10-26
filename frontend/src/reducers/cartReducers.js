import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const cartReducer = (
	state = { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' },
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const addedItem = action.payload;
			const existItem = state.cartItems.find(
				(listItem) => listItem.product === addedItem.product
			);

			if (existItem) {
				console.log('existItem', existItem);
				console.log('existItem.product', existItem.product);

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

		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};

		case CART_SAVE_PAYMENT_METHOD:
			console.log('cartReducer.CART_SAVE_PAYMENT_METHOD');
			return {
				...state,
				paymentMethod: action.payload,
			};
		default:
			return state;
	}
};
