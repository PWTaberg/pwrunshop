import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
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

		default:
			return state;
	}
};
