import React, { Component, useContext, useState } from "react";
import { connect } from "react-redux";
import "../Navbar/region.css";
import { APIContext } from "../Context";
import Brand from "./Steps/Brand";
import Year from "./Steps/Year";
import Price from "./Steps/Price";
import Options from "./Steps/Options";
import Pagination from "./Pagination";
import Autofit from "./Steps/Autofit";
import Complete from "./Steps/Complete";
import Sidebar from "./Sidebar";
import {createProject, editProject, getProjects, newApplication} from "../../store/actions/projectActions";
import {toggleNotification} from "../../store/actions/notificationAction";
import _ from "lodash";
import Notification from "../Ui/Notification";
import {Utils} from "../Utils/Utils";
import * as qs from 'qs'

class Order extends Component {
    static contextType = APIContext;

    constructor(props) {
        super(props);

        const params = props.history.location.search;
        const searchParams = qs.parse(params, { ignoreQueryPrefix: true });

        this.id = searchParams?.id || null;

        const storage = JSON.parse(localStorage.getItem(`orderForm:${this.id ? this.id : `new`}`));

        this.state = Object.assign(
            {
                ...storage,
                fields: {
                    brand: null,
                    model: null,
                    priceFrom: null,
                    priceTo: null,
                    registrationCards: null,
                    yearFrom: null,
                    yearTo: null,
                    fromMileage: null,
                    toMileage: null,
                    transmission: null,
                    engine: null,
                    body: null,
                    color: null,
                    outDiagnostic: null,
                    checkDocument: null,
                    findCar: null,
                    about: null,
                },
                modal: {isOpenModal: false, titleModal: null, textModal: null},
                cars: null,
                models: null,
                step: 0,
                totalSteps: 5,
                errors: {},
                stageRequiredFields: {
                    0: {
                        brand: ["required"],
                        model: ["required"],
                    },
                    2: {
                        priceFrom: ["required", "rangePrice"],
                        priceTo: ["required", "rangePrice"],
                    },
                    3: {
                        toMileage: ["rangeMileage"],
                        fromMileage: ["rangeMileage"],
                    }
                },
                // Custom function for convert fields
                convertRulesFields: {
                    //
                    //toString: ["priceTo", "priceFrom", "fromMileage", "toMileage"],
                    toRemoveSpaces: ["priceTo", "priceFrom", "fromMileage", "toMileage"],
                    toDecimal: ["priceTo", "priceFrom", "fromMileage", "toMileage"],
                    toNumberWithSpaces: ["priceTo", "priceFrom", "fromMileage", "toMileage"]
                },
            },
            storage
        );
    }

    _modelsUpdate(value) {
        const api = this.context;
        if (value) {
            api.cars.fetchModelsByCar(value.value).then((data) => {
                this.setState({ models: data });
            });
        } else {
            this.setState({ models: null });
        }
    }

    test() {
        console.log("m context", this);
    }

    _getProgress() {
        const fields = this.state.fields;
        const totalItems = Object.keys(fields).length;
        let fillItems = 0;
        let completed = 0;
        for (let field in fields) {
            if (fields.hasOwnProperty(field)) {
                fillItems = fields[field] ? fillItems + 1 : fillItems;
            }
        }
        completed = Math.round((fillItems / totalItems) * 100);
        return completed;
    }

    handleValidation(value) {
        console.log("handleValidation", value)
        return value
    }

    handleChange = (e, name) => {
        console.log(e);
        console.log(name);

        const fields = this.state.fields;
        const target = name?.name || e?.target?.name;
        const value = Utils.getValueField(e);

        if (target !== null && value !== undefined) {
            // Convert to necessary value
            const valueToState = this.convertValue(target, value);

            // Run action for dependent fields
            this.actionDependentFields(target, valueToState);

            // Update state
            fields[target] = valueToState;
            this.setState({ fields });
        }
    };

    /**
     * Функция выполняет действия для зависимых полей
     * @param target - название поля, на котором произошло событие Changed
     * @param value - новое значене поля
     */
    actionDependentFields(target, value) {
        if (!value || !target) return false;

        switch (target) {
            case "brand":
                this._modelsUpdate(value);
                break;
            default:
                //
        }
    }

    /**
     * Функция конверитрует новое значение для стейта согласно правилам формы
     * @param target - название поля, на котором произошло событие Changed
     * @param value - новое значене поля
     */
    convertValue(target, value) {
        if (!value || !target) return "";

        const { convertRulesFields } = this.state;
        if (!_.isEmpty(convertRulesFields)) {
            const functionsConvert = Object.keys(convertRulesFields);
            if (!_.isEmpty(functionsConvert)) {
                for (let convertFunction of functionsConvert) {
                    const fields = convertRulesFields[convertFunction];
                    if (_.isArray(fields) && _.includes(fields, target)) {
                        value = Utils[convertFunction](value);
                    }
                }
            }
        }
        return value;
    }

    rangePrice(field, value ) {
        const {priceFrom, priceTo} = this.state.fields;
        const mappingPrice = {
            "priceFrom": priceTo ? +Utils.toRemoveSpaces(value) <= +Utils.toRemoveSpaces(priceTo) : true,
            "priceTo": priceFrom ? +Utils.toRemoveSpaces(value) >= +Utils.toRemoveSpaces(priceFrom) : true
        }

        return mappingPrice[field];
    }

    rangeMileage(field, value ) {
        const {fromMileage, toMileage} = this.state.fields;
        const mappingMileage = {
            "fromMileage": toMileage ? +Utils.toRemoveSpaces(value) <= +Utils.toRemoveSpaces(toMileage) : true,
            "toMileage": fromMileage ? +Utils.toRemoveSpaces(value) >= +Utils.toRemoveSpaces(fromMileage) : true
        }

        return mappingMileage[field];
    }


    validateStep() {
        let { step, stageRequiredFields, fields, errors } = this.state;
        const inputList = stageRequiredFields[step];
        const newErrors = {};
        let valid = true;

        if (!_.isEmpty(inputList)) {
            const inputs = Object.keys(inputList);
            if (_.isArray(inputs) && !_.isEmpty(inputs)) {
                for (let input of inputs) {
                    let value = fields[input];
                    let rules = inputList[input];
                    // TODO: rules implement to class
                    for (let rule of rules) {
                        if (rule === "required") {
                            if (!value) {
                                newErrors[input] = "Заполните поле";
                                //this.props.toggleNotification({title: "Проверьте поля", body: "Обязательные для заполнения"}, true);
                                valid = false;
                            }
                        } else if (rule === "rangePrice") {
                            console.log("field", input);
                            if (!this['rangePrice'](input, value)) {
                                newErrors[input] = "Проверьте правильность заполнения поля";
                                valid = false;
                            }
                        } else if (rule === "rangeMileage") {
                            if (!this['rangeMileage'](input, value)) {
                                newErrors[input] = "Проверьте правильность заполнения поля";
                                valid = false;
                            }
                        }
                    }
                }

                if (!_.isEqual(errors, newErrors)){
                    // Update state
                    errors = newErrors;
                    this.setState({ errors });

                    if (!_.isEmpty(newErrors)) {
                        this.props.toggleNotification({title: "Ошибка полей", body: "Проверьте правильность введенных данных", type: "danger"}, true, );
                    }
                }
            }
        }
        return valid;
    }


    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    };

    nextStep = () => {
        const { step } = this.state;
        if (this.validateStep()) {
            this.setState({ step: step + 1 });
        }
    };

    closeModal = () => {
        //this.setState({ modal });
        this.props.toggleNotification({}, false);
    }


     handleSubmit = async (e) => {
        e.preventDefault();
        const userId = this?.props?.auth?.uid;
        if (this.id) {
            await this.props.editProject(this.id, this.state.fields, userId);
        } else {
            await this.props.createProject(this.state.fields, userId);
        }
        this.props.toggleNotification({title: "Уведомление", body: "Ваши данные успешно сохранены"}, true);
        //this.openModal();
    }

    componentDidMount() {
        if (this.id) {
            this.props.getProjects({id: this.id}).then(()=>{
                const project = this.props?.projects[0];
                if (project) {
                    this.setState({ fields: project });
                }
            });
        }
    }

    componentDidUpdate() {
        localStorage.setItem(`orderForm:${this.id ? this.id : `new`}`, JSON.stringify(this.state));
        this.validateStep();
    }

    // Load brand cars
    loadCars = () => {
        const api = this.context;
        return api.cars.fetchCars(true).then((data) => data);
    };

    render() {
        const { step, totalSteps } = this.state;
        const fields = this.state.fields;
        const {notification} = this.props;

        //const completed = (step / n) * 100;
        const completed = this._getProgress();

        return (
            <div className="bg-gray-50 relative   flex flex-col items-center  min-h-screen py-2x px-4 sm:px-6 lg:px-8 ">
                <Notification  notification={notification}  closeModal={this.closeModal}/>
                <div className="flex mt-20 flex-wrap sm:w-3/4 2xl:w-1/2 mx-auto">
                    <h2 className="mb-8 inline-flex	 self-stretch	 flex-grow w-full text-left text-3xl font-extrabold text-gray-900">
                        Подать объявление
                    </h2>
                </div>
                <div className="flex mt-0 rounded shadow mt-0 p-5 flex-wrap sm:w-3/4 2xl:w-1/2 mx-auto bg-white">
                    <div className="w-3/5 p-5 pr-14 ">
                        <div className="">
                            <p className="text-gray-500">
                                Расскажите тут об автомобиле вашей мечты. И ваше объявление увидят владельцы, которые
                                возможно не против предложить ваш интересный вариант.
                            </p>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <div className="mx-auto  ">
                                    <div className="pt-6   ">
                                        <Brand
                                            handleChange={this.handleChange}
                                            errors={this.state.errors}
                                            cars={this.state.cars}
                                            models={this.state.models}
                                            step={step}
                                            test={this.test}
                                            loadCars={this.loadCars}
                                            selected={this.state.fields}
                                        />
                                        <Year
                                            handleChange={this.handleChange}
                                            selectedFromYear={fields.yearFrom}
                                            selectedToYear={fields.yearTo}
                                            step={step}
                                        />
                                        <Price
                                            handleChange={this.handleChange}
                                            selectedFromPrice={fields.priceFrom}
                                            selectedToPrice={fields.priceTo}
                                            step={step}
                                            errors={this.state.errors}
                                        />
                                        <Options
                                            handleChange={this.handleChange}
                                            errors={this.state.errors}
                                            registrationCards={fields.registrationCards}
                                            fromMileage={fields.fromMileage}
                                            toMileage={fields.toMileage}
                                            selectedBody={fields.body}
                                            selectedEngine={fields.engine}
                                            selectedTransmission={fields.transmission}
                                            color={fields.color}
                                            step={step}
                                        />
                                        <Autofit
                                            handleChange={this.handleChange}
                                            findCar={fields.findCar}
                                            checkDocument={fields.checkDocument}
                                            outDiagnostic={fields.outDiagnostic}
                                            step={step}
                                        />
                                        <Complete handleChange={this.handleChange} step={step} selected={this.state.fields} />
                                    </div>
                                </div>
                                <div className="text-center mt-20 mb-5">
                                    <div className="flex-auto flex space-x-3">
                                        <Pagination
                                            nextStep={this.nextStep}
                                            prevStep={this.prevStep}
                                            step={step}
                                            n={totalSteps}
                                            errors={this.state.errors}
                                            stageRequiredFields={this.state.stageRequiredFields}
                                            handleSubmit={this.handleSubmit}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="text-left w-2/5 bg-gray-50 p-5 rounded mb-10 ">
                        <Sidebar completed={completed} selected={fields} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        projects: state.projects?.data,
        notification: state.notification
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProjects: (projectId) => dispatch(getProjects(projectId)),
        createProject: (project, userId) => dispatch(createProject(project, userId)),
        editProject: (id, project, userId) => dispatch(editProject(id, project, userId)),
        toggleNotification: (content, isOpen) =>  dispatch(toggleNotification(content, isOpen))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);

