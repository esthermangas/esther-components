import React from "react";
import {IconType, ColorType} from "../../typings";
// @ts-ignore
import styles from './Icon.module.css';
import icons from "./svgs";
import classNames from "classnames";
import {toVariable} from "../../utils/color";
import PropTypes from 'prop-types';

type IconProps = {
    name: IconType,
    color?: ColorType,
    size?: number,
};

const Icon = (props: IconProps) => {
    const {name, color, size} = props;

    const classes = classNames(styles.icon);

    const path = icons[name];
    const fill = toVariable(color);

    return (
        <svg className={classes} height={size} width={size} viewBox="0 0 24 24" aria-hidden="true">
            <path d={path} fill={fill} fillRule="evenodd" clipRule="evenodd" />
        </svg>
    )
};

Icon.defaultProps = {
    color: "estherGreen",
    size: 24,
};

Icon.propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    name: PropTypes.string.isRequired,
}

export default Icon;