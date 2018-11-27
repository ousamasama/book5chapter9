import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import AnimalForm from './animal/AnimalForm'
import EmployeeForm from './employee/EmployeeForm'
import OwnerForm from './owner/OwnerForm'
import AnimalManager from "../modules/AnimalManager"
import EmployeeManager from "../modules/EmployeeManager"
import OwnerManager from "../modules/OwnerManager"
import LocationManager from "../modules/LocationManager"
import AnimalsOwnedManager from "../modules/AnimalsOwnedManager"
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnerList from './owner/OwnerList'
import AnimalDetail from './animal/AnimalDetail'
import EmployeeDetail from './employee/EmployeeDetail'
import LocationDetail from './location/LocationDetail'
import OwnerDetail from './owner/OwnerDetail'
import Login from './authentication/Login'


export default class ApplicationViews extends Component {
    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: [],
        animalsOwned: []
    }

    componentDidMount() {
        // const newState = {}

        AnimalManager.getAll().then(allAnimals => {
            this.setState({
                animals: allAnimals
            })
        })
        EmployeeManager.getAll().then(allEmployees => {
            this.setState({
                employees: allEmployees
            })
        })
        OwnerManager.getAll().then(allOwners => {
            this.setState({
                owners: allOwners
            })
        })
        LocationManager.getAll().then(allLocations => {
            this.setState({
                locations: allLocations
            })
        })
        AnimalsOwnedManager.getAll().then(allAnimalsOwned => {
            this.setState({
                animalsOwned: allAnimalsOwned
            })
        })


        // fetch("http://localhost:5002/animals")
        //     .then(r => r.json())
        //     .then(animals => newState.animals = animals)
        //     .then(() => fetch("http://localhost:5002/employees")
        //     .then(r => r.json()))
        //     .then(employees => newState.employees = employees)
        //     .then(() => this.setState(newState))
        //     .then(() => fetch("http://localhost:5002/owners")
        //     .then(r => r.json()))
        //     .then(owners => newState.owners = owners)
        //     .then(() => this.setState(newState))
        //     .then(() => fetch("http://localhost:5002/locations")
        //     .then(r => r.json()))
        //     .then(locations => newState.locations = locations)
        //     .then(() => this.setState(newState))
        //     .then(() => fetch("http://localhost:5002/animalsOwned")
        //     .then(r => r.json()))
        //     .then(animalsOwned => newState.animalsOwned = animalsOwned)
        //     .then(() => this.setState(newState))
    }

    // deleteAnimal = id => {
    //     return fetch(`http://localhost:5002/animals/${id}`, {
    //         method: "DELETE"
    //     })
    //     .then(e => e.json())
    //     .then(() => fetch(`http://localhost:5002/animals`))
    //     .then(e => e.json())
    //     .then(animals => this.setState({
    //         animals: animals
    //     })
    //   )
    // }

    // Check if credentials are in local storage
    isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    deleteAnimal = (id) => {
        return AnimalManager.removeAndList(id)
            .then(animals => this.setState({
                animals: animals
            })
            )
    }

    fireEmployee = id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/employees`))
            .then(e => e.json())
            .then(employees => this.setState({
                employees: employees
            })
            )
    }

    removeCustomer = id => {
        return fetch(`http://localhost:5002/owners/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/owners`))
            .then(e => e.json())
            .then(owners => this.setState({
                owners: owners
            })
            )
    }

    addAnimal = animal => AnimalManager.post(animal)
        .then(() => AnimalManager.all())
        .then(animals => this.setState({
            animals: animals
        })
        )

    addEmployee = employee => EmployeeManager.post(employee)
        .then(() => EmployeeManager.all())
        .then(employees => this.setState({
            employees: employees
        })
        )

    addOwner = owner => OwnerManager.post(owner)
        .then(() => OwnerManager.all())
        .then(owners => this.setState({
            owners: owners
        })
        )

    // updateAnimal = animal => AnimalManager.put(animal)
    //     .then(() => AnimalManager.all())
    //     .then(animals => this.setState({
    //         animals: animals
    //     })
    //     )


    render() {
        return (
            <React.Fragment>
                {/* <Route exact path="/" render={props => {
                    return <LocationList locations={this.state.locations} />
                }} /> */}
                <Route exact path="/" render={props => {
                    if (this.isAuthenticated()) {
                        return <LocationList
                            locations={this.state.locations}
                            employees={this.state.employees}
                        />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route path="/locations/:locationId(\d+)" render={(props) => {
                    return <LocationDetail
                        {...props}
                        locations={this.state.locations}
                    />
                }} />
                {/* <Route exact path="/animals" render={(props) => {
                    return <AnimalList {...props}
                        deleteAnimal={this.deleteAnimal}
                        animals={this.state.animals}
                        owners={this.state.owners}
                        animalsOwned={this.state.animalsOwned}
                    />
                }} /> */}
                <Route exact path="/animals" render={props => {
                    if (this.isAuthenticated()) {
                        return <AnimalList {...props}
                            deleteAnimal={this.deleteAnimal}
                            animals={this.state.animals}
                            owners={this.state.owners}
                            animalsOwned={this.state.animalsOwned}
                        />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                        addAnimal={this.addAnimal}
                        employees={this.state.employees}
                    />
                }} />
                <Route path="/animals/:animalId(\d+)" render={(props) => {
                    return <AnimalDetail
                        {...props}
                        deleteAnimal={this.deleteAnimal}
                        animals={this.state.animals}
                        owners={this.state.owners}
                        animalsOwned={this.state.animalsOwned}
                    />
                }} />
                {/* Our shiny new route. We pass employees to the AnimalForm so a dropdown can be populated */}
                {/* <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                                    addAnimal={this.addAnimal}
                                    employees={this.state.employees} />
                }} /> */}
                {/* <Route exact path="/employees" render={(props) => {
                    return <EmployeeList {...props}
                        fireEmployee={this.fireEmployee}
                        employees={this.state.employees}
                    />
                }} /> */}
                {/* <Route exact path="/employees" render={props => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList {...props}
                            fireEmployee={this.fireEmployee}
                            employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} /> */}
                <Route exact path="/employees" render={props => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList {...props}
                            fireEmployee={this.fireEmployee}
                            animals={this.state.animals}
                            owners={this.state.owners}
                            deleteAnimal={this.deleteAnimal}
                            animalsOwned={this.state.animalsOwned}
                            employees={this.state.employees} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/employees/new" render={(props) => {
                    return <EmployeeForm {...props}
                        addEmployee={this.addEmployee}
                        employees={this.state.employees}
                    />
                }} />
                <Route path="/employees/:employeeId(\d+)" render={(props) => {
                    return <EmployeeDetail
                        {...props}
                        fireEmployee={this.fireEmployee}
                        employees={this.state.employees}
                    />
                }} />
                {/* <Route exact path="/owners" render={(props) => {
                    return <OwnerList {...props}
                        removeCustomer={this.removeCustomer}
                        owners={this.state.owners}
                    />
                }} /> */}
                <Route exact path="/owners" render={props => {
                    if (this.isAuthenticated()) {
                        return <OwnerList {...props}
                            removeCustomer={this.removeCustomer}
                            owners={this.state.owners} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/owners/new" render={(props) => {
                    return <OwnerForm {...props}
                        addOwner={this.addOwner}
                        owners={this.state.owners}
                    />
                }} />
                <Route path="/owners/:ownerId(\d+)" render={(props) => {
                    return <OwnerDetail
                        {...props}
                        owners={this.state.owners}
                        removeCustomer={this.removeCustomer}
                    />
                }} />
                <Route path="/login" component={Login} />
            </React.Fragment>
        )
    }
}