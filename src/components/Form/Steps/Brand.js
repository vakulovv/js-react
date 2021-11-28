import React from "react";
import MenuList from "../../Table/MenuList";
import Select, {components} from "react-select";
import AsyncSelect from 'react-select/async';
import {style, Menu, Option} from "../../Ui/Style";

const Brand = ({ handleChange, errors, cars, models, step, test, loadCars, selected }) => {
    if(step!==0) return null;
    return (
        <div>
            <h2 onClick={test} className="font-semibold my-4">Укажите марку и модель авто:</h2>
            <AsyncSelect
                closeMenuOnSelect={true}
                className="w-full  cursor-pointer "
                placeholder="Марка"
                defaultOptions
                name="brand"
                components={{ Menu, MenuList, Option }}
                isClearable={true}
                styles={style}
                onChange={handleChange}
                loadOptions={loadCars}
                value={ selected.brand }
                isValid={!errors.brand}
            />
            { errors.brand ? <p className="text-red-700 text-sm mt-1">{ errors.brand }</p> : null }
            <Select
                closeMenuOnSelect={true}
                className="w-full mt-4 cursor-pointer "
                placeholder="Модель"
                options={ models }
                name="model"
                components={{ Menu, MenuList, Option }}
                onChange={handleChange}
                isClearable={true}
                styles={style}
                value={ selected.model }
                isValid={!errors.model}
            />
            { errors.model ? <p className="text-red-700 text-sm mt-1">{ errors.model }</p> : null }
        </div>
    )
};

export default Brand;