import _ from "lodash";
export const Utils = {
    /**
     * Преобразование чисел больше трехзначных к формату с пробелом
     */
    toNumberWithSpaces: function (number) {
        return !_.isNull(number) ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : number;
    },

    toRemoveSpaces: function (number) {
        return !_.isNull(number) && _.isString(number) ? number.replace(/\s/g, "") : number;
    },

    /**
     * Функция возвращает числа из строки
     * @param value - значение
     */
    toDecimal: function (value) {
        if (!value || !this.hasNumbers(value)) return "";
        return parseInt(this.toRemoveSpaces(value).match(/\d+/));
    },

    /**
     * Функция преобразует чила к строке
     * @param value - значение
     */
    toString: function (value) {
        if (!value && !_.isNumber(value)) return value;
        return `${value}`;
    },

    hasNumbers: function (value) {
        var regex = /\d/g;
        return regex.test(value);
    },

    getYearList: function (type = null) {
        const years = [];
        const minYear = 1890;

        for (let i = new Date().getFullYear(); i >= minYear; i--) {
            let disabled = false;
            if (type === "yearFrom") {
                //disabled = selectedToYear && selectedToYear.value ? i >= selectedToYear.value : false;
            } else if (type === "yearTo") {
                //disabled = selectedFromYear && selectedFromYear.value ? i <= selectedFromYear.value : false;
            }
            const option = {
                disabled: disabled,
                label: i,
                value: i,
            };
            years.push(option);
        }
        return years;
    },


    getValueField: function (e) {
        var value = null;
        if (e?.target?.type === "checkbox") {
            value = e?.target?.checked;
        } else if (e?.target?.type === "text" || e?.target?.type === "textarea") {
            value = e?.target?.value;
        } else if (_.isArray(e)) {
            value = [...e];
        } else if (_.isObject(e)) {
            value = e.value;
        } else {
            value = null;
        }
        return value;
    }
};
