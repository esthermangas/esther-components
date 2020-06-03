// @ts-ignore
import styles from "./ExpansionPanelDetails.module.css";
import React from "react";
import PropTypes from "prop-types";

type ExpansionPanelDetailsProps = {
    children?: any,
}

const ExpansionPanelDetails = (props: ExpansionPanelDetailsProps) => {
    const {children} = props;
    return(
        <div className={styles.details}>
            {children}
        </div>
    );
};

ExpansionPanelDetails.defaultProps = {
};

ExpansionPanelDetails.propTypes = {
    children: PropTypes.any,
};

export default ExpansionPanelDetails;
