import React, { useEffect, useState } from "react";
import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import Select, { components } from "react-select";
import MenuList from "../../Table/MenuList";
import { style, Menu, Option } from "../../Ui/Style";

const colors = [
    { name: "Белый", value: "white", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Серый", value: "gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Черный", value: "black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
    { name: "Красный", value: "red", class: "bg-red-900", selectedClass: "ring-red-900" },
    { name: "Желтый", value: "yellow", class: "bg-yellow-900", selectedClass: "ring-yellow-900" },
    { name: "Синий", value: "blue", class: "bg-blue-900", selectedClass: "ring-blue-900" },
];

const transmission = [
    { label: "АКПП", value: "automatic" },
    { label: "МКПП", value: "manual" },
];

const engine = [
    { label: "Бензин", value: "petrol" },
    { label: "Дизель", value: "diesel" },
    { label: "Электро", value: "volt" },
    { label: "Гибрид", value: "hybrid" },
    { label: "Газ", value: "gas" },
];

const body = [
    { label: "Седан", value: "Limusine" },
    { label: "Универсал", value: "Wagon" },
    { label: "Хетчбэк", value: "Hatchback" },
    { label: "Внедорожник", value: "SUV" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const char = null;

const Options = ({
    handleChange,
    errors,
    registrationCards,
    fromMileage,
    toMileage,
    selectedBody,
    selectedEngine,
    selectedTransmission,
    color,
    step
}) => {
    const [selectedColor, setSelectedColor] = useState(colors.find((i) => i.name === color?.name));
    if (step !== 3) return null;

    return (
        <div>
            <h2 className="font-semibold my-4">Дополнительные параметры:</h2>
            <div className=" mb-4 grid gap-4 grid-cols-1">
                <div className="flex items-center">
                    <input
                        id="registrationCards"
                        defaultChecked={registrationCards}
                        name="registrationCards"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        onChange={handleChange}
                    />
                    <label htmlFor="registrationCards" className="ml-2 block text-sm text-gray-900">
                        Оригинал ПТС
                    </label>
                </div>
                <div>
                    <h4 className="text-sm text-gray-900 font-medium">Пробег:</h4>
                    <div className=" mt-2 grid gap-4 grid-cols-2">
                        <div>
                            <div>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 sm:text-sm">км</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="fromMileage"
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 pr-12 sm:text-sm border-gray-300 rounded-md"
                                        placeholder="0.00"
                                        placeholder="От"
                                        name="fromMileage"
                                        autoComplete="off"
                                        onChange={handleChange}
                                        value={fromMileage}
                                    />
                                </div>
                                {errors.fromMileage ? <p className="text-red-700 text-sm mt-1">{errors.fromMileage}</p> : null}
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
                                        name="fromMileage"
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 pr-12 sm:text-sm border-gray-300 rounded-md"
                                        placeholder="0.00"
                                        placeholder="До"
                                        name="toMileage"
                                        autoComplete="off"
                                        onChange={handleChange}
                                        value={toMileage}
                                    />

                                </div>
                                {errors.toMileage ? <p className="text-red-700 text-sm mt-1">{errors.toMileage}</p> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="text-sm text-gray-900 font-medium">Кузов:</h4>
                    <Select
                        closeMenuOnSelect={true}
                        className="w-full mt-2 cursor-pointer "
                        placeholder="Кузов"
                        options={body}
                        name="body"
                        components={{ Menu, MenuList, Option }}
                        onChange={handleChange}
                        isClearable={true}
                        styles={style}
                        value={selectedBody}
                    />
                </div>
                <div>
                    <h4 className="text-sm text-gray-900 font-medium">Двигатель:</h4>
                    <Select
                        closeMenuOnSelect={true}
                        className="w-full mt-2 cursor-pointer "
                        placeholder="Двигатель"
                        options={engine}
                        name="engine"
                        components={{ Menu, MenuList, Option }}
                        onChange={handleChange}
                        isClearable={true}
                        styles={style}
                        value={selectedEngine}
                    />
                </div>
                <div>
                    <h4 className="text-sm text-gray-900 font-medium">Трансмиссия:</h4>
                    <Select
                        closeMenuOnSelect={true}
                        className="w-full mt-2 cursor-pointer "
                        placeholder="Коробка"
                        options={transmission}
                        name="transmission"
                        components={{ Menu, MenuList, Option }}
                        onChange={handleChange}
                        isClearable={true}
                        styles={style}
                        value={selectedTransmission}
                    />
                </div>
                {/* Colors */}
                <div>
                    <h4 className="text-sm text-gray-900 font-medium">Цвет:</h4>
                    <RadioGroup
                        value={selectedColor}
                        name="color"
                        onChange={(e,name) => {
                            setSelectedColor(e);
                            handleChange(e, {name: "color"});
                        }}
                        className="mt-2"
                    >
                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                        <div className="flex items-center space-x-3">
                            {colors.map((color) => (
                                <RadioGroup.Option
                                    key={color.name}
                                    value={color}
                                    className={({ active, checked }) =>
                                        classNames(
                                            color.selectedClass,
                                            active && checked ? "ring ring-offset-1" : "",
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
                                            "h-8 w-8 border border-black border-opacity-10 rounded-full"
                                        )}
                                    />
                                </RadioGroup.Option>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
    );
};

export default Options;
