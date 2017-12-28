import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const Input = ({ placeholder, submitText }) => (
  <form>
    <input type="text" placeholder={placeholder} />
    <input type="submit" value={submitText} />
  </form>
);

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired
};

export default Input;
