import React from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react/display-name
const BindableInput = React.forwardRef(({children, value, setValue, ...props}, ref) => {
    function onChange(e) {
        setValue(e.target.value);
        props.onChange?.(e);
    }

    return (
        <input {...props} ref={ref} value={value} onChange={onChange}>
            {children}
        </input>
    );
});

BindableInput.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.any
    ]).isRequired,
    setValue: PropTypes.func.isRequired,
    onChange: PropTypes.func
};

export default BindableInput;