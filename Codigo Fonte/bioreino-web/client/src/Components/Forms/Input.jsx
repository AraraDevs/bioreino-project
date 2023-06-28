import React from 'react';
import styles from './Input.module.css';

const Input = ({
  label,
  type,
  name,
  error,
  value,
  onChange,
  onBlur,
  placeholder,
  max,
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={max}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
