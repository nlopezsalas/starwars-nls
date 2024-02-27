
import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function VehicleCard(props) {

    const [vehicleInfo, setVehicleInfo] = useState({});

    console.log("UID: " + props.uid);

    function getVehicleInfo() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch(`https://www.swapi.tech/api/vehicles/${props.uid}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setVehicleInfo({ ...result.result.properties });
            })
            .catch((error) => console.error(error));
        return vehicleInfo;
    }

    useEffect(() => {
        getVehicleInfo();
        console.log(vehicleInfo);

    }, []);


    return (
        <Card className="card" style={{ width: '18rem' }} key={props.uid}>
            
            <Card.Img variant="top" src="https://starwars-visualguide.com/assets/img/planets/2.jpg" />  
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text className="no-wrap">
                    Texto
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}

export default VehicleCard;