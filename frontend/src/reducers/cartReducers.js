import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants';

export const cartReducer = (
	state = { cartItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const addedItem = action.payload;
			const existItem = state.cartItems.find(
				(listItem) => listItem.productId === addedItem.productId
			);

			if (existItem) {
				console.log('existItem', existItem);
				console.log('existItem.product', existItem.productId);

				return {
					...state,
					cartItems: state.cartItems.map((item) =>
						item.productId === existItem.productId
							? addedItem
							: item
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
					(cartItem) => cartItem.productId !== action.payload
				),
			};

		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};
		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};
		default:
			return state;
	}
};
