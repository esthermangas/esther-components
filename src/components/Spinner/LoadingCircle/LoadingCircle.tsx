import React from 'react';
import {SpinnerProps} from "../Spinner";
import {toVariable} from "../../../utils/color";
// @ts-ignore
import styles from './LoadingCirle.module.css';

const LoadingCircle = (props: SpinnerProps) => {
    const {size, color} = props;
    return (
        <svg
            className={styles.spinner}
            width={size}
            height={size}
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
            >
            <circle
                className={styles.path}
                fill="none"
                stroke={toVariable(color)}
                strokeWidth="6"
                strokeLinecap="round"
                cx="33"
                cy="33"
                r="30"
                />
        </svg>
    );
};

export default LoadingCircle;