/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useState} from 'react'
import {Disclosure, Menu, Listbox, Transition} from '@headlessui/react'
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/outline'
import {ChevronDownIcon} from '@heroicons/react/solid'
import {CheckIcon, SelectorIcon} from "@heroicons/react/solid";

const navigation = [
    {name: 'Dashboard', href: '/', current: true},
    {name: 'Team', href: '/users', current: false},
    {name: 'Projects', href: '#', current: false},
    {name: 'Calendar', href: '#', current: false},
]
const profile = ['Your Profile', 'Settings', 'Sign out']

const people = [
    {id: 1, name: "Durward Reynolds"},
    {id: 2, name: "Kenton Towne"},
    {id: 3, name: "Therese Wunsch"},
    {id: 4, name: "Benedict Kessler"},
    {id: 5, name: "Katelyn Rohan"},
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Form() {
    const [selected, setSelected] = useState(people[0]);

    console.log('test')

    return (
        <div>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Replace with your content */}
                    <div className="bg-gray-50">
                        <div
                            className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                                <span className="block">Ready to dive in?</span>
                                <span className="block text-indigo-600">Start your free trial today.</span>
                            </h2>
                            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                                <div className="inline-flex rounded-md shadow">
                                    <a
                                        href="#"
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
                    <div>
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <Listbox value={selected} onChange={setSelected}>
                                        {({open}) => (
                                            <>
                                                <div className="relative mt-1">
                                                    <Listbox.Button
                                                        className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                                        <span className="block truncate">{selected.name}</span>
                                                        <span
                                                            className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                  />
                </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options
                                                            static
                                                            className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                                        >
                                                            {people.map((person, personIdx) => (
                                                                <Listbox.Option
                                                                    key={personIdx}
                                                                    className={({active}) =>
                                                                        `${
                                                                            active
                                                                                ? "text-amber-900 bg-amber-100"
                                                                                : "text-gray-900"
                                                                        }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                                                                    }
                                                                    value={person}
                                                                >
                                                                    {({selected, active}) => (
                                                                        <>
                          <span
                              className={`${
                                  selected ? "font-medium" : "font-normal"
                              } block truncate`}
                          >
                            {person.name}
                          </span>
                                                                            {selected ? (
                                                                                <span
                                                                                    className={`${
                                                                                        active ? "text-amber-600" : "text-amber-600"
                                                                                    }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                                                                >
                              <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                              />
                            </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /End replace */}
                </div>
            </main>
        </div>
    )
}
