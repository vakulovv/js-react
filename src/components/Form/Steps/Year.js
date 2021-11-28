import React, {useState} from "react";
import {style, Menu, Option} from "../../Ui/Style";

import MenuList from "../../Table/MenuList";
import Select, { components } from "react-select";
import {Utils} from "../../Utils/Utils";

const Year = ({ handleChange, selectedFromYear, selectedToYear, step }) => {
    if (step !== 1) return null;

    let yearFrom = [],
        yearTo = [];


    yearFrom = Utils.getYearList("yearFrom");
    yearTo = Utils.getYearList("yearTo");

    return (
        <div>
            <h2 className="font-semibold my-4">Укажите год:</h2>
            <div className="  grid gap-4 grid-cols-2">
                <Select
                    onChange={handleChange}
                    closeMenuOnSelect={true}
                    className="  cursor-pointer  "
                    placeholder="От"
                    options={yearFrom}
                    name="yearFrom"
                    components={{ Menu, MenuList, Option }}
                    isClearable={true}
                    styles={style}
                    isOptionDisabled={(option) => option.disabled === true}
                    value={ selectedFromYear }
                />
                <Select
                    onChange={handleChange}
                    closeMenuOnSelect={true}
                    className="  cursor-pointer  "
                    placeholder="До"
                    options={yearTo}
                    name="yearTo"
                    components={{ Menu, MenuList, Option }}
                    isClearable={true}
                    styles={style}
                    isOptionDisabled={(option) => option.disabled === true}
                    value={ selectedToYear }
                />
            </div>
        </div>
    );
};

export default Year;
