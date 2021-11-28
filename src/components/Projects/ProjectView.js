import React, { Component } from "react";
import { compose } from "redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import Loader from "../layout/Loader";
/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import {
    BriefcaseIcon,
    CalendarIcon,
    CheckIcon,
    ChevronDownIcon,
    CurrencyDollarIcon,
    LinkIcon,
    LocationMarkerIcon,
    PencilIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const ProjectView = (props) => {
    const { project } = props;
    console.log("project", project);

    // Show message while todos are loading
    if (!isLoaded(project)) {
        return <Loader />;
    }
    return (
        <div>
            <main>
                <div className="lg:relative max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 z-0">
                    <div className="rounded-lg shadow p-5">
                        <div className="lg:flex lg:items-center lg:justify-between">
                            <div className="flex-1 min-w-0">
                                <h1 className="text-3xl sm:text-5xl lg:text-4xl leading-none font-extrabold text-gray-900 tracking-tight mb-4">
                                    {project.title}
                                </h1>
                                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <BriefcaseIcon
                                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        Full-time
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <LocationMarkerIcon
                                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        Remote
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <CurrencyDollarIcon
                                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        $120k &ndash; $140k
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500">
                                        <CalendarIcon
                                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                        Closing on January 9, 2020
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                <span className="hidden sm:block">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                                        Edit
                                    </button>
                                </span>

                                <span className="hidden sm:block ml-3">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <LinkIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                                        View
                                    </button>
                                </span>

                                <span className="sm:ml-3">
                                    <button
                                        type="button"
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                        Publish
                                    </button>
                                </span>

                                {/* Dropdown */}
                                <Menu as="span" className="ml-3 relative sm:hidden">
                                    {({ open }) => (
                                        <>
                                            <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                More
                                                <ChevronDownIcon
                                                    className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                                                    aria-hidden="true"
                                                />
                                            </Menu.Button>

                                            <Transition
                                                show={open}
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    static
                                                    className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                                >
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? "bg-gray-100" : "",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                Edit
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? "bg-gray-100" : "",
                                                                    "block px-4 py-2 text-sm text-gray-700"
                                                                )}
                                                            >
                                                                View
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </>
                                    )}
                                </Menu>
                            </div>
                        </div>
                        <p className="my-2">{project.content}</p>
                        <span className="my-1 text-indigo-200">Author: {project.user}</span>
                    </div>
                </div>
            </main>
        </div>
    );
};

const mapStateToProps = ({ firestore: { data } }, props) => {
    return {
        project: data.projects && data.projects[props.match.params.id],
    };
};

export default compose(
    firestoreConnect((props) => [{ collection: "projects", doc: props.match.params.id}]),
    connect(mapStateToProps)
)(ProjectView);
