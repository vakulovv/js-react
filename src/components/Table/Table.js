import React, { Component, useEffect, useState, Fragment } from "react";
import firebase from "../../config/fbConfig";
import { useTable, usePagination } from "react-table";

import Select, { components, createFilter } from "react-select";

import makeData from "../../data/cities/cities.js";
import { compose } from "redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { connect } from "react-redux";
import Loader from "../layout/Loader";

import cities from "../../data/cities/cities.js";
import types from "../../data/services/services.js";
import ChangeRegion from "../Navbar/Region";
import SelectSearch, { fuzzySearch } from "react-select-search";
import { useFirestore } from "react-redux-firebase";
import makeAnimated from "react-select/animated";
import * as qs from "@babel/core";
import { withRouter } from "react-router";
import cars from "../../data/cars/cars";

import MenuList from "./MenuList";
import { Transition } from "@headlessui/react";
import Modal from "../Modal/Modal";

import YoutubeSVG from "../../assets/svg/youtube.svg";
import InstagramSVG from "../../assets/svg/instagram.svg";
import Region from "../Navbar/Region";
import Users from "../Users/Users";
import {SearchIcon, KeyIcon} from "@heroicons/react/outline";

const getCityName = (person) => {
    const city = cities.find((city) => city.kladr_id === person.city);
    return city?.city || city?.region;
};

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    );

    const info = JSON.stringify(
        {
            pageIndex,
            pageSize,
            pageCount,
            canNextPage,
            canPreviousPage,
        },
        null,
        2
    );

    console.log("info", info);

    // Render the UI for your table
    return (
        <>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table {...getTableProps()} className="table-auto min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        {headerGroups.map((headerGroup) => (
                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers.map((column) => (
                                                    <th
                                                        scope="col"
                                                        {...column.getHeaderProps()}
                                                        className="px-6  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        width={column.width}
                                                    >
                                                        {column.render("Header")}
                                                    </th>
                                                ))}
                                            </tr>
                                        ))}
                                    </thead>

                                    <tbody
                                        {...getTableBodyProps()}
                                        className="bg-white divide-y divide-gray-200 text-left"
                                    >
                                        {page.map((row, i) => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells &&
                                                        row.cells.map((cell) => {
                                                            return (
                                                                <td
                                                                    {...cell.getCellProps()}
                                                                    className="px-4 py-8 whitespace-nowrap"
                                                                >
                                                                    {cell.render("Cell")}
                                                                </td>
                                                            );
                                                        })}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                {console.log("row.cells.length", page.length)}
                                {page.length === 0 && (
                                    <div className="p-8 whitespace-nowrap text-center w-full">Ничего не найдено</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 pagination text-center">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {"<<"}
                </button>{" "}
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    {"<"}
                </button>{" "}
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    {">"}
                </button>{" "}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {">>"}
                </button>{" "}
            </div>
            <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 pagination text-center">
                <span>
                    Page{" "}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                </span>
                <span>
                    | Go to page:{" "}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                    />
                </span>{" "}
                <select
                    value={pageSize}
                    onChange={(e) => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

function AppTable(props) {
    console.log("props", props);

    //let { users } =  this.props;
    let [users, setUsers] = useState(props.users);
    let [params, setParams] = useState(props.params);
    let [options, setOptions] = useState({
        primary: false,
        secondary: false,
        thirty: false,
    });

    const [open, setOpen] = useState(false);
    const [toUser, setToUser] = useState(null);

    useEffect(() => {
        console.log("params changed"); // <-- logged each time the component renders
        console.log(Object.entries(params)); // <-- logged each time the component renders

        const queryParams = Object.entries(params).reduce((acc, [key, value]) => {
            if (Object.prototype.toString.call(value) === "[object Object]") {
                let values = Object.entries(value).reduce((acc, [key, value]) => {
                    if (value) acc.push(key);
                    return acc;
                }, []);
                console.log("test");
                if (values.length) {
                    acc[key] = values;
                }
            } else if ((!Array.isArray(value) && value) || (value && value.length)) {
                acc[key] = value;
            }

            return acc;
        }, {});
        console.log("queryParams", queryParams); // <-- logged each time the component renders
        const urlParams = new URLSearchParams(queryParams);

        props.history.push({
            pathname: "",
            search: urlParams.toString(),
        });
    }, [params]);

    useEffect(() => {
        setUsers(props.users);
    }, [props.users]);

    useEffect(() => {
        console.log("useEffect options called"); // <-- logged each time the component renders

        let values = Object.entries(options).reduce((acc, [key, value]) => {
            if (value) acc.push({ value: key });
            return acc;
        }, []);
        setFilter(values, { name: "options" });
    }, [options]);

    const onChangeClass = (value) => {
        //console.log("setValue",!options.[value])
        setOptions((prevState) => {
            return { ...prevState, [value]: !prevState[value] };
        });
    };

    //let {users} = props;

    const columns = [
        {
            Header: "",
            accessor: "avatar",
            width: "120px",
            Cell: ({ value }) => {
                return <div className="flex items-center text-center items-right justify-center ">
                    <div className="avatar inline-flex p-1">
                        <img src={value} className="h-14 w-14  border-white	border rounded-full" />
                    </div>

                </div>
            },
        },
        {
            Header: "firstName",
            accessor: "firstName",
            accessor: (d) => {
                return {
                    firstName: d.firstName,
                    service: types.find((item) => item.value === d.service)?.label,
                };

            },
            Cell: ({ value }) => {
                return <div>
                    <span className=" text-base flex  text-gray-700">{value.firstName}</span>
                    <span className=" text-sm flex text-gray-500">{value.service}</span>
                </div> ;

            },
            width: "auto",
        },
        {
            Header: "",
            accessor: "id",
            width: "20%",
            Cell: ({ value }) => {
                return (
                    <div>
                        <button
                            className="   active:scale-90 transform hover:bg-indigo-700 ease-in-out duration-300 active:bg-green-700 scale-100   flex-item items-center rounded-md bg-indigo-500 text-white text-sm font-medium px-4 py-1.5"
                            onClick={() => {
                                console.log(users);
                                const toUser = users.find((user) => user.id === value);
                                setToUser(toUser);
                                setOpen(true);
                            }}
                        >
                            <KeyIcon className="h-4 w-4 inline-block text-indigo-100 mr-1 ml-0 " aria-hidden="true" />
                            Заявка на подбор
                        </button>

                    </div>

                );
            },
        },
        {
            Header: "Индекс",
            accessor: "stars",
            width: "auto",
            Cell: ({ value }) => {
                return (
                    <div className="flex items-center text-sm font-medium my-5">
                        <svg width="20" height="20" fill="#e29324" className="text-yellow-600">
                            <path d="M9.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.784-.57-.381-1.81.587-1.81H7.03a1 1 0 00.95-.69L9.05 3.69z" />
                        </svg>
                        <div className="ml-1">
                            <span className="text-black">4.94</span>
                            <span className="text-gray-400 sm:hidden md:inline ml-1">(128)</span>
                        </div>
                    </div>
                );
            },
        },
        {
            Header: "city",
            accessor: "city",
            width: "auto",
            Cell: ({ value }) => {
                return value ? <span className="px-2 inline-flex text-sm text-gray-500">{value}</span> : null;
            },
        },
        {
            Header: "socials",
            accessor: "socials",
            width: "auto",
            Cell: ({ value }) => {
                const socials = {
                    youtube: YoutubeSVG,
                    drive2: "/assets/image/drive2.png",
                    instagram: InstagramSVG,
                };
                return value
                    ? Object.entries(value).map(([key, value]) => (
                          <a href={value} target="_blank">
                              <img
                                  src={socials[key]}
                                  className="iconChat"
                                  alt="Icon chat"
                                  className="h-6  inline-block mx-1"
                              />
                          </a>
                      ))
                    : null;
            },
        },
    ];

    //const data = React.useMemo(() => makeData(100000), [])
    //const data = makeData;

    //const { users } = props;

    const setFilter = (e, name, event) => {
        console.log("e", e);
        console.log(event);

        const param = name?.name || e.target?.name || null;

        let value = null;

        if (Array.isArray(e)) {
            value = e.map((el) => el.value);
        } else {
            value = e?.value || e?.target?.value || e?.target?.dataset?.value || null;
        }
        if (e?.target?.dataset?.value) {
            setParams((prevState) => {
                return {
                    ...prevState,
                    options: {
                        ...prevState.options,
                        [value]: !prevState.options[value],
                    },
                };
            });
        } else {
            const search = props.history.location.search;
            const urlParams = new URLSearchParams(search);

            setParams((prevState) => {
                return { ...prevState, [param]: value };
            });

            console.log("here", value);
            if (value) {
                // setOptions((prevState) => {
                //     return { ...prevState,
                //         options: {
                //             ...prevState.options,
                //             [param]: value
                //         } };
                // });
            } else {
                urlParams.delete(param);
                props.history.push({
                    pathname: "",
                    search: urlParams.toString(),
                });
            }
        }

        // firebase
        //     .firestore()
        //     .collection("user")
        //     .where("city", "==", e)
        //     .get()
        //     .then((collection) => {
        //         const users = collection.docs.map((user) => user.data());
        //         console.log(users);
        //         setUsers(users);
        //     });

        // compose(
        // useFirestoreConnect(  {
        //     collection: 'user',
        //     where: [['city', '==', e]],
        // }) )// sync todos collection from Firestore into redux
        // const users = useSelector((state) => state.firestore.data.todos)
        // console.log(usersListTmp)
        // const usersRef = firebase.database().ref("user");
        // usersRef.on('value', (snapshot) => {
        //     const users = snapshot.val();
        //     const usersListTmp = [];
        //     for (let firstname in users) {
        //         usersListTmp.push(users[firstname])
        //
        //     }
        //     console.log(usersListTmp)
        //     usersList = JSON.parse(JSON.stringify(usersListTmp));
        // })
    };

    /**
     * The options array should contain objects.
     * Required keys are "name" and "value" but you can have and use any number of key/value pairs.
     */
    const citiesOptions = cities
        // .sort((a, b) => a.city.localeCompare(b.city))
        .map((item) => {
            const option = {};
            option.label = item.city || item.region || "";
            option.value = item.kladr_id || "";
            return option;
        });

    console.log(citiesOptions.length);
    citiesOptions.unshift({ label: "Вся Россия", value: "" });

    // Show message while todos are loading
    if (!isLoaded(users)) {
        return <Loader />;
    }

    console.log("users", users);

    let usersList = JSON.parse(JSON.stringify(users));
    console.log("usersList", usersList);
    usersList = usersList.map((user) => {
        const city = cities.find((city) => city.kladr_id === user.city);
        user.city = city?.city || city?.region;
        user.avatar = "https://unsplash.com/photos/mFadZWL9UiI/download?force=true&w=640}%20alt=%22%22";
        return user;
    });

    const carsOptions = Object.keys(cars.list).map((item) => {
        const option = {};
        option.label = item || null;
        option.value = item.toLowerCase() || null;
        return option;
    });
    const animatedComponents = makeAnimated();

    const Menu = (props) => {
        return (
            <components.Menu {...props} className="animate-select-open">
                {props.children}
            </components.Menu>
        );
    };

    const Option = ({ children, ...props }) => {
        const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
        const newProps = Object.assign(props, { innerProps: rest });
        return (
            <div className="hover:bg-gray-50 cursor-pointer">
                <components.Option {...newProps}>{children}</components.Option>
            </div>
        );
    };

    const style = {
        container: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            //     borderImageWidth: 0,
            //     color: "red",
            //
            // border: state.isFocused ? "3px solid red" : "0px solid white",
            //
            //
            // // This line disable the blue border
            // boxShadow: state.isFocused ? "none" : "none",
            //
            //     outline: "none"
        }),
        control: (provided, state) => ({
            ...provided,
            cursor: "pointer",
            //     borderImageWidth: 0,
            //     color: "red",
            //
            // border: state.isFocused ? "3px solid red" : "0px solid white",
            //
            //
            // // This line disable the blue border
            // boxShadow: state.isFocused ? "none" : "none",
            //
            //     outline: "none"
        }),

        input: (provided, state) => ({
            ...provided,
            //     borderImageWidth: 0,
            //     color: "red",
            //
            // border: state.isFocused ? "3px solid red" : "0px solid white",
            //
            //
            // // This line disable the blue border
            // boxShadow: state.isFocused ? "none" : "none",
            //
            //     outline: "none"
        }),
    };

    const count = [];

    const servicesOptions = types.map((item) => item);

    console.log("types ", types);

    return (
        <div>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl my-5">
                        Таблица поиска
                    </h1>
                    <div className="filter">
                        <form className="relative">
                            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <div className="relative">
                                        <svg
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            />
                                        </svg>
                                        <input
                                            className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-10"
                                            type="text"
                                            aria-label="Filter name"
                                            placeholder="Поиск по названию"
                                            name="firstname"
                                            autoComplete="off"
                                            onChange={setFilter}
                                            value={params.firstname}
                                        />
                                    </div>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 w-60">
                                    <Select
                                        closeMenuOnSelect={true}
                                        className="w-full  cursor-pointer "
                                        isMulti
                                        placeholder="Специализация по бренду"
                                        options={carsOptions}
                                        name="cars"
                                        components={{ Menu, MenuList, Option }}
                                        onChange={setFilter}
                                        isClearable={true}
                                        styles={style}
                                        defaultValue={params.cars}
                                        value={carsOptions.filter((option) => {
                                            return (
                                                params.cars && params.cars.indexOf(option.value.toLowerCase()) !== -1
                                            );
                                        })}
                                    />
                                </div>
                                <div className="mt-2 flex items-center  w-52 text-sm text-gray-500">
                                    <Select
                                        className="w-full cursor-pointer 	"
                                        placeholder="Город"
                                        options={citiesOptions}
                                        name="city"
                                        components={{ Menu, MenuList, Option }}
                                        onChange={setFilter}
                                        isClearable={true}
                                        styles={style}
                                        value={citiesOptions.filter((option) => params.city === option.value)}
                                    />
                                </div>
                                <div className="mt-2 flex items-center  w-40 text-sm text-gray-500">
                                    <Select
                                        className="w-full cursor-pointer 	"
                                        placeholder="Тип"
                                        options={servicesOptions}
                                        name="services"
                                        components={{ Menu, MenuList, Option }}
                                        onChange={setFilter}
                                        isSearchable={false}
                                        isClearable={true}
                                        styles={style}
                                    />
                                </div>

                                <div className="mt-2 flex items-center w-72 text-sm   space-x-2 whitespace-nowrap">
                                    <a
                                        name="options"
                                        onClick={setFilter}
                                        data-value="primary"
                                        className={` ${
                                            params?.options?.primary ? "bg-indigo-500 text-gray-100" : "text-gray-800"
                                        }  block ease-in-out duration-200  pl-4 pr-8   py-2 flex text-xs text-center items-center justify-center hover:bg-indigo-500  hover:text-white rounded-full bg-gray-100 font-medium `}
                                    >
                                        Опция
                                        {params?.options?.primary ? (
                                            <span className=" relative inline-flex flex-auto flex-row-reverse">
                                                <span className="absolute -inset-0 -left-2 -top-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="100%"
                                                        height="100%"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        className="feather feather-x cursor-pointer   rounded-full w-4 h-4 ml-2"
                                                    >
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </span>
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </a>
                                    <a
                                        name="options"
                                        onClick={setFilter}
                                        data-value="secondary"
                                        className={` ${
                                            params?.options?.secondary ? "bg-indigo-500 text-gray-100" : "text-gray-800"
                                        }  block ease-in-out duration-100 pl-4 pr-8 py-2 flex text-xs items-center justify-center hover:bg-indigo-500  hover:text-white rounded-full bg-gray-100 font-medium `}
                                    >
                                        Опция
                                        {params?.options?.secondary ? (
                                            <span className="relative inline-flex flex-auto flex-row-reverse">
                                                <span className="absolute -inset-0 -left-2 -top-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="100%"
                                                        height="100%"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        className="feather feather-x cursor-pointer   rounded-full w-4 h-4 ml-2"
                                                    >
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </span>
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </a>

                                    <a
                                        name="options"
                                        onClick={setFilter}
                                        data-value="thirty"
                                        className={` ${
                                            params?.options?.thirty ? "bg-indigo-500 text-gray-100" : "text-gray-800"
                                        }  block ease-in-out duration-100 pl-4 pr-8 py-2 flex text-xs items-center justify-center hover:bg-indigo-500  hover:text-white rounded-full bg-gray-100 font-medium `}
                                    >
                                        Опция
                                        {params?.options?.thirty ? (
                                            <span className="relative inline-flex flex-auto flex-row-reverse">
                                                <span className="absolute -inset-0 -left-2 -top-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="100%"
                                                        height="100%"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        className="feather feather-x cursor-pointer   rounded-full w-4 h-4 ml-2"
                                                    >
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </span>
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <Table columns={columns} data={usersList} />
            </main>
            <Modal open={open} setOpen={setOpen} region={<Region />} count={count} user={toUser} />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.user,
        status: 0,
        params: {
            city: getCityParam(),
            cars: getCarsParam(),
            firstname: getNameParam(),
            options: getOptionsParam(),
        },
    };
};

// export default withRouter(compose(
//     connect(mapStateToProps),
//     firestoreConnect(props => [{ collection: "user",  where: [["city", "==", +foo]] }]))
// )(AppTable);

const getCityParam = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const foo = params.get("city") || null;
    return foo ? +foo : foo;
};

const getCarsParam = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const foo = params.get("cars")?.toLowerCase()?.split(",") || null;

    return foo;
};

const getNameParam = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const foo = params.get("firstname") || null;

    return foo;
};

const getOptionsParam = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const foo = params.get("options") || null;

    return foo;
};

const getTypeParam = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const foo = params.get("services") || null;

    return foo;
};

const getQuery = () => {
    const carsParam = getCarsParam();
    const cityParam = getCityParam();
    const nameParam = getNameParam();
    const typeParam = getTypeParam();
    const options = [];

    if (carsParam) {
        options.push(["cars", "array-contains-any", carsParam]);
    }

    if (cityParam) {
        options.push(["city", "==", cityParam]);
    }

    if (typeParam) {
        options.push(["service", "==", typeParam]);
    }

    if (nameParam) {
        console.log(nameParam);
        options.push(["firstName", ">=", nameParam]);
        options.push(["firstName", "<=", nameParam + "\uf8ff"]);
    }

    return options.length ? options : null;
};

export default withRouter(
    compose(
        connect(mapStateToProps),
        firestoreConnect((props) => [
            {
                collection: "user",
                where: getQuery() ? getQuery() : null,
            },
        ])
    )(AppTable)
);
