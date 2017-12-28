import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Input = ({ placeholder, submitText, onSubmit, value, onChange }) => (
  <form class="form" onSubmit={onSubmit}>
    <input
      type="text"
      placeholder={placeholder}
      className="input"
      value={value}
      onChange={onChange}
    />
    <input type="submit" value={submitText} className="button" />
  </form>
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired
};

export default Input;
