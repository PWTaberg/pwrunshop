import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const {
		shippingAddress,
		cartItems,
		checkoutButtonSelected,
		paymentMethod,
	} = cart;

	let redirectPage;
	if (cartItems.length === 0) {
		redirectPage = '/cart';
	}

	if (!redirectPage && checkoutButtonSelected === false) {
		redirectPage = '/cart';
	}

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	if (!redirectPage && !userInfo) {
		//history.push('/login');
		redirectPage = '/login';
	}

	if (
		!redirectPage &&
		(!shippingAddress ||
			!shippingAddress.address ||
			shippingAddress.address === '')
	) {
		redirectPage = '/shipping';
	}

	if (redirectPage) {
		history.push(redirectPage);
	}
	// Fixa Antons Method
	const [method, setMethod] = useState(paymentMethod);

	//const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		//dispatch(savePaymentMethod(paymentMethod));
		dispatch(savePaymentMethod(method));

		history.push('/placeorder');
	};

	/*
checked={method === 'PayPal' ? true : false}

checked={method === 'Stripe' ? true : false}			

*/

	return (
		<FormContainer>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked={method === 'PayPal' ? true : false}
							onChange={(e) => setMethod(e.target.value)}
						></Form.Check>
						<Form.Check
							type='radio'
							label='Stripe'
							id='Stripe'
							name='paymentMethod'
							value='Stripe'
							checked={method === 'Stripe' ? true : false}
							onChange={(e) => setMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
