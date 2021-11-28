import {components} from "react-select";
import React from "react";

export const style = {
    container: (provided, state) => ({
        ...provided,
        cursor: "pointer",

    }),
    control: (provided, state) => {

    return {
        ...provided,
        cursor: "pointer",
    }},
    input: (provided, state) => {

        return {
            ...provided,
        }
    }
};

export const Menu = (props) => {
    return (
        <components.Menu {...props} className="animate-select-open">
            {props.children}
        </components.Menu>
    );
};

export const Option = ({ children, ...props }) => {
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = Object.assign(props, { innerProps: rest });
    return (
        <div className="hover:bg-gray-50 cursor-pointer">
            <components.Option {...newProps}>{children}</components.Option>
        </div>
    );
};