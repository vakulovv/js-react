import React, {useEffect, useState} from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Complete = ({ handleChange, step, selected }) => {
    if (step !== 5) return null;

    return (
        <div>

            <div className=" mb-4 grid gap-4 grid-cols-1">
                <div className="">
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                        Хотите что-то рассказать дополнительно?
                    </label>
                    <div className="mt-2">
                      <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder=""
                          defaultValue={''}
                          value={selected.about}
                          onChange={handleChange}

                      />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Complete;
