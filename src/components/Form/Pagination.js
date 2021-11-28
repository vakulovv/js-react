import { CheckIcon } from "@heroicons/react/solid";
import React from "react";
import _ from "lodash";

const checkDisabled = function (values, errors) {
    if (values && errors) {
        for (let item of values) {
            if (_.has(errors, item)) {
                return false;
            }
        }
    }

    return true;
};

const Pagination = function ({ nextStep, prevStep, step, n, Completed, errors, stageRequiredFields, handleSubmit }) {
    const rules = stageRequiredFields[step];
    const values = _.keys(rules);
    const isDisable = !checkDisabled(values, errors);

    return (
        <>
            {step > 0 ? (
                <button
                    onClick={prevStep}
                    className="w-full flex items-center justify-center rounded-md border border-gray-300 py-3 px-4"
                    type="button">
                    Назад
                </button>
            ) : null}
            {step < n ? (
                <button
                    onClick={nextStep}
                    className={` relative   w-full  items-center flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        isDisable ? "opacity-70" : ""
                    }`}
                    type="button"
                >
                    Далее
                </button>
            ) : null}
            {step === n ? (
                <button
                    onSubmit={handleSubmit}
                    type="submit"
                    className="group relative w-full items-center  flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="flex items-center ">
                        <CheckIcon className="h-5 w-5 text-white mr-1 " aria-hidden="true" />
                    </span>
                    Сохранить
                </button>
            ) : null}
        </>
    );
};

export default Pagination;
