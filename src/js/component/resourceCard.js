
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

//Boostrap
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function ResourceCard(props) {

    const { store, actions } = useContext(Context);
    
    return (
        <Card className="card" style={{ width: '18rem' }} key={props.uid}>
            {(props.name === 'Tatooine')
                ? <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/${props.resource}/2.jpg`} />
                : (props.resource === 'people')
                    ? <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/characters/${props.uid}.jpg`} />
                    : <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/${props.resource}/${props.uid}.jpg`} />
            }
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <div className="d-flex justify-content-between">
                    <Link className="btn btn-primary" to={"/" + props.resource + "/" + props.uid} resource={props.resource}>Read more</Link>
                    <Button variant="warning" onClick={(e) => actions.addFavorites(props.name, props.uid, props.resource)}><FontAwesomeIcon icon={faHeart} /></Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ResourceCard;