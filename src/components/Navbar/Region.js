import React, { Component } from 'react'
import SelectSearch, {fuzzySearch} from 'react-select-search';
import './region.css'
import cities from '../../data/cities/cities.js'

/**
 * The options array should contain objects.
 * Required keys are "name" and "value" but you can have and use any number of key/value pairs.
 */
const options = cities
    .sort((a,b) => a.city.localeCompare(b.city))
    .map((item) => {
    const option = {}
    option.name = item.city || item.region;
    option.value = item.kladr_id;
    return option;
});

const ChangeRegion = () => (
    /* Simple example */
    <SelectSearch className="select-search "
                  id="city"
                  options={options}
                  search
                  autoComplete="true"
                  filterOptions={fuzzySearch}
                  placeholder="Ваш город"  />
)

export default ChangeRegion

