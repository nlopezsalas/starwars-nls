import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

//Boostrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export const SingleResource = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	console.log(`%c${params.resource}`, 'color: red');
	const resources = params.resource;

	const [resourceData, setResourceData] = useState(null);


	//obtener el recurso
	let resource = '';
	if (resources.includes('people')) {
		resource = 'character';
	} else {
		resource = resources;
		if (resource.endsWith('s')) {
			resource = resource.slice(0, -1);
		}
	}

	const imageResource = resources === 'people' ? 'characters' : resources;

	useEffect(() => {
		const resourceKey = `swapi_${params.resource}/${params.theid}`;
		const cachedData = localStorage.getItem(resourceKey);

		if (cachedData) {
			setResourceData(JSON.parse(cachedData));
		} else {
			actions.getSWAPIResource(`${resources}/${params.theid}`)
				.then(data => {
					setResourceData(data); // Asegúrate de que esto sea lo que esperas
				})
				.catch(error => {
					console.error("Error fetching resource:", error);
					// Manejar el error como consideres apropiado
				});
		}
	}, [params.resource, params.theid, actions]);

	console.log(resources);
	console.log(resource);
	
	return (
		<div className="container mt-5">
			<Container>
				<Row>
					<Col>
						{/* Imagen: misma para ambas vistas */}
						<Image src={`https://starwars-visualguide.com/assets/img/${imageResource}/${params.theid}.jpg`} />
					</Col>
					<Col>
						{/* Nombre: varía según si resourceData es null o no */}
						<h1>{resourceData ? resourceData.name : store[resource].name}</h1>
						{/* Párrafo estático, igual para ambas vistas */}
						<p>Lorem ipsum odor amet...</p>
					</Col>
				</Row>
				<Row className="border-top mt-2 pt-3">
					<div className="d-flex flex-fill flex-wrap gap-3">
						{/* Datos dinámicos: varían según si resourceData es null o no */}
						{resourceData ? (
							Object.keys(resourceData).map((key, index) => {
								if (key !== "name" && typeof resourceData[key] !== 'object' && resourceData[key] !== '' && !resourceData[key].startsWith('http')) {
									return (
										<React.Fragment key={key}>
											<Col>
												<div className="d-inline-block">
													<strong>{key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}:</strong>
												</div>
												<div className="d-block">
													{resourceData[key]}
												</div>
											</Col>
											{(index + 1) % 5 === 0 && <div className="w-100"></div>}
										</React.Fragment>
									);
								}
								return null;
							})
						) : (
							Object.keys(store[resource]).map((key, index) => {
								if (key !== "name" && typeof store[resource][key] !== 'object' && store[resource][key] !== '' && !store[resource][key].startsWith('http')) {
									return (
										<React.Fragment key={key}>
											<Col>
												<div className="d-inline-block">
													<strong>{key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}:</strong>
												</div>
												<div className="d-block">
													{store[resource][key]}
												</div>
											</Col>
											{(index + 1) % 5 === 0 && <div className="w-100"></div>}
										</React.Fragment>
									);
								}
								return null;
							})
						)}
					</div>
				</Row>
			</Container>

			<Link to="/">
				<span className="btn btn-primary btn-lg mt-5" href="/" role="button">
					Back home
				</span>
			</Link>
		</div>
	);
};

SingleResource.propTypes = {
	match: PropTypes.object
};