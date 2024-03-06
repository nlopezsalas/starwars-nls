const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			planets: [],
			planet: {},

			people: [],
			character: {},

			vehicles: [],
			vehicle: {},

			favorites: [],
			resources: ['planets', 'vehicles', 'people']

		},
		actions: {
			getSWAPIResource: async (object) => {
				try {
					const myHeaders = new Headers();
					myHeaders.append("Content-Type", "application/json");

					const requestOptions = {
						method: "GET",
						headers: myHeaders,
					};
					let response = await fetch(`https://www.swapi.tech/api/${object}`, requestOptions)
					let result = await response.json()
					console.log(result);
					if (result.hasOwnProperty('results'))
						// Para '/people', '/planets', '/vehicles'
						setStore({ [object]: result.results })
					else {
						// Para '/people/1', '/planets/1', '/vehicles/1'
						const objectType = object.split('/')[0].replace(/s$/, '');
						console.log(`%c${objectType}`, 'color: white; background-color: green;');
						const resourceName = (objectType === "people") ? "character" : objectType;
						setStore({ [resourceName]: result.result.properties })
					}

				} catch (error) {
					console.error(error)
				}
			},
			addFavorites: (name, uid, resource) => {
				const newFavorite = {
					name: name,
					id: uid,
					url: '/' + resource + '/' + uid,
					resource: resource
				}
				console.log('%cAñadir favorito....' + `${newFavorite.name}`, 'padding: 5px; background-color: purple; color: white');
				if (!getStore().favorites.find(favorite => favorite.name === name)) {
					setStore({ favorites: [...getStore().favorites, newFavorite] });
				}
				console.log('/' + resource + '/' + uid);
			},
			deleteFavorites: (name) => {
				console.log("Borrando..." + `${name}`);
				const newFavorites = getStore().favorites.filter((item) => item !== name);
				console.log(newFavorites);
				setStore({ favorites: newFavorites });
			}
		}
	};
};

export default getState;


/////////// ***** PARA REALIZARLO CON LOS ELEMENTOS DIRECTAMENTE ***** ///////////
// -------------- planets / vehicles / people ----------------------------------//


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

