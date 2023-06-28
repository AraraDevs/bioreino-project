import React from 'react';
import styles from './Select.module.css';

const Select = ({ label, name, options, value, onChange, error }) => {
  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <select
        className={styles.select}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      >
        <option disabled value="">
          Selecione
        </option>
        {options.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      {error && <p className={styles.error}>{error}</p>}
    </>
  );
};

export default Select;
