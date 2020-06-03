import React from "react";
import classNames from "classnames";
// @ts-ignore
import styles from './RadioButton.module.css';
import {ColorType} from "../../typings";
import {toRgba, toVariable} from "../../utils/color";
import PropTypes from 'prop-types';
import {useHover} from "../../utils/hooks";

type RadioButtonProps = {
    children?: string,
    color?: ColorType,
    fullWidth?: boolean,
    size?: "small" | "medium",
    checked?: boolean,
    onClick?: (value: string)=>{};
    value?: string,
}

const RadioButton = (props: RadioButtonProps) => {
    const {children, color, fullWidth, size, checked, onClick, value } = props;
    const [ref, hover] = useHover();

    const handleChange = () => {
        if(onClick){
            onClick(value)
        }
    };

    const spanClasses = classNames(styles.span, {
        [styles.spanSmall]: size === "small",
    });
    const rootClasses = classNames(styles.root, {
        [styles.fullWidth]: fullWidth,
        [styles.rootSmall]: size === "small",
    });
    const spanStyle = {
        backgroundColor: toRgba(color, 0.05),
        border: `1px solid ${toVariable(color)}`,
        borderRadius: '50%',
    };
    const rootStyle = {};

    if(checked){
        spanStyle['backgroundColor'] = toRgba(color, 0.50);
        rootStyle['backgroundColor'] = toRgba(color, 0.05);
        if(hover) {
            rootStyle['backgroundColor'] = toRgba(color, 0.10);
        }
    }

    if(hover && !checked){
        rootStyle['backgroundColor'] = toRgba(color, 0.05);
    }

    return(
        <div className={rootClasses} ref={ref} style={rootStyle} onClick={handleChange}>
            <span className={spanClasses} style={spanStyle} />
            {children}
        </div>
    );
};

RadioButton.defaultProps = {
    color: 'peach',
    size: "medium",
    checked: false,
};

RadioButton.propTypes = {
    children: PropTypes.string,
    color: PropTypes.string,
    fullWidth: PropTypes.bool,
    size: PropTypes.string,
    checked: PropTypes.bool,
    onClick: PropTypes.func,
};

export default RadioButton;