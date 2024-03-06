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
	console.log(`%c${params.resource}`,'color: red');
	const resources = params.resource; 

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

	useEffect(() => {
		actions.getSWAPIResource(`${resources}/${params.theid}`);
		console.log('Resource:', resources); 
	}, []);
	console.log(resources);
	console.log(resource);
	return (
		<div className="container mt-5">
			<Container>
				<Row>
					<Col>
						{(resources === 'people') 
							?<Image src={`https://starwars-visualguide.com/assets/img/${resource+'s'}/${params.theid}.jpg`} /> 
							: (store[resource].name === 'Tatooine') 
							? <Image src={`https://starwars-visualguide.com/assets/img/${resources}/2.jpg`} /> 
							: <Image src={`https://starwars-visualguide.com/assets/img/${resources}/${params.theid}.jpg`} />
						}
					</Col>
					<Col>
						<h1>{store[resource].name}</h1>
						<p>Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
							dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
							Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
							sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.</p>
					</Col>
				</Row>
				<Row className="border-top mt-2 pt-3">
					<div className="d-flex flex-fill flex-wrap gap-3">
						{Object.keys(store[resource]).map((key, index) => {
							if (key !== "name" &&
								typeof store[resource][key] !== 'object' &&
								store[resource][key] !== '' &&
								!store[resource][key].startsWith('http')) {
								return (
									<React.Fragment key={key}>
										<Col className="">
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
						})}
					</div>

				</Row>
			</Container>

			<Link to="/">
				<span className="btn btn-primary btn-lg mt-5" href="/" role="button">
					Back home
				</span>
			</Link>
		</div >
	);
};

SingleResource.propTypes = {
	match: PropTypes.object
};
