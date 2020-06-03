import React from 'react';
import LoadingCircle from './LoadingCircle/LoadingCircle';
import PropTypes from 'prop-types';
import {ColorType, SpinnerType} from '../../typings';

export type SpinnerProps = {
    size?: number,
    color?: ColorType,
    name: SpinnerType
}

const Spinner = (props: SpinnerProps) => {
    const { name, ...rest} = props;

    switch (name) {
        case "loadingCircle":
            return <LoadingCircle name={name} {...rest}/>;
        default:
            throw new Error(`Spinner named ${name} does not exist.`);
    }
};

Spinner.defaultProps = {
    color: "estherGreen",
    name: "loadingCircle",
    size: 24,
};

Spinner.propTypes = {
    color: PropTypes.string,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
};

export default Spinner;