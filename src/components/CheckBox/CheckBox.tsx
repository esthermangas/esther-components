import React, {useState} from "react";
import PropTypes from "prop-types";
// @ts-ignore
import styles from './CheckBox.module.css'
import classNames from "classnames";
import {ColorType} from "../../typings";
// @ts-ignore
import {toRgba, toVariable} from "../../utils/color";
import {useHover} from "../../utils/hooks";
import Icon from '../Icon/Icon';

type CheckBoxProps = {
    label?: string,
    color?: ColorType,
    checked?: boolean,
    onClick?: (value: boolean)=>{};
    fullWidth?: boolean,
    variant?: "small" | "medium",
}


const CheckBox = (props: CheckBoxProps) => {
    const {label, checked, onClick, color, fullWidth, variant} = props;
    const [data, setData] = useState(checked);

    const [ref, hover] = useHover();
    const handleChange = () => {
        setData(!data);
        if(onClick) {
            onClick(!data);
        }
    };
    const labelClasses = classNames(styles.label, {
        [styles.labelSmall]: variant === "small",
    });

    const spanClasses = classNames(styles.span, {
        [styles.spanSmall]: variant === "small",
        [styles.spanMedium]: variant !== "small",
    });

    const rootClasses = classNames(styles.root, {
        [styles.fullWidth]: fullWidth,
        [styles.rootSmall]: variant === "small",
    });

    const checkBoxStyle = {
        backgroundColor: toRgba(color, 0.05),
        border: `1px solid ${toVariable(color)}`,
        borderRadius: '20%',
    };
    const rootStyle= {};

    if(hover && !data){
        rootStyle['backgroundColor'] = toRgba(color, 0.05);
    }

    if(data){
        checkBoxStyle.backgroundColor = toRgba(color, 0.50);
        rootStyle['backgroundColor'] = toRgba(color, 0.05);
        if(hover){
            rootStyle['backgroundColor'] = toRgba(color, 0.10);
        }
    }


    return(
        <div onClick={handleChange} className={rootClasses} style={rootStyle} ref={ref}>
            <span style={checkBoxStyle} className={spanClasses}>
                { data &&  <Icon color={color} name="check" /> }
            </span>
            <label className={labelClasses}>{label}</label>
        </div>
    );
};

CheckBox.defaultProps = {
    checked: false,
    color: 'estherGreen',
    fullWidth: false,
    variant: "medium",
};

CheckBox.propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    color: PropTypes.string,
    onClick: PropTypes.func,
    fullWidth: PropTypes.bool,
    variant: PropTypes.string,
};

export default CheckBox;