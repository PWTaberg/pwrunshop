import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import {
	addToCart,
	removeFromCart,
	saveCheckoutButtonSelected,
} from '../actions/cartActions';
import { CART_RESET } from '../constants/cartConstants';

const CartScreen = ({ match, location, history }) => {
	const productId = match.params.id;

	// get the qty number from /cart/12321?qty=4
	// location part of URL is ?qty=4, in string format
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	useEffect(() => {
		// only if a product is selected, do we wat to add to the cart
		if (productId) {
			dispatch(addToCart(productId, qty));
		}
	}, [dispatch, productId, qty]);

	const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id));
		history.push('/cart');
	};

	const checkOutHandler = () => {
		dispatch(saveCheckoutButtonSelected());
		history.push('/login?redirect=shipping');
	};

	const clearAllHandler = () => {
		dispatch({ type: CART_RESET });
		history.push('/cart');
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to='/'>Go Back</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((cartItem) => (
							<ListGroup.Item key={cartItem.product}>
								<Row>
									<Col md={2}>
										<Image
											src={cartItem.image}
											alt={cartItem.name}
											fluid
											rounded
										></Image>
									</Col>
									<Col md={3}>
										<Link
											to={`/product/${cartItem.product}`}
										>
											{cartItem.name}
										</Link>
									</Col>
									<Col md={2}>${cartItem.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={cartItem.qty}
											onChange={(e) =>
												dispatch(
													addToCart(
														cartItem.product,
														Number(e.target.value)
													)
												)
											}
										>
											{[
												...Array(
													cartItem.countInStock
												).keys(),
											].map((index) => (
												<option
													key={index + 1}
													value={index + 1}
												>
													{index + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() =>
												removeFromCartHandler(
													cartItem.product
												)
											}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal (
								{cartItems.reduce(
									(acc, cartItem) => acc + cartItem.qty,
									0
								)}
								) items
							</h2>
							$
							{cartItems
								.reduce(
									(acc, cartItem) =>
										acc + cartItem.price * cartItem.qty,
									0
								)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={cartItems.length === 0}
								onClick={checkOutHandler}
							>
								Proceed to Checkout
							</Button>
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								variant='danger'
								disabled={cartItems.length === 0}
								onClick={clearAllHandler}
							>
								Clear All
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
