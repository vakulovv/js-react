import React, {Component} from "react";
import firebase from "../../config/fbConfig"
import admin from "firebase";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import UserList from "./UserList";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

class Users extends Component {
    render() {
        var user2 = firebase.auth().currentUser;

        if (user2 != null) {
            user2.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("Provider-specific UID: " + profile.uid);
                console.log("Name: " + profile.displayName);
                console.log("Email: " + profile.email);
                console.log("Photo URL: " + profile.photoURL);
            });
        }

        const {users} = this.props;
        console.log('users',users)

        return (
            <div>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Title
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Status
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    Role
                                                </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                            </thead>
                                            <UserList users={users} />
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.user
    }
}

export default compose(
    firestoreConnect([
        {collection: 'user'}
    ]),
    connect(mapStateToProps)
)(Users)