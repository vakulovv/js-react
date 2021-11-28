import { carsLogo } from "../../data/cars/cars_logo";
import cities from "../../data/cities/cities";
import { ChatIcon, LinkIcon, PhoneIcon } from "@heroicons/react/outline";
import React from "react";
import _ from "lodash";
import { Utils } from "../Utils/Utils";

function Price({ priceFrom, priceTo }) {
    let value = null;

    priceFrom = _.isString(priceFrom) ? Utils.toNumberWithSpaces(priceFrom) : null;
    priceTo = priceTo ? Utils.toNumberWithSpaces(priceTo) : null;

    if (priceFrom && priceTo) {
        value = `от ${priceFrom} ₽ до ${priceTo} ₽`;
    } else if (priceFrom) {
        value = `от ${priceFrom} ₽`;
    } else if (priceTo) {
        value = `до ${priceTo} ₽`;
    }

    return value;
}

export default function MarketItem({ advert, showModal, showNotification }) {
    return (
        <dl  >
            <div className="px-4 py-0 sm:px-0 ">
                <div className="border-gray-200 hover:bg-blue-50 hover:bg-blue-50 cursor-pointer border-b  py-7  min-h-40  sm:px-10 items-center">
                    <a href={`/project/${advert.id}`} target="_blank">
                        <div className="sm:grid sm:grid-cols-2">
                            <dt className="font-medium text-gray-500 flex-col flex ">
                                <div className="flex items-center ">
                                    <img
                                        className="w-10 inline-block "
                                        src={carsLogo.find((logo) => logo.name === advert?.brand?.label)?.logo}
                                    />
                                    <div className="ml-8">
                                        <h3 className="inline-block text-xl">
                                            {advert?.brand?.label} {advert?.model?.label}
                                        </h3>
                                        <p className="mt-1">
                                            <Price
                                                key={advert.id}
                                                priceFrom={advert.priceFrom}
                                                priceTo={advert.priceTo}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </dt>
                            <dd>
                                <div className="md:grid md:grid-cols-2 md:gap-5  items-center">
                                    <div className="text-gray-600 text-sm">
                                        <p className="my-2 flex flex-wrap">
                                            <span className="item-flex m-1 p-1 px-3 items-center justify-center rounded-full text-gray-500">
                                                {" "}
                                                {advert?.engine?.label}
                                            </span>
                                            <span className="item-flex p-1 m-1 px-3 items-center justify-center rounded-full text-gray-500">
                                                {advert?.color?.name}
                                            </span>
                                            <span className="item-flex p-1 m-1 px-3 items-center justify-center rounded-full text-gray-500">
                                                {advert?.transmission?.label}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-600">
                                            {" "}
                                            {new Date(advert.created).toLocaleDateString()}
                                        </p>
                                        <p>{cities.find((city) => city.kladr_id === advert.region)?.address}</p>
                                        <p className="text-gray-600"> {advert.userName}</p>
                                    </div>
                                </div>
                            </dd>
                        </div>
                        <dt className="font-medium mt-7 mb-0 text-gray-500 flex-col flex ">
                            <div className="flex">
                                <button
                                    onClick={(e) => {
                                        showModal(e, advert.userName, advert.userId);
                                    }}
                                    className="flex w-auto w-auto p-3 text-sm m-2 px-4 items-center justify-center rounded-full bg-white border border-blue-100 text-gray-700 ">
                                    <span className="flex items-center ">
                                        <PhoneIcon className="w-5 h-5 mr-2" />
                                    </span>
                                    Показать телефон
                                </button>
                                <button
                                    onClick={showNotification}
                                    className="flex w-auto p-3 text-sm m-2 px-4 items-center justify-center rounded-full  bg-white border border-blue-100 text-gray-700 ">
                                    <span className="flex items-center ">
                                        <ChatIcon className="w-5 h-5 mr-2" />
                                    </span>
                                    Написать в чат
                                </button>
                                <button
                                    onClick={showNotification}
                                    className="flex w-auto p-3 text-sm m-2 px-4 items-center justify-center rounded-full  bg-white border border-blue-100 text-gray-700 ">
                                    <span className="flex items-center ">
                                        <LinkIcon className="w-5 h-5 mr-2" />
                                    </span>
                                    Предложить авто
                                </button>
                            </div>
                        </dt>
                    </a>
                </div>
            </div>
        </dl>
    );
}
