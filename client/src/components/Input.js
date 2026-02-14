import React, { useId } from "react";
import "./Input.css";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  error,
}) => {
  const id = useId();

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        /* ADD THIS CLASSNAME BELOW */
        className={`custom-input ${error ? "input-error" : ""}`}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Input;
