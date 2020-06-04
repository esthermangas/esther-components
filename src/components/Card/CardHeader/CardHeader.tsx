import React from "react";
import PropTypes from "prop-types";
// @ts-ignore
import styles from './CardHeader.module.css'


type CardHeaderProps = {
    children?: any,
    isCardHeader: true,
}
const CardHeader = (props: CardHeaderProps) => {
    const {children} = props;


    return(
        <div className={styles.header}>
            {children}
        </div>
    );
};

CardHeader.defaultProps = {
};

CardHeader.propTypes = {
    children: PropTypes.any,
};

export default CardHeader;