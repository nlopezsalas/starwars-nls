const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			planets: [],
			characters: [],
			vehicles: []
			
		},
		actions: {
			getPlanets: () => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const requestOptions = {
					method: "GET",
					headers: myHeaders,
					redirect: "follow"
				};

				fetch("https://www.swapi.tech/api/planets/", requestOptions)
					.then((response) => response.json())
					.then((result) => {
						console.log(result);
						setStore({ planets: result.results})
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
