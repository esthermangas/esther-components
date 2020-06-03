import React from "react";
import PropTypes from "prop-types";
// @ts-ignore
import styles from './ExpansionPanelSummary.module.css';
// @ts-ignore
import {ReactComponent as Chevron} from './up-chevron.svg';

type ExpansionPanelSummaryProps = {
    children?: any,
    onClick?: () => {},
    open?: boolean,
}

const ExpansionPanelSummary = (props: ExpansionPanelSummaryProps) => {
    const {children, onClick, open} = props;

    const chevronStyle = {
        transitionDuration: "0.3s",
        transitionProperty: "transform",
        width: 18,
        height: 18,
        cursor: "pointer",
    };

    if(open){
        chevronStyle["transform"]= "rotate(180deg)";
    }

    return(
            <div className={styles.summary} onClick={onClick}>
                <div className={styles.content}>{children}</div>
                <div className={styles.iconContainer}>
                    <Chevron style={chevronStyle} />
                </div>
            </div>
    );
};

ExpansionPanelSummary.defaultProps = {
};

ExpansionPanelSummary.propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func,
    open: PropTypes.bool,
};

export default ExpansionPanelSummary;