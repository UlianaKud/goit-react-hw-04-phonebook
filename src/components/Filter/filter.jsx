import React from 'react';
import PropTypes from 'prop-types';
import scss from './filter.module.scss';

const Filter = ({ handleChangeFilter, value }) => {
  return (
    <label htmlFor="filter" className={scss.filter}>
      Find contact by name
      <input className={scss.input}
        type="text"
        value={value}
        name="filter"
        onChange={handleChangeFilter}
      />
    </label>
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string,
};
