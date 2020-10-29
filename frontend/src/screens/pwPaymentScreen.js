import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart);

	const { shippingAddress, paymentMethod } = cart;

	if (!shippingAddress) {
		history.push('/shipping');
	}

	const [method, setMethod] = useState(paymentMethod);

	console.log('PaymentScreen.paymentMethod', paymentMethod);
	console.log('PaymentScreen.method', method);
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		console.log('PaymentScreen.submitHandler.paymentMethod', paymentMethod);
		console.log('PaymentScreen.submitHandler.method', method);

		e.preventDefault();
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
							checked
							onChange={(e) => setMethod(e.target.value)}
						></Form.Check>
						<Form.Check
							type='radio'
							label='Stripe'
							id='Stripe'
							name='paymentMethod'
							value='Stripe'
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
