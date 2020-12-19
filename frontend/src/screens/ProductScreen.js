import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { useTranslation } from 'react-i18next';

import {
	listProductDetails,
	createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

//const ProductScreen = ({ history, match }) => {
const ProductScreen = (props) => {
	const { history, match } = props;

	const { t } = useTranslation();
	const [qty, setQty] = useState(1);

	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productReviewCreate = useSelector(
		(state) => state.productReviewCreate
	);
	const {
		success: successProductReview,
		error: errorProductReview,
	} = productReviewCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (successProductReview) {
			alert('Review submitted');
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		// call the action listProductDetailss
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match, successProductReview]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const updateQty = (e) => {
		setQty(e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(match.params.id, { rating, comment }));
	};

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				{t('goBack')}
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						<Col m={6}>
							<Image
								src={product.image}
								alt={product.name}
								fluid
							/>
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} ${t(
											'reviews'
										)}`}
									/>
								</ListGroup.Item>
								<ListGroup.Item>
									{t('price')}: {product.price} SEK
								</ListGroup.Item>
								<ListGroup.Item>
									{t('description')}: {product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>
													${product.price}
												</strong>
											</Col>
										</Row>
									</ListGroup.Item>
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.countInStock > 0
													? `${t('outOfStock')}`
													: `${t('inStock')}`}
											</Col>
										</Row>
									</ListGroup.Item>

									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as='select'
														value={qty}
														onChange={(e) =>
															updateQty(e)
														}
													>
														{[
															...Array(
																product.countInStock
															).keys(),
														].map((index) => (
															<option
																key={index + 1}
																value={
																	index + 1
																}
															>
																{' '}
																{index + 1}
															</option>
														))}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											onClick={addToCartHandler}
											className='btn-block'
											type='button'
											disabled={
												product.countInStock === 0
											}
										>
											{t('addToCart')}
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>{t('reviews')}</h2>
							{product.reviews.length === 0 && (
								<Message>{t('noReviews')}</Message>
							)}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating
											value={review.rating}
											text={`${product.numReviews} ${t(
												'reviews'
											)}`}
										/>
										<p>
											{review.createdAt.substring(0, 10)}
										</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h2>{t('writeACustomerReview')}</h2>
									{errorProductReview && (
										<Message variant='danger'>
											{errorProductReview}
										</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												<Form.Label>
													{t('rating')}
												</Form.Label>
												<Form.Control
													as='select'
													value={rating}
													onChange={(e) =>
														setRating(
															e.target.value
														)
													}
												>
													<option value=''>
														{t('select')}
													</option>
													<option value='1'>
														{t('poor')}
													</option>
													<option value='2'>
														{t('fair')}
													</option>
													<option value='3'>
														{t('good')}
													</option>
													<option value='4'>
														{t('veryGood')}
													</option>
													<option value='5'>
														{t('excellent')}
													</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Label>
													{t('comment')}
												</Form.Label>
												<Form.Control
													as='textarea'
													row='3'
													value={comment}
													onChange={(e) =>
														setComment(
															e.target.value
														)
													}
												></Form.Control>
											</Form.Group>
											<Button
												type='submit'
												variant='primary'
											>
												{t('submit')}
											</Button>
										</Form>
									) : (
										<Message>
											Please
											<Link to='/login'> sign in</Link>to
											write a review{' '}
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
