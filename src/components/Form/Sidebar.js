import { LockClosedIcon, ArrowNarrowRightIcon, CheckIcon } from "@heroicons/react/solid";
import React, { useState, Fragment } from "react";
import { Transition } from "@headlessui/react";
import { useTimeoutFn } from "react-use";
import _ from "lodash";
import {Utils} from "../Utils/Utils";

function Row({ label, value }) {
    return (
        <dl>
            <div className=" px-2 py-2 sm:grid sm:grid-cols-2 sm:gap-1 sm:px-2">
                <dt className="text-sm font-medium text-gray-500  ">{label}:</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
            </div>
        </dl>
    );
}

// TODO: вынести функции в общий файл

function Car({ brand, model }) {
    const text = "Авто";
    brand = brand ? `${brand.value}` : "";
    model = model ? ` ${model.value}` : "";
    const value = brand + model;

    return value && <Row label={text} value={value} />;
}

function Year({ fromYear, toYear }) {
    const text = "Год";
    let value = null;

    if (fromYear && toYear) {
        value = `от ${fromYear.value} до ${toYear.value}`;
    } else if (fromYear) {
        value = `от ${fromYear.value}`;
    } else if (toYear) {
        value = `до ${toYear.value}`;
    }

    return value && <Row label={text} value={value} />;
}

function Mileage({ fromMileage, toMileage }) {
    const text = "Пробег";
    let value = null;

    if (fromMileage && toMileage) {
        value = `от ${fromMileage} км до ${toMileage} км`;
    } else if (fromMileage) {
        value = `от ${fromMileage} км`;
    } else if (toMileage) {
        value = `до ${toMileage} км`;
    }

    return value && <Row label={text} value={value} />;
}

function Price({ priceFrom, priceTo }) {
    const text = "Бюджет";
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

    return value && <Row label={text} value={value} />;
}

function Options({ registrationCards, body, engine, transmission, color }) {
    if (!registrationCards && !body && !engine && !transmission && !color) return null;
    let value = null;
    registrationCards = `${registrationCards ? "Оригинал ПТС" : ""}`;
    body = `${body ? body.label : ""}`;
    engine = `${engine ? engine.label : ""}`;
    transmission = `${transmission ? transmission.label : ""}`;
    color = `${color ? `цвет ${color.name}` : ""}`;

    value = [registrationCards, body, engine, transmission, color].filter((n) => n).join(", ");

    return (
        <dl>
            <div className=" px-2 py-2 sm:grid sm:grid-cols-1 sm:gap-1 sm:px-2">
                <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">{value}</dd>
            </div>
        </dl>
    );
}

function Selection({ findCar, outDiagnostic, checkDocument }) {
    if (!findCar && !outDiagnostic && !checkDocument) return null;
    const text = "Помощь в подборе";
    let value = null;

    findCar = findCar ? `Поиск автомобиля` : null;
    outDiagnostic = outDiagnostic ? `Проверка документов` : null;
    checkDocument = checkDocument ? `Выездная диагностика` : null;

    value = [findCar, outDiagnostic, checkDocument].filter((n) => n).join(", ");

    return (
        <dl>
            <div className="px-2 py-4 sm:grid sm:grid-cols-1 sm:gap-1 sm:px-2 border-t border-gray-200   my-4">
                <dt className="text-sm font-medium text-gray-800  ">{text}:</dt>
                <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">{value}</dd>
            </div>
        </dl>
    );
}

function Comment({ about }) {
    if (!about) return null;
    about = about || "";
    return (
        <dl>
            <div className=" px-2 py-2 sm:grid sm:grid-cols-1 sm:gap-1 sm:px-2 border-t border-gray-200 py-4">
                <dd className="mt-1 text-sm text-gray-500 sm:mt-0 sm:col-span-2">{about}</dd>
            </div>
        </dl>
    );
}

function Percent({ text }) {
    let [isShowing, setIsShowing] = useState(true);
    let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 100);
    return (
        <div key={text}>
            <Transition
                show={isShowing}
                enter="transition-opacity duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
            >
                <div>
                    <p className="mt-2 px-2 text-left text-3xl font-extrabold text-gray-400">{text} %</p>
                </div>
            </Transition>
        </div>
    );
}

const Sidebar = function ({ completed, selected }) {
    return (
        <div className="">
            <Percent key={completed} text={completed} />
            <p className="mb-3 px-2 text-left   text-gray-400">Заполнено</p>
            <div className="border-t border-gray-200 py-4 ">
                <Car brand={selected.brand} model={selected.model} />
                <Year fromYear={selected.yearFrom} toYear={selected.yearTo} />
                <Price priceFrom={selected.priceFrom} priceTo={selected.priceTo} />
                <Mileage fromMileage={selected.fromMileage} toMileage={selected.toMileage} />
                <Options
                    registrationCards={selected.registrationCards}
                    body={selected.body}
                    engine={selected.engine}
                    transmission={selected.transmission}
                    color={selected.color}
                />
                <Selection
                    findCar={selected.findCar}
                    outDiagnostic={selected.outDiagnostic}
                    checkDocument={selected.checkDocument}
                />
                <Comment about={selected.about} />
            </div>
        </div>
    );
};

export default Sidebar;
