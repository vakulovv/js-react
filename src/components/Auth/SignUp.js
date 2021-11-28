import React, {Component} from "react";
import {LockClosedIcon} from '@heroicons/react/solid'
import {connect} from "react-redux"
import {signIn, signUp} from "../../store/actions/authActions";
import {Redirect, useHistory} from 'react-router-dom'
import ChangeRegion from "../Navbar/Region";
import SelectSearch, {fuzzySearch} from "react-select-search";
import '../Navbar/region.css'
import cities from '../../data/cities/cities.js'

/**
 * The options array should contain objects.
 * Required keys are "name" and "value" but you can have and use any number of key/value pairs.
 */
const options = cities
    .sort((a,b) => a.city.localeCompare(b.city))
    .map((item) => {
        const option = {}
        option.name = item.city || item.region;
        option.value = item.kladr_id;
        return option;
    });


class SignUp extends Component {
    state = {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        city: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleChangeCity = (e) => {
        this.setState({
            ["city"]: e,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        this.props.signUp(this.state)
    }

    render() {
        const {auth, authError} = this.props;
        if (auth.uid) return <Redirect to='/'/>
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-2x px-4 sm:px-6 lg:px-8">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                            <h2 className="my-10 text-center text-3xl font-extrabold text-gray-900">Регистрация аккаунта</h2>
                            <div className="mx-auto bg-white rounded shadow">
                                <div className="pt-8 px-8">
                                    <div className="flex mb-4">
                                        <div className="w-1/2 mr-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="firstName">First Name</label>
                                            <input
                                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                id="firstName" type="text" placeholder="Your first name"
                                                onChange={this.handleChange}/>
                                        </div>
                                        <div className="w-1/2 ml-1">
                                            <label className="block text-grey-darker text-sm font-bold mb-2"
                                                   htmlFor="lastName">Last Name</label>
                                            <input
                                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                id="lastName" type="text" placeholder="Your last name"
                                                onChange={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="email">Email Address</label>
                                        <input
                                            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            id="email" type="email" placeholder="Your email address"
                                            onChange={this.handleChange}/>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-grey-darker text-sm font-bold mb-2"
                                               htmlFor="password">Password</label>
                                        <input
                                            className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                            id="password" type="password" placeholder="Your secure password"
                                            onChange={this.handleChange}/>
                                        <p className="text-grey text-xs mt-1">At least 6 characters</p>
                                    </div>
                                    <SelectSearch className="select-search"
                                                  id="city"
                                                  options={options}
                                                  search
                                                  autoComplete="true"
                                                  filterOptions={fuzzySearch}
                                                  placeholder="Ваш город"
                                                  onChange={this.handleChangeCity}/>
                                    <div className="flex items-center justify-between mt-8">
                                        <button
                                            className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full"
                                            type="submit">
                                            Sign Up
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center my-4">
                                <button
                                    type="submit"
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
                              </span>
                                    Зарегистрироваться
                                </button>
                                <div className="text-indigo-400">
                                    { authError ? <p>{ authError }</p> : null }
                                </div>
                                <a href="/signin"
                                   className="text-grey-dark text-sm no-underline hover:text-grey-darker">I
                                    already have an account</a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)