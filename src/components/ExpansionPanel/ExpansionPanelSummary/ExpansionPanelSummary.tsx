import React from "react";
import PropTypes from "prop-types";
// @ts-ignore
import styles from './ExpansionPanelSummary.module.css';
import Icon from '../../Icon/Icon';
import classNames from "classnames";

type ExpansionPanelSummaryProps = {
    children?: any,
    onClick?: () => {},
    open?: boolean,
}

const ExpansionPanelSummary = (props: ExpansionPanelSummaryProps) => {
    const {children, onClick, open} = props;


    const chevronClass = classNames(styles.chevron, {
        [styles.chevronRotate]: open,
    });

    return(
            <div className={styles.summary} onClick={onClick}>
                <div className={styles.content}>{children}</div>
                <div className={styles.iconContainer}>
                    <span className={chevronClass}>
                        <Icon name="chevronDown" color="dark" />
                    </span>
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