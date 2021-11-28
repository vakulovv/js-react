import {shallowEqual, useDispatch, useSelector, useStore} from "react-redux";
import React, {useCallback, useContext, useEffect, useState} from "react";
import * as qs from 'qs'
import Filters from "../Filters/Filters"
import {getProjects} from "../../store/actions/projectActions";
import {APIContext} from "../Context";
import MarketList from "./MarketList";
import Modal from "../Ui/Modal";
import {toggleModal} from "../../store/actions/modalAction";
import {toggleNotification} from "../../store/actions/notificationAction";
import Notification from "../Ui/Notification";
import {Utils} from "../Utils/Utils";
import _ from "lodash";
import {convertFields} from "../Filters/Rules";

export default function Market(props) {
    const dispatch = useDispatch();
    const api = useContext(APIContext);
    const projects = useSelector((state) => state?.projects.data);
    const {loading, showList, size } = useSelector((state) => state?.projects);
    const {modal, notification} = useSelector((state) => state);

    const paramsUrl = getParamsUrl();

    // Search Filters
    const options = {
        brand: null,
        model: null,
        priceFrom: 0,
        priceTo:  3000000,
        fromMileage: 0,
        toMileage: 1000000,
        yearFrom: null,
        yearTo: null,
        body: null,
        transmission: null,
        engine: null,
        color: null,
    };

    const [search, setSearch] = useState({
        ...options,
        ...paramsUrl
    });
    const [models, setModels] = useState();

    const yearListFrom = Utils.getYearList("yearFrom");
    const yearListTo = Utils.getYearList("yearTo");

    useEffect(() => {
        debouncedChange(search);
    }, [search]);

    useEffect( () => {
        dispatch(getProjects(search));
    }, []);

    /**
     * Обновление данных на странице
     */
    const updateData = async (search) => {
        const paramsUrl = getParamsUrl();
        const newParamsUrl = {
            ...paramsUrl,
            ...search
        }
        updateUrl(newParamsUrl, options, props);
        setModels(await loadModels(search));
        dispatch(getProjects(search));
    }

    /**
     * Вводим задержку debounce
     */
    const debouncedChange = useCallback(
        _.debounce(updateData, 500)
        , []);

    /**
     * Обновляем данные в адресной строке
     */
    function updateUrl(queries,options, props) {
        const {location, history} = props;
        const allowedQueriesParams = filterAllowedParams(queries, options);
        const newQueryString = qs.stringify(allowedQueriesParams);
        history.push(`${location.pathname}${newQueryString ? `?${newQueryString}` : ''}`);
    }

    /**
     *  Фильтруем параметры в адресной строке
     */
    const filterAllowedParams = (queries, options) => {
        return Object.keys(options).reduce((acc, param) => {
            if (Object.prototype.hasOwnProperty.call(queries, param)) {
                if (queries[param] !== undefined && queries[param] !== "" && queries[param] !== null) {
                    if (!_.isEqual(queries[param], options[param])) {
                        acc[param] = queries[param];
                    }
                }
            }
            return acc;
        }, {});
    };

    /**
     * Получение данных из адресной строки
     */
    function getParamsUrl() {
        return qs.parse(props.history.location.search, { ignoreQueryPrefix: true });
    }

    /**
     * Загрузка списка марок автомобилей
     */
     const loadCars = () => {
        return api.cars.fetchCars(true).then((data) => data);
    };

    /**
     * Загрузка моделей марок автомобилей
     */
    const loadModels = (search) => {
        return api.cars.fetchModelsByCar(search?.brand).then((data) => data);
    };

    /**
     * Событие по кнопки "Показать еще"
     */
    function loadMore(e) {
        e.preventDefault();
        const lastVisible = projects && projects[projects.length - 1];
        dispatch(getProjects(search, lastVisible));
    }

    /**
     * Всплытие нотификации
     */
    function showNotification(e) {
        e.preventDefault();
        dispatch(toggleNotification({ title: "Необходимо авторизоваться", body: "под вашей учетной записью" }, true));
    }

    /**
     * Открытие модального окна
     */
    function showModal(e, userName, userId) {
        e.preventDefault();
        const template = <p>user_id: {userId} <br/> Контактное лицо: {userName}</p>  ;
        dispatch(toggleModal(true, {title: '8900090000', body: template}));
    }

    /**
     * Обработка события изменения данных в форме
     */
    const handleChange = (e, name) => {
        const target = name?.name || e?.target?.name || name ;
        const value = Utils.getValueField(e);

        if (target !== null && value !== undefined) {
            // Convert to necessary value
            const valueToState = convertValueField(value, target);
            // Update state
            setSearch({...search, [target]: valueToState });
        }
    }

    /**
     * Преобразование значения по правилам
     */
    function convertValueField(value, target) {
       if (!target) return value;
       if (_.has(convertFields, target)) {
           const convertFunction = convertFields[target];
           if (_.isFunction(Utils[convertFunction]) ) {
               value = Utils[convertFunction](value);
           }
       }
       return value;
    }

    return (
        <main>
            <Modal modal={modal}/>
            <Notification  notification={notification}   />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 my-7">
                <div className="md:grid md:grid-cols-3 md:gap-6 ">
                    <div>
                        <h2 className="mb-4 inline-flex	self-stretch flex-grow w-full text-left text-3xl font-extrabold text-gray-900">
                            Cars Find
                        </h2>
                        <p className="text-gray-500">
                            Найдите тех, кто ищет автомобили.
                        </p>
                    </div>
                </div>
                <div className="md:grid md:grid-cols-4 md:gap-6 my-10">
                    <div className="md:col-span-1 pr-0">
                        <div className="sm:px-0">
                            <Filters
                                models={models}
                                yearListFrom={yearListFrom}
                                yearListTo={yearListTo}
                                loadCars={loadCars}
                                loadModels={loadModels}
                                handleChange={handleChange}
                                search={search}
                            />
                        </div>
                    </div>

                    {/* Replace with your content */}
                    <div className="md:col-span-3  ">
                        <div className="border rounded-lg">
                           <MarketList projects={projects} loading={loading} showList={showList} showModal={showModal} showNotification={showNotification}/>
                        </div>
                        <div className="flex mt-8 gap-4 justify-center">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                {(projects.length < size) ? <a href="#" onClick={loadMore} className="  relative inline-flex items-center px-5 py-0 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    {loading ? <svg className="h-10 w-10 text-gray-500  mr-0" version="1.1" id="L9"    x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0"  >
                                        <path fill="#ccc" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                          <animateTransform
                                              attributeName="transform"
                                              attributeType="XML"
                                              type="rotate"
                                              dur="1s"
                                              from="0 50 50"
                                              to="360 50 50"
                                              repeatCount="indefinite" />
                                      </path>
                                    </svg>: null} <span className="my-3">Загрузить еще...</span>
                                </a> : null }
                            </nav>
                        </div>
                    </div>
                </div>
                {/* /End replace */}
            </div>
        </main>
    );
}
