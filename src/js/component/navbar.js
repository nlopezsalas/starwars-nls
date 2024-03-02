import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';


//Boostrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';



export const MainNavbar = () => {

	const { store, actions } = useContext(Context);

	return (
		<Navbar bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="/">
					<img
						src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
						width="100"
						height="30"
						className="d-inline-block align-top"
						alt="Star Wars logo"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav" className="d-flex justify-content-end">
					<Nav>
						<Dropdown>
							<Dropdown.Toggle variant="primary" id="dropdown-basic">
								Favorites <Badge pill bg="light" text="dark"> {store.favorites.length} </Badge>
							</Dropdown.Toggle>

							<Dropdown.Menu>
								{store.favorites.map((favorite) => {
									return (
										<Dropdown.Item className="d-flex gap-2 w-100 justify-content-between" href="#/action-1">
											<div><Link to={favorite.url} resource={favorite.resource}>{favorite.name}</Link></div>
											<div className="delete-task text-danger" onClick={(e) => actions.deleteFavorites(favorite)}>< FontAwesomeIcon icon={faX} /></div>
										</Dropdown.Item>
									)
								})}
							</Dropdown.Menu>
						</Dropdown> 
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>

	);
};