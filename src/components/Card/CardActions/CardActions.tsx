import React from "react";
import PropTypes from "prop-types";
// @ts-ignore
import styles from './CardActions.module.css'


type CardActionsProps = {
    children?: any,
}
const CardActions = (props: CardActionsProps) => {
    const {children} = props;


    return(
        <div className={styles.actions}>
            {children}
        </div>
    );
};

CardActions.defaultProps = {
};

CardActions.propTypes = {
    children: PropTypes.any,
};

export default CardActions;