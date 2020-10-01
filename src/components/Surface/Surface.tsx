import React from "react";
import PropTypes from "prop-types";
import {ColorType} from "../../typings";
// @ts-ignore
import styles from './Surface.module.css';
import {toRgba} from "../../utils/color";
import classNames from "classnames";

type SurfaceProps = {
    children?: any
    color?: ColorType,
    width?: string,
    height?: string,
    square?: boolean,
    variant?: "outlined" | "elevation" | "plain"
}
const Surface = (props: SurfaceProps) => {
    const {children, color, width, height, square, variant} = props;

    const surfaceStyle = {
        backgroundColor: 'white',
        width,
        height,
    };

    const surfaceStyleColor = {
        backgroundColor: toRgba(color, 0.05),
        width,
        height,
    };

    if(!square){
        surfaceStyle["borderRadius"] = "8px"
    }

    if(variant === "outlined") {
        surfaceStyle["border"] = `1px solid ${toRgba(color, 0.30)}`;
    }

    const surfaceClass = classNames({
        [styles.elevation]: variant === "elevation",
    });

    return(
        <div style={surfaceStyle} className={surfaceClass}>
            <div className={styles.root} style={surfaceStyleColor}>
                <div className={styles.childrenContainer}>
                    {children}
                </div>
            </div>
        </div>
    );
};

Surface.defaultProps = {
    color: "estherGreen",
    width: "auto",
    height: "auto",
    square: false,
    variant: "plain",
};

Surface.propTypes = {
    color: PropTypes.string,
    children: PropTypes.any,
    width: PropTypes.string,
    height: PropTypes.string,
    square: PropTypes.bool,
    variant: PropTypes.string,
};

export default Surface;