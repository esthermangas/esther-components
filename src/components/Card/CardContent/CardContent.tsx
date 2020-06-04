import React from "react";
import PropTypes from "prop-types";
// @ts-ignore
import styles from './CardContent.module.css'


type CardContentProps = {
    children?: any,
    isCardContent?: boolean,
}
const CardContent = (props: CardContentProps) => {
    const {children} = props;


    return(
        <div className={styles.content}>
            {children}
        </div>
    );
};

CardContent.defaultProps = {
    isCardContent: true,
};

CardContent.propTypes = {
    children: PropTypes.any,
};

export default CardContent;