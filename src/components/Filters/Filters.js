import {Menu, Option, style} from "../Ui/Style";
import MenuList from "../Table/MenuList";
import React, {useCallback, useContext, useEffect, useState} from "react";
import Select from "react-select";
import ReactSlider from "react-slider";
import AsyncSelect from "react-select/async";
import {Utils} from "../Utils/Utils";
import {bodies, engines, transmissions, colors} from "./Constants";
import {RadioGroup} from "@headlessui/react";
import _ from "lodash"

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Filters({
    models,
    yearListFrom,
    yearListTo,
    loadCars,
    handleChange,
    search
}) {
    const selectedColor = colors.find((i) => i.value === search?.color);

    return (
        <div className="">
            <div className="relative bg-gray-50 p-6 rounded-sm">
                <div className="relative justify-center ">
                    <div className="relative z-30 mt-2">
                        <h3 className="font-medium text-sm">Выберите марку:</h3>
                        <AsyncSelect
                            closeMenuOnSelect={true}
                            className="cursor-pointer "
                            placeholder="Марка"
                            defaultOptions
                            name="brand"
                            components={{ Menu, MenuList, Option }}
                            isClearable={true}
                            styles={style}
                            onChange={handleChange}
                            loadOptions={loadCars}
                        />
                    </div>
                    <div className="relative z-20 mt-5">
                        <h3 className="font-medium text-sm">Выберите модель:</h3>
                        <Select
                            closeMenuOnSelect={true}
                            className="cursor-pointer "
                            placeholder="Модель"
                            defaultOptions
                            name="model"
                            components={{ Menu, MenuList, Option }}
                            isClearable={true}
                            styles={style}
                            onChange={handleChange}
                            options={models}
                        />
                    </div>

                    <div className="relative mt-5 z-10">
                        <h3 className="font-medium text-sm">Год выпуска:</h3>
                        <div className="grid gap-4 grid-cols-2 ">
                            <Select
                                closeMenuOnSelect={true}
                                className="cursor-pointer  "
                                placeholder="От"
                                options={yearListFrom}
                                name="yearFrom"
                                components={{ Menu, MenuList, Option }}
                                isClearable={true}
                                styles={style}
                                isOptionDisabled={(option) => option.disabled === true}
                                onChange={handleChange}
                            />
                            <Select
                                closeMenuOnSelect={true}
                                className="cursor-pointer  "
                                placeholder="До"
                                options={yearListTo}
                                name="yearTo"
                                components={{ Menu, MenuList, Option }}
                                isClearable={true}
                                styles={style}
                                isOptionDisabled={(option) => option.disabled === true}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="mt-5">
                        <h3 className="font-medium text-sm">Бюджет:</h3>
                        <div className="grid gap-4 grid-cols-2">
                            <div>
                                <div>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">₽</span>
                                        </div>
                                        <input
                                            type="text"
                                            id="price"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-2 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="От"
                                            name="priceFrom"
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={Utils.toNumberWithSpaces(search?.priceFrom)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">₽</span>
                                        </div>
                                        <input
                                            type="text"
                                            id="price"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-2 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="До"
                                            name="priceTo"
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={Utils.toNumberWithSpaces(search?.priceTo)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative mt-5">
                        <h3 className="font-medium text-sm">Пробег:</h3>
                        <div className=" mt-2 grid gap-4 grid-cols-2">
                            <div>
                                <div>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">км</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-8 pr-2 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="От"
                                            name="fromMileage"
                                            autoComplete="off"
                                            value={Utils.toNumberWithSpaces(search?.fromMileage)}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">км</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-8 pr-2 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="До"
                                            name="toMileage"
                                            autoComplete="off"
                                            onChange={handleChange}
                                            value={Utils.toNumberWithSpaces(search?.toMileage)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative mt-8">
                        <Select
                            closeMenuOnSelect={true}
                            className="cursor-pointer"
                            placeholder="Двигатель"
                            defaultOptions
                            name="engine"
                            components={{ Menu, MenuList, Option }}
                            isClearable={true}
                            styles={style}
                            options={engines}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative mt-5">
                        <Select
                            closeMenuOnSelect={true}
                            className="cursor-pointer "
                            placeholder="Коробка"
                            options={transmissions}
                            name="transmission"
                            components={{ Menu, MenuList, Option }}
                            isClearable={true}
                            styles={style}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative mt-5">
                        <Select
                            closeMenuOnSelect={true}
                            className="cursor-pointer"
                            placeholder="Кузов"
                            defaultOptions
                            name="body"
                            components={{ Menu, MenuList, Option }}
                            isClearable={true}
                            styles={style}
                            options={bodies}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="relative my-7">
                        <RadioGroup
                            value={selectedColor}
                            name="color"
                            onChange={(e, name) => {
                                handleChange(e, "color");
                            }}
                            className="mt-2"
                        >
                            <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                            <div className="flex flex-wrap items-center gap-4">
                                {colors.map((color) => (
                                    <RadioGroup.Option
                                        key={color.name}
                                        value={color}
                                        className={({ active, checked }) =>
                                            classNames(
                                                color.selectedClass,
                                                active && checked ? "ring-2" : "",
                                                !active && checked ? "ring-2" : "",
                                                "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                                            )
                                        }
                                    >
                                        <RadioGroup.Label as="p" className="sr-only">
                                            {color.name}
                                        </RadioGroup.Label>
                                        <span
                                            aria-hidden="true"
                                            className={classNames(
                                                color.class,
                                                "h-6 w-6 border border-black border-opacity-10 rounded-full"
                                            )}
                                        />
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 p-6 mt-5 rounded-sm ">
                <h3 className="mb-3 mb-5 font-medium leading-6 text-sm ">Требуется помощь в подборе</h3>
                <div className="mb-4 grid gap-2 grid-cols-1">
                    <div className="items-center flex">
                        <input
                            id="findCar"
                            name="findCar"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            onChange={handleChange}
                        />
                        <label htmlFor="findCar" className="ml-2 block text-sm text-gray-900">
                            Поиск автомобиля
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="checkDocument"
                            name="checkDocument"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            onChange={handleChange}
                        />
                        <label htmlFor="checkDocument" className="ml-2 block text-sm text-gray-900">
                            Проверка документов
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="outDiagnostic"
                            name="outDiagnostic"
                            type="checkbox"
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            onChange={handleChange}
                        />
                        <label htmlFor="outDiagnostic" className="ml-2 block text-sm text-gray-900">
                            Выездная диагностика
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}