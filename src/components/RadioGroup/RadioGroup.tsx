import React, {useState} from "react";
// @ts-ignore
import styles from './RadioGroup.module.css';
import classNames from "classnames";
import {ColorType} from "../../typings";
import PropTypes from 'prop-types';

type RadioGroupProps = {
    children?: any,
    size?: "small" | "medium",
    fullWidth?: boolean,
    color?: ColorType,
    label?: string,
    value?: string,
    onChange?: (value: string) => {},
}

const RadioGroup = (props: RadioGroupProps) =>{
    const {children, size, fullWidth, color, label, value, onChange} = props;
    const [internalValue, setInternalValue] = useState(value);

    const rootClasses = classNames(styles.root, {
        [styles.rootSmall]: size === "small",
        [styles.fullWidth]: fullWidth,
    });

    const handleChange = (value: string) => {
        setInternalValue(value);
        if(onChange){
            onChange(value)
        }
    };

    return(
        <div className={rootClasses} >
            <div className={styles.label}>{label}</div>
            {React.Children.map(children, child => {
                return React.cloneElement(child, {
                    ...child.props, color, fullWidth, size, onClick: handleChange, checked: internalValue === child.props.value,
                })
            })}
        </div>
    );
};

RadioGroup.defaultProps = {
    size: "medium",
    color: "estherGreen",
};

RadioGroup.propTypes = {
    children: PropTypes.any,
    size: PropTypes.string,
    fullWidth: PropTypes.bool,
    color: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
};



export default RadioGroup;