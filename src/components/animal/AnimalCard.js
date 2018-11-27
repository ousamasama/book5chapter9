import React, { Component } from 'react'
import { Link } from "react-router-dom";
import dog from "./DogIcon.png"

export default class AnimalCard extends Component {
    animalOwners(animal) {
        const ao = this.props.animalsOwned
        const own = this.props.owners
        const ownerNameArr = []

        ao.forEach(animalOwner => {
            if (animal.id === animalOwner.animalId) {
                let petOwnerId = animalOwner.ownerId
                own.forEach(owner => {
                    if (owner.id === petOwnerId) {
                        ownerNameArr.push(owner.name)
                    }
                })
            }
        })
        return ` Owner(s): ${ownerNameArr.join(" and ")}`
    }
    
    render() {
        return (
            <div key={this.props.animal.id} className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        <img src={dog} className="icon--dog" />
                        <p>Pet Name: {this.props.animal.name}</p>
                        <p>Breed: {this.props.animal.breed}</p>
                        {this.animalOwners(this.props.animal)}
                        <Link className="nav-link" to={`/animals/${this.props.animal.id}`}>Details</Link>
                        <a href="#"
                            onClick={() => this.props.deleteAnimal(this.props.animal.id)}
                            className="card-link">Delete</a>
                    </h5>
                </div>
            </div>
        )
    }
}