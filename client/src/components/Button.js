import React from "react";
import "./Button.css";

const Button = ({
  children,
  type = "button",
  variant = "primary", // primary, secondary, outline, google
  loading = false,
  disabled = false,
  icon,
  onClick,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn-base btn-${variant} ${loading ? "btn-loading" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="loader"></span>
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
