import { shallowEqual, useDispatch, useSelector, useStore } from "react-redux";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {getProjectById, getProjects} from "../../store/actions/projectActions";
import {CheckIcon, PlusIcon} from "@heroicons/react/outline";

export default function Account(props) {
    const dispatch = useDispatch();
    const projects = useSelector((state) => state?.projects.data);
    const userId = useSelector((state) => state?.firebase.auth.uid);

    useEffect(() => {
        dispatch(getProjects({ userId }));
    }, []);

    return (
        <>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ">
                <h2 className="mt-10 inline-flex self-stretch flex-grow w-full text-left text-3xl font-extrabold text-gray-900">
                    Мои объявления
                </h2>
                <span className="flex my-5">
                    <a
                        href="/order"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Создать новое
                    </a>
                </span>
                <div className="md:grid md:grid-cols-4 md:gap-6 my-10">
                    <div className="md:col-span-3 bg-gray-50 p-3">
                        {projects &&
                            projects.map((project) => (
                                <div key={project.id} className="block p-2 border-blue-100 ">
                                    {project.brand.label} {project.model.label}<br/>
                                    <a className="text-sm text-blue-600" href={`/order?action=edit&id=${project.id}`}>Редактировать</a>
                                </div>
                            ))}
                    </div>
                    <div className="md:col-span-1 bg-gray-50 p-3">
                    </div>
                </div>
            </div>
        </>
    );
}
