import React from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
// @ts-ignore
import styles from "./Button.module.css";
import {ColorType} from "../../typings";
import {toRgba, toVariable} from "../../utils/color";
import { useHover } from "../../utils/hooks";

type ButtonProps = {
    label: string,
    size?: "big" | "small",
    variant?: "primary" | "secondary" | "text",
    color?: ColorType,
    fullWidth?: boolean,
    onClick?: (event: React.MouseEvent<HTMLElement>)=>{}
}

const Button = (props: ButtonProps) => {
    const { label, size, onClick, fullWidth, color, variant } = props;

    const [hoverRef, isHover] = useHover();
    const classesButton = classNames(styles.button, {
        [styles[size]]: !fullWidth,
        [styles.fullWidth]: fullWidth,
    });

    const buttonStyle = {
        backgroundColor: toVariable(color),
        color: 'white',
        border: `1px solid ${toVariable(color)}`,
    };

    if( variant === "secondary" ) {
        buttonStyle.backgroundColor = "white";
        buttonStyle.color = toVariable(color);
    }

    if(isHover) {
        buttonStyle.backgroundColor = toRgba(color, 0.85);
    }

    if (isHover && variant === "secondary") {
        buttonStyle.backgroundColor = toRgba(color, 0.10);
    }

    if(variant === "text") {
        buttonStyle.backgroundColor = "transparent";
        buttonStyle.color = toVariable(color);
        buttonStyle.border = 'none';
    }

    if(isHover && variant === "text") {
        buttonStyle.backgroundColor = toRgba(color, 0.10);
    }

    return (
            <button onClick={onClick} className={classesButton} style={buttonStyle} ref={hoverRef}>
                {label}
            </button>
    );
};

Button.defaultProps = {
    size: "small",
    fullWidth: false,
    color: "estherGreen",
    variant: "primary",
};


Button.propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.string,
    fullWidth: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Button;