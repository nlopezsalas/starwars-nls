
import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CharacterCard(props) {

    const [characterInfo, setCharacterInfo] = useState({});

    console.log("UID: " + props.uid);

    function getCharacterInfo() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch(`https://www.swapi.tech/api/people/${props.uid}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setCharacterInfo({ ...result.result.properties });
            })
            .catch((error) => console.error(error));
        return characterInfo;
    }

    useEffect(() => {
        getPlanetInfo();
        console.log(planetInfo);

    }, []);


    return (
        <Card className="card" style={{ width: '18rem' }} key={props.uid}>
            {(props.name === "Tatooine")
                ?
                <Card.Img variant="top" src="https://starwars-visualguide.com/assets/img/planets/2.jpg" />
                :
                <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/planets/${props.uid}.jpg`} />}
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text className="no-wrap">
                    Terrain: {planetInfo.terrain}<br />
                    Population: {planetInfo.population}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default CharacterCard;