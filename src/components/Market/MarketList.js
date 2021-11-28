import { shallowEqual, useDispatch, useSelector, useStore } from "react-redux";
import { carsLogo } from "../../data/cars/cars_logo";
import cities from "../../data/cities/cities";
import { ChatIcon, LinkIcon, PhoneIcon } from "@heroicons/react/outline";
import React from "react";
import _ from "lodash";
import Loader from "../layout/Loader";
import LoaderList from "../layout/LoaderList";
import Notification from "../Ui/Notification";
import { toggleModal } from "../../store/actions/modalAction";

import { toggleNotification } from "../../store/actions/notificationAction";
import MarketItem from "./MarketItem";

/**
 * Преобразование чисел больше трехзначных к формату с пробелом
 */
function toNumberWithSpaces(number) {
    return number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function Price({ priceFrom, priceTo }) {
    let value = null;

    priceFrom = _.isString(priceFrom) ? toNumberWithSpaces(priceFrom) : null;
    priceTo = priceTo ? toNumberWithSpaces(priceTo) : null;

    if (priceFrom && priceTo) {
        value = `от ${priceFrom} ₽ до ${priceTo} ₽`;
    } else if (priceFrom) {
        value = `от ${priceFrom} ₽`;
    } else if (priceTo) {
        value = `до ${priceTo} ₽`;
    }

    return value;
}

export default function MarketList({ projects, loading, showList, showModal, showNotification }) {
    if (loading && !showList) return <LoaderList />;
    return (
        <>
            {!projects?.length ? (
                <div className="flex  justify-center w-full items-center text-center content-center p-8 min-h-32">
                    <p className="text-xl">Ничего найдено :(</p>{" "}
                </div>
            ) : (projects.map((advert) => (
                    <MarketItem key={advert.id} advert={advert} showModal={showModal} showNotification={showNotification} />))
            )}
        </>
    );
}
