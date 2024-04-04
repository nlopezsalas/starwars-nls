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
					const isSpecificResource = object.split('/').length > 1; // Verifica si es un recurso específico como '/people/1'
					const objectType = object.split('/')[0]; // 'people', 'planets', etc.
					const resourceId = object.split('/')[1]; // ID del recurso, si está presente
			
					// Determina la clave para localStorage y store
					const storageKey = isSpecificResource && objectType === 'people' ? `character/${resourceId}` : object;
					const cacheKey = `swapi_${storageKey}`;
					
					// Intenta recuperar de localStorage
					const cachedData = localStorage.getItem(cacheKey);
					if (cachedData) {
						// Si hay datos en caché, usa esos
						const parsedData = JSON.parse(cachedData);
						setStore({ [storageKey]: parsedData });
						return; // Termina la ejecución si se encuentran datos en caché
					}
			
					// Configuración para la solicitud a la API
					const myHeaders = new Headers();
					myHeaders.append("Content-Type", "application/json");
					const requestOptions = {
						method: "GET",
						headers: myHeaders,
					};
			
					// Realiza la solicitud a la API
					let response = await fetch(`https://www.swapi.tech/api/${object}`, requestOptions);
					let result = await response.json();
			
					// Guarda los datos en localStorage y actualiza el store
					localStorage.setItem(cacheKey, JSON.stringify(result.results || result.result.properties));
					if (result.hasOwnProperty('results')) {
						// Para listados como '/people', '/planets', '/vehicles'
						setStore({ [objectType]: result.results });
					} else {
						// Para recursos específicos como '/people/1'
						const resourceName = isSpecificResource && objectType === 'people' ? 'character' : objectType;
						setStore({ [resourceName]: result.result.properties });
					}
			
				} catch (error) {
					console.error('Fetch error:', error);
				}
			},
			
			
			
			// getSWAPIResource: async (object) => {
			// 	try {
			// 		const myHeaders = new Headers();
			// 		myHeaders.append("Content-Type", "application/json");

			// 		const requestOptions = {
			// 			method: "GET",
			// 			headers: myHeaders,
			// 		};
			// 		let response = await fetch(`https://www.swapi.tech/api/${object}`, requestOptions)
			// 		let result = await response.json()
			// 		console.log(result);
			// 		if (result.hasOwnProperty('results'))
			// 			// Para '/people', '/planets', '/vehicles'
			// 			setStore({ [object]: result.results })
			// 		else {
			// 			// Para '/people/1', '/planets/1', '/vehicles/1'
			// 			const objectType = object.split('/')[0].replace(/s$/, '');
			// 			// console.log(`%c${objectType}`, 'color: white; background-color: green;');
			// 			const resourceName = (objectType === "people") ? "character" : objectType;
			// 			setStore({ [resourceName]: result.result.properties })
			// 		}

			// 	} catch (error) {
			// 		console.error(error)
			// 	}
			// },
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
