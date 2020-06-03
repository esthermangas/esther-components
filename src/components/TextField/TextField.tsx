import React, {useState} from "react";
import PropTypes from 'prop-types';
// @ts-ignore
import styles from "./TextField.module.css";
import {ColorType} from "../../typings";
import BaseInput from "../BaseInput/BaseInput";

type TextFieldProps = {
    label: string,
    fullWidth?: boolean,
    color?: ColorType,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>)=>{},
}

const TextField = (props: TextFieldProps) => {
    const {label, value, onChange} = props;
    const[focus, setFocus] = useState(false);
    const [internalValue, setInternalValue] = useState(value);

    if (internalValue && !focus) {
        setFocus(true);
    }

    const handleChangeInternal = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        onChange(e);
    };

    const onFocusInput = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.placeholder= '';
        setFocus(true);
    };
    const outFocusInput = (e: React.FocusEvent<HTMLInputElement>) => {
        if(!internalValue){
            e.target.placeholder = label;
            setFocus(false);
        }
    };

    return(
        <BaseInput {...props} focus={focus}>
            <input className={styles.input}  onFocus={onFocusInput} onBlur={outFocusInput} placeholder={label} value={internalValue} onChange={handleChangeInternal}/>
        </BaseInput>
    );
};

TextField.defaultProps = {
    fullWidth: false,
    color: 'estherGreen',
};


TextField.propTypes = {
    label: PropTypes.string.isRequired,
    fullWidth: PropTypes.bool,
    color: PropTypes.string,
    onChange: PropTypes.func,
};

export default TextField;