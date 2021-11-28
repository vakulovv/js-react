import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import {CheckIcon} from "@heroicons/react/solid";
import {CheckCircleIcon, ExclamationCircleIcon} from "@heroicons/react/outline";
import {toggleNotification} from "../../store/actions/notificationAction";
import {useDispatch, useStore} from "react-redux";

export default function Notification({notification}) {
    const dispatch = useDispatch();
    const {isOpen, title, body, type} = notification;
    const className = type === "success" ? "text-green-500" : "text-red-500"
    const iconNotification = type === "success" ? <CheckCircleIcon className="h-7 w-7 text-green-500" aria-hidden="true" /> : <ExclamationCircleIcon className="h-7 w-7 text-red-500" aria-hidden="true" />

    if (!notification.isOpen) {
        return null
    }

    function closeNotification() {
        dispatch(toggleNotification({}, false));
    }

    setTimeout(() => {
        closeNotification();
    }, 3500)

    return (
        <>
             <Transition appear show={isOpen} as={Fragment}
                         enter="ease-out duration-500"
                         enterFrom="-right-28  "
                         enterTo="right-5  "
                         >
                <div className="fixed w-auto flex top-10 right-20 z-30" open={isOpen} onClick={closeNotification} >
                    <div className="m-auto">
                        <div className={ ` ${className} bg-white rounded-lg border-gray-300  p-3 shadow-lg`}>
                            <div className="flex flex-row">
                                <div className="px-2">
                                    {iconNotification}
                                </div>
                                <div className="ml-1 mr-6">
                                        <div className="inline-block   text-left  ">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">
                                                {title}
                                            </h3>
                                            <div className="mt-1">
                                                {body}
                                            </div>

                                            {/*<div className="mt-4">*/}
                                            {/*    <button*/}
                                            {/*        type="button"*/}
                                            {/*        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"*/}
                                            {/*        onClick={closeModal}*/}
                                            {/*    >*/}
                                            {/*        Got it, thanks!*/}
                                            {/*    </button>*/}
                                            {/*</div>*/}
                                        </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Transition>
        </>
    );
}
