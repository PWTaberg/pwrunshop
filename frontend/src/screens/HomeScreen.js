import React, { useEffect } from 'react';
//import '../i18n';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { useTranslation } from 'react-i18next';

import ProductCarousel from '../components/ProductCarousel';

import { listProducts } from '../actions/productActions';

const HomeScreen = (props) => {
	const { match } = props;
	const { t } = useTranslation();
	//i18n.changeLanguage('sv');
	const keyword = match.params.keyword;

	const pageNumber = match.params.pageNumber || 1;

	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	// destructure from productList state
	const { loading, error, products, page, pages } = productList;

	// run this everytime the screen is loaded
	useEffect(() => {
		// call the action listProducts
		dispatch(listProducts(keyword, pageNumber));
	}, [dispatch, keyword, pageNumber]);

	/*
	let isLoading = true;
	if (!loading || loading === true) {
		isLoading = true;
	} else {
		isLoading = false;
	}
	*/

	return (
		<>
			<Meta />
			{!keyword ? (
				<ProductCarousel />
			) : (
				<Link to='/' className='btn btn-light'>
					Go Back
				</Link>
			)}
			<h1>{t('latestProducts')}</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ''}
						subdirectory='/page'
					/>
				</>
			)}
		</>
	);
};

export default HomeScreen;
