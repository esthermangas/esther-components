import React, {useState} from "react";
import {ColorType} from "../../typings";
import PropTypes from 'prop-types';
import {toRgba} from "../../utils/color";

type ExpansionPanelProps = {
    open?: boolean
    color?: ColorType,
    children?: any,
    onClick?: (open: boolean) => {},
}

const ExpansionPanel = (props: ExpansionPanelProps) => {
    const {open, color, children, onClick} = props;
    const [openDetails, setOpenDetails] = useState(open);

    const containerStyle ={
        backgroundColor: toRgba(color, 0.10),
        borderRadius: 4,
    };

    if(openDetails){
        containerStyle["marginBottom"]= 16;
    }

    const onClickSummary = () => {
        if(onClick){
            onClick(!openDetails);
        }
        setOpenDetails(!openDetails);

    };

    let summary = null;
    React.Children.forEach(children, child => {
        if(child.props && child.props.isExpansionSummary){
            summary = child;
        }});

    let details = undefined;
    React.Children.forEach(children, child => {
        if(child.props && child.props.isExpansionDetails){
            details = child;
        }});

    // @ts-ignore
    const summaryProps = {...summary.props, onClick: onClickSummary, open: openDetails};

    return(
        <div style={containerStyle}>
            {React.isValidElement(summary) && React.cloneElement(summary, summaryProps)}
            {openDetails && details}
        </div>
    );
};


ExpansionPanel.defaultProps = {
    color: "estherGreen",
};

ExpansionPanel.propTypes = {
    open: PropTypes.bool,
    color: PropTypes.string,
    children: PropTypes.any,
    onClick: PropTypes.func,
};


export default ExpansionPanel;