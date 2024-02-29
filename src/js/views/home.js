import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";

//boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//components
import PlanetCard from "../component/planetCard";
import VehicleCard from "../component/vehicleCard.js";
import CharacterCard from "../component/characterCard.js";

export const Home = () => {

	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getSWAPIResource("planets");
		actions.getSWAPIResource("vehicles");
		actions.getSWAPIResource("people");
	}, []);

	console.log(store.vehicles);

	return (
		<Container className="mt-5">
			<Row>
				<Col>
					<h1 className="text-danger">Planets</h1>
					<div className="scroll-horizontal">
						{store.planets.map((planet) => {
							return (
								<PlanetCard uid={planet.uid} name={planet.name} />
							)
						})}
					</div>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col>
					<h1 className="text-danger">Vehicles</h1>
					<div className="scroll-horizontal">
						{store.vehicles.map((vehicle) => {
							return (
								<VehicleCard uid={vehicle.uid} name={vehicle.name} />
							)
						})}
					</div>
				</Col>
			</Row>
			<Row className="mt-4">
				<Col>
					<h1 className="text-danger">Characters</h1>
					<div className="scroll-horizontal">
						{store.people.map((character) => {
							return (
								<CharacterCard uid={character.uid} name={character.name} />
							)
						})}
					</div>
				</Col></Row>
		</Container>
	)
};
