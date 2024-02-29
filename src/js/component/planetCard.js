
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function PlanetCard(props) {

    const [planetInfo, setPlanetInfo] = useState({});

    console.log("UID: " + props.uid);

    // function getPlanetInfo() {
    //     const myHeaders = new Headers();
    //     myHeaders.append("Content-Type", "application/json");

    //     const requestOptions = {
    //         method: "GET",
    //         headers: myHeaders,
    //     };

    //     fetch(`https://www.swapi.tech/api/planets/${props.uid}`, requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             console.log(result);
    //             setPlanetInfo({ ...result.result.properties });
    //         })
    //         .catch((error) => console.error(error));
    //     return planetInfo;
    // }

    useEffect(() => {
        // getPlanetInfo();
        // console.log(planetInfo);

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
                {/* <Card.Text className="no-wrap">
                    Terrain: {planetInfo.terrain}<br />
                    Population: {planetInfo.population}
                </Card.Text> */}
            <div className="d-flex justify-content-between">
                <Link className="btn btn-primary " to={"/planets/" + props.uid}>Read more</Link>
                <Button variant="warning"><FontAwesomeIcon icon={faHeart} /></Button>
            </div>
                
            </Card.Body>
        </Card>
    );
}

export default PlanetCard;