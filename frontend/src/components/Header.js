import React from 'react';
//import '../i18n';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
//import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';
//import i18n from '../i18n';

const Header = () => {
	const { i18n } = useTranslation();
	const dispatch = useDispatch();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
	};
	/*
	const changeLanguage = (ln) => {
		//	console.log('new language', ln);

		return () => {
			console.log('change to ', ln);
			//i18n.changeLanguage(ln);
		};
	};
	*/
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>The Runners Shop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Route
							render={({ history }) => (
								<SearchBox history={history} />
							)}
						/>
						<Nav className='ml-auto'>
							<LinkContainer to='/cart'>
								<Nav.Link>
									<i className='fas fa-shopping-cart'></i>{' '}
									Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo ? (
								<NavDropdown
									title={userInfo.name}
									id='username'
								>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>
											Profile
										</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i>Sign In
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminMenu'>
									<LinkContainer to='/admin/userlist'>
										<NavDropdown.Item>
											Users
										</NavDropdown.Item>
									</LinkContainer>

									<LinkContainer to='/admin/productlist'>
										<NavDropdown.Item>
											Products
										</NavDropdown.Item>
									</LinkContainer>

									<LinkContainer to='/admin/orderlist'>
										<NavDropdown.Item>
											Orders
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
							<NavDropdown title='Language' id='languageMenu'>
								<NavDropdown.Item
									onClick={() => i18n.changeLanguage('en')}
								>
									<ReactCountryFlag
										countryCode='US'
										svg
										style={{
											width: '2em',
											height: '2em',
										}}
										title='US'
									/>
								</NavDropdown.Item>

								<NavDropdown.Item
									onClick={() => i18n.changeLanguage('sv')}
								>
									<ReactCountryFlag
										countryCode='SE'
										svg
										style={{
											width: '2em',
											height: '2em',
										}}
										title='SE'
									/>
								</NavDropdown.Item>
								<NavDropdown.Item
									onClick={() => i18n.changeLanguage('co')}
								>
									<ReactCountryFlag
										countryCode='CO'
										svg
										style={{
											width: '2em',
											height: '2em',
										}}
										title='CO'
									/>
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
