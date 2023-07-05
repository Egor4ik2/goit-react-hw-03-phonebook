import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ filter, setFilter }) => {
  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className={styles.filter}>
      <label htmlFor="filter" className={styles.label}>
        Filter contacts:
      </label>
      <input
        type="text"
        id="filter"
        value={filter}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default Filter;
