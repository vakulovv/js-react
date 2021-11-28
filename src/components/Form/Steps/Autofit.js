import React, {useEffect, useState} from "react";

const Autofit = ({ handleChange, findCar, checkDocument, outDiagnostic, step }) => {
    if (step !== 4) return null;
    return (
        <div>
            <h2  className="font-semibold my-4">Требуется помощь по подбору:</h2>
            <div className=" mb-4 grid gap-4 grid-cols-1">
                <div className="flex items-center">
                    <input
                        id="findCar"
                        name="findCar"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        onChange={handleChange}
                        defaultChecked={findCar}
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
                        defaultChecked={checkDocument}
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
                        defaultChecked={outDiagnostic}
                    />
                    <label htmlFor="outDiagnostic" className="ml-2 block text-sm text-gray-900">
                        Выездная диагностика
                    </label>
                </div>

            </div>
        </div>
    );
};

export default Autofit;
