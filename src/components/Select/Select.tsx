import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types';
// @ts-ignore
import styles from './Select.module.css';
import {ColorType} from "../../typings";
import BaseInput from "../BaseInput/BaseInput";
import classNames from "classnames";

type SelectProps = {
    label: string,
    fullWidth?: boolean,
    color?: ColorType,
    value?: string,
    onChange?: (value: any)=>{},
    children?: any,
}

const Select = (props: SelectProps) => {
    const {label, value, children, fullWidth, onChange} = props;
    const [openDrop, setOpenDrop] = useState(false);
    const [internalValue, setInternalValue] = useState(value);
    const [renderedText, setRenderedText] = useState(label);
    const refDrop = useRef(null);
    const refInput = useRef(null);
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: MouseEvent) {
            if (refDrop.current && !refDrop.current.contains(event.target) && !refInput.current.contains(event.target)) {
                setOpenDrop(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refDrop]);


    useEffect(() => {
        const getTextFromValue = () =>{
            const selectedChild = children.filter((child: any) => child.props.value === internalValue)[0];
            return selectedChild.props.children;
        };
        setRenderedText(internalValue ? getTextFromValue() : label)
    }, [internalValue, label, children]);



    const focus = internalValue !== undefined;

    const selectStyle = {};

    if(renderedText === label) {
        selectStyle['color'] =  '#838383';
    }

    const classesDropdown = classNames(styles.dropdown, {
        [styles.dropdownVisible]: openDrop,
        [styles.dropdownFullWidth]: fullWidth,
    });

    const openDropdown = () => {
        setOpenDrop(true);
    };

    const onClickItem = (selectedValue: any) => {
        setOpenDrop(false);
        setInternalValue(selectedValue);
        if(onChange) {
            onChange(selectedValue);
        }

    };


    return(
        <>
            <BaseInput {...props} focus={focus}>
                <div ref={refInput} className={styles.select} style={selectStyle} onClick={openDropdown}>{renderedText}</div>
            </BaseInput>
            <div className={classesDropdown} ref={refDrop}>
                {React.Children.map(children, child => {
                    return React.cloneElement(child, {
                        ...child.props, onClick: onClickItem,
                    })
                })}
            </div>
        </>
    );
};

Select.defaultProps = {
    fullWidth: false,
    color: 'estherGreen',
};


Select.propTypes = {
    label: PropTypes.string.isRequired,
    fullWidth: PropTypes.bool,
    color: PropTypes.string,
    onChange: PropTypes.func,
};

export default Select;