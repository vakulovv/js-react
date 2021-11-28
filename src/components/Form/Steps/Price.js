import React, { useState } from "react";
import InputMask from "react-input-mask";

const Price = ({ handleChange, selectedFromPrice, selectedToPrice, step, errors }) => {
    if (step !== 2) return null;
    const char = null;

    return (
        <div>
            <h2 className="font-semibold my-4">Укажите стоимость:</h2>
            <div className="grid gap-4 grid-cols-2">
                <div>
                    <div>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">₽</span>
                            </div>
                            <input
                                type="text"
                                name="price"
                                id="price"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="0.00"
                                placeholder="От"
                                name="priceFrom"
                                autoComplete="off"
                                onChange={handleChange}
                                value={selectedFromPrice}
                            />
                        </div>
                        {errors.priceFrom ? <p className="text-red-700 text-sm mt-1">{errors.priceFrom}</p> : null}
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
                                name="price"
                                id="price"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="0.00"
                                placeholder="До"
                                name="priceTo"
                                autoComplete="off"
                                onChange={handleChange}
                                value={selectedToPrice}
                            />

                        </div>
                        {errors.priceTo ? <p className="text-red-700 text-sm mt-1">{errors.priceTo}</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Price;
