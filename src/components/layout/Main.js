/* This example requires Tailwind CSS v2.0+ */
import React, {Component} from "react";
import ProjectList from "../Projects/ProjectList";
import {connect, useSelector} from "react-redux";
import {firestoreConnect, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import 'firebase/firestore'
import Loader from "./Loader";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

class Main extends Component {
    render() {
        const { projects } = this.props;
        console.log(projects)
        if (!isLoaded(projects)) {
            return <Loader/>
        }
        return (
            <div>
                <main>
                    <div className="lg:relative max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 z-0">
                        {/* Replace with your content */}
                        <div className="relative  bg-gray-50" >
                            <div
                                className="relative z-2 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                    <span className="block">Project catalog</span>
                                    <span className="block text-indigo-600">Start your free trial today.</span>
                                </h2>
                                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                                    <div className="inline-flex rounded-md shadow">
                                        <a
                                            href="/order"
                                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                                        >
                                            Get started
                                        </a>
                                    </div>
                                    <div className="ml-3 inline-flex rounded-md shadow">
                                        <a
                                            href="#"
                                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                                        >
                                            Learn more
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <ProjectList projects={projects} />
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projects: state.firestore.ordered.projects
    }
}

export default compose(
    firestoreConnect([
        { collection: 'projects', limit: 3}
    ]),
    connect(mapStateToProps)
)(Main)
