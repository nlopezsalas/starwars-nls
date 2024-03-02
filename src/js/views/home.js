import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";

// IMPORTS 
// componentes solución 1
import planetCard from "../component/planetCard.js";
import vehicleCard from "../component/vehicleCard.js";
import characterCard from "../component/characterCard.js";

//boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//components
import ResourceCard from "../component/resourceCard.js";

export const Home = () => {

	const { store, actions } = useContext(Context);
	// const [resources, setResources] = useState([]);

	useEffect(() => {
		// setResources(['planets', 'vehicles', 'people']);
		actions.getSWAPIResource('planets');
		actions.getSWAPIResource('vehicles');
		actions.getSWAPIResource('people');
	}, []);

	// useEffect(() => {
	// 	for (let i = 0; i < resources.length; i++) {
	// 		actions.getSWAPIResource(resources[i]);
	// 	}
	// }, [resources, actions]);

	return (
		<Container className="mt-5">
		 	<Row>
		 		<Col>
		 			<h1 className="text-danger">Planets</h1>
		 			<div className="scroll-horizontal">
		 				{store.planets.map((planet) => {
		 					return (
		 						<ResourceCard key={planet.uid} uid={planet.uid} name={planet.name} resource="planets" />
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
		 						<ResourceCard key={vehicle.uid} uid={vehicle.uid} name={vehicle.name} resource="vehicles"/>
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
		 						<ResourceCard key={character.uid} uid={character.uid} name={character.name} resource="people"/>
		 					)
		 				})}
		 			</div>
		 		</Col></Row>
		 </Container>
		


		// <Container className="mt-5">
		// 	{resources.map((resource) => {
		// 		const capitalizedResource = resource.charAt(0).toUpperCase() + resource.slice(1);
		// 		return (
		// 			<Row key={resource} className="mb-3">
		// 				<Col>
		// 					<h1 className="text-danger">{capitalizedResource}</h1>
		// 					<div className="scroll-horizontal">
		// 						{/******** Aquí utilizamos los de corchetes para acceder a la propiedad ********/}
		// 						{store[resource].map((element) => (
		// 							<ResourceCard key={element.uid} uid={element.uid} name={element.name} resource={resource} />
		// 						))}
		// 					</div>
		// 				</Col>
		// 			</Row>
		// 		);
		// 	})}
		// </Container>
	)
};


/////////// ***** PARA REALIZARLO CON LOS ELEMENTOS DIRECTAMENTE ***** ///////////
// -------------- planets / vehicles / people ----------------------------------//

// IMPORTS 
// componentes solución 1
// import planetCard from "../component/planetCard.js";
// import vehicleCard from "../component/vehicleCard.js";
// import characterCard from "../component/characterCard.js";

// RETURN 
// <Container className="mt-5">
// 	<Row>
// 		<Col>
// 			<h1 className="text-danger">Planets</h1>
// 			<div className="scroll-horizontal">
// 				{store.planets.map((planet) => {
// 					return (
// 						<ResourceCard uid={planet.uid} name={planet.name} resource="planets" />
// 					)
// 				})}
// 			</div>
// 		</Col>
// 	</Row>
// 	<Row className="mt-4">
// 		<Col>
// 			<h1 className="text-danger">Vehicles</h1>
// 			<div className="scroll-horizontal">
// 				{store.vehicles.map((vehicle) => {
// 					return (
// 						<ResourceCard uid={vehicle.uid} name={vehicle.name} resource="vehicles"/>
// 					)
// 				})}
// 			</div>
// 		</Col>
// 	</Row>
// 	<Row className="mt-4">
// 		<Col>
// 			<h1 className="text-danger">Characters</h1>
// 			<div className="scroll-horizontal">
// 				{store.people.map((character) => {
// 					return (
// 						<ResourceCard uid={character.uid} name={character.name} resource="people"/>
// 					)
// 				})}
// 			</div>
// 		</Col></Row>
// </Container>
