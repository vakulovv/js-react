import {Disclosure, Menu, Transition} from "@headlessui/react";
import {BellIcon, MenuIcon, XIcon} from "@heroicons/react/outline";
import React, {Fragment} from "react";
import {connect, useSelector} from "react-redux";
import Profile from "./Profile";
import {LockClosedIcon, UserIcon} from "@heroicons/react/solid";
import ChangeRegion from "./Region";

const nav = {
    auth: [
        {name: 'Главная', href: '/', current: false},
        {name: 'Поиск объявлений', href: '/market', current: false},
        {name: 'Мои объявления', href: '/account', current: false},
        {name: 'Table', href: '/table', current: false}
    ],
    noauth: []
}

const profile = ['Your Profile', 'Settings', 'Sign out']

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = (props) => {
    const {auth} = props;
    const navigation = (auth.uid) ?  nav.auth : nav.noauth;
    console.log('state', profile);

    return (
        <Disclosure as="nav" className="bg-gray-700">
            {({open}) => (
                <div>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <img
                                        className="block lg:hidden h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                        alt="Workflow"
                                    />
                                    <img
                                        className="hidden lg:block h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-2 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <span className=" block ">
                                <ChangeRegion />
                            </span>
                            { (auth.uid) ? <Profile user={auth}/>
                                        : <span className="flex text-indigo-600 ">
                                    <a className="flex items-center px-2 text-indigo-500" href="/signup">
                                    <UserIcon
                                        className="h-4 w-4 mx-1 inline-flex text-indigo-500 group-hover:text-indigo-400"
                                        aria-hidden="true"/>
                                   Зарегистрироваться
                                </a> | <a className="flex items-center px-2 text-indigo-500" href="/signin">
                                            <LockClosedIcon className="h-4 w-4 mx-1 inline-flex text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                            Войти
                                            </a>
                            </span>  }
                        </div>
                    </div>
                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar)