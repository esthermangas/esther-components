import React from "react";
// @ts-ignore
import styles from './BaseInput.module.css';
import PropTypes from 'prop-types';
import {ColorType} from "../../typings";
import classNames from "classnames";
import {toVariable} from "../../utils/color";

type BaseInputProps = {
    label: string,
    children?: any,
    fullWidth?: boolean,
    color?: ColorType,
    focus: boolean,
    error?: boolean,
    infoMessage?: string,

};

const BaseInput = (props: BaseInputProps) => {
    const { label, fullWidth, color, children, focus, error, infoMessage} = props;


    const classesRoot= classNames({
        [styles.fullWidth]: fullWidth,
    }, styles.root);


    const classesLabel = classNames(styles.label, {
        [styles.labelNotFocus] : !focus && !error,
    });

    const labelStyle = {
        color: toVariable(color),
    };
    
    const infoMessageStyle = {
        color: toVariable(color),
    };
    if(error) {
        labelStyle['color'] = `red`;
        infoMessageStyle['color'] = `red`;
    }
    
    return(

        <div className={classesRoot}>
            <label className={classesLabel} style={labelStyle} >{label}</label>
            {children}
            <span className={styles.infoMessage} style={infoMessageStyle}>{infoMessage}</span>
        </div>
    );
};

BaseInput.defaultProps = {
    color: 'estherGreen',
    fullWidth: false,
    focus: false,

};

BaseInput.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.any,
    color: PropTypes.string,
    fullWidth: PropTypes.bool,
    focus: PropTypes.bool,
};

export default BaseInput;