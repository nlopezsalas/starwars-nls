const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			planets: [],
			planet: {},
			people: [],
			character: {},
			vehicles: [],
			vehicle: {}

		},
		actions: {
			getSWAPIResource: (object) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const requestOptions = {
					method: "GET",
					headers: myHeaders,
				};
				fetch(`https://www.swapi.tech/api/${object}`, requestOptions)
					.then((response) => response.json())
					.then((result) => {
						if (result.hasOwnProperty('results'))
							// Caso para '/people', '/planets', '/vehicles'
							setStore({ [object]: result.results })
						else {
							// Caso para '/people/1', '/planets/1', '/vehicles/1'
							const objectType = object.split('/')[0].replace(/s$/, '');
							console.log(`%c${objectType}`, 'color: white; background-color: green;');
							const resourceName = (objectType === "people") ? "character" : objectType;
							setStore({ [resourceName]: result.result.properties })
						}
					})
					.catch((error) => console.error(error));
			}
			// getPlanet: (object) => {
			// 	const myHeaders = new Headers();
			// 	myHeaders.append("Content-Type", "application/json");

			// 	const requestOptions = {
			// 		method: "GET",
			// 		headers: myHeaders,
			// 		redirect: "follow"
			// 	};
			// 	fetch(`https://www.swapi.tech/api/${object}`, requestOptions)
			// 		.then((response) => response.json())
			// 		.then((result) => {
			// 			console.log(result);
			// 			setStore({ planet: result.result.properties })
			// 		})
			// 		.catch((error) => console.error(error));
			// },
			// getCharacters: () => {
			// 	const requestOptions = {
			// 		method: "GET",
			// 		redirect: "follow"
			// 	};

			// 	fetch("https://www.swapi.tech/api/people/", requestOptions)
			// 		.then((response) => response.json())
			// 		.then((result) => {
			// 			console.log(result);
			// 			setStore({ characters: result.results })
			// 		})
			// 		.catch((error) => console.error(error));
			// },
			// getVehicles: () => {
			// 	const requestOptions = {
			// 		method: "GET",
			// 		redirect: "follow"
			// 	};

			// 	fetch("https://www.swapi.tech/api/vehicles/", requestOptions)
			// 		.then((response) => response.json())
			// 		.then((result) => {
			// 			console.log(result);
			// 			setStore({ vehicles: result.results })
			// 		})
			// 		.catch((error) => console.error(error));
			// }
		}
	};
};

export default getState;
