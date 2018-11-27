import React, { Component } from 'react'
import { Link } from "react-router-dom";

class LocationList extends Component {
    render() {
        return (
            <section className="locations list">
            {
                this.props.locations.map(location =>
                    <section>
                    <div key={location.id}>
                        <h1>{location.name}</h1>
                        <p>{location.address}</p>
                        <Link className="nav-link" to={`/locations/${location.id}`}>Details</Link>
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted">Employees on Staff:</h6>
                    <div className="location--employees">
                        {
                            this.props.employees
                                .filter(employee => employee.locationId === location.id)
                                .map(employee =>
                                    <h6>{employee.name}</h6>)
                        }
                    </div>
                    </section>
                )
            }
            </section>
        );
    }
}

export default LocationList