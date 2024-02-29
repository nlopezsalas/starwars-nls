const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			planets: [],
			planet: {},
			people: [],
			vehicles: []

		},
		actions: {
			getPlanet: (object) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const requestOptions = {
					method: "GET",
					headers: myHeaders,
					redirect: "follow"
				};
				fetch(`https://www.swapi.tech/api/${object}`, requestOptions)
					.then((response) => response.json())
					.then((result) => {
						console.log(result);
						setStore({ planet: result.result.properties })
					})
					.catch((error) => console.error(error));
			},
			getPlanets: (object) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const requestOptions = {
					method: "GET",
					headers: myHeaders,
					redirect: "follow"
				};
				fetch(`https://www.swapi.tech/api/${object}`, requestOptions)
					// fetch("https://www.swapi.tech/api/planets/", requestOptions)
					.then((response) => response.json())
					.then((result) => {
						console.log(result);
						setStore({ [object]: result.results })
					})
					.catch((error) => console.error(error));
			},
			getCharacters: () => {
				const requestOptions = {
					method: "GET",
					redirect: "follow"
				};

				fetch("https://www.swapi.tech/api/people/", requestOptions)
					.then((response) => response.json())
					.then((result) => {
						console.log(result);
						setStore({ characters: result.results })
					})
					.catch((error) => console.error(error));
			},
			getVehicles: () => {
				const requestOptions = {
					method: "GET",
					redirect: "follow"
				};

				fetch("https://www.swapi.tech/api/vehicles/", requestOptions)
					.then((response) => response.json())
					.then((result) => {
						console.log(result);
						setStore({ vehicles: result.results })
					})
					.catch((error) => console.error(error));
			}
		}
	};
};

export default getState;
