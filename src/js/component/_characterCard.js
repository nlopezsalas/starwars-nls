
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function CharacterCard(props) {
    return (
        <Card className="card" style={{ width: '18rem' }} key={props.uid}>
                <Card.Img variant="top" src={`https://starwars-visualguide.com/assets/img/characters/${props.uid}.jpg`} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <div className="d-flex justify-content-between">
                    <Link className="btn btn-primary " to={"/people/" + props.uid}>Read more</Link>
                    <Button variant="warning"><FontAwesomeIcon icon={faHeart} /></Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CharacterCard;