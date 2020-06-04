import React from "react";
import PropTypes from "prop-types";
import {toRgba} from "../../utils/color";
import {ColorType} from "../../typings";
// @ts-ignore
import styles from './Card.module.css';

type CardProps = {
    style?: object,
    children?: any
    color?: ColorType,
}
const Card = (props: CardProps) => {
    const {style, children, color} = props;
    const cardStyle = {
        width: 300,
        borderRadius: 8,
        backgroundColor: toRgba(color, 0.05),
        padding: 8,
    };

    let header = null;
    React.Children.forEach(children, child => {
        if(child.props && child.props.originalType && child.props.originalType.displayName === "CardHeader"){
            header = child;
        }});

    let content = null;
    React.Children.forEach(children, child => {
        if(child.props && child.props.originalType && child.props.originalType.displayName === "CardContent"){
            content = child;
        }});

    let actions = null;
    React.Children.forEach(children, child => {
        if(child.props && child.props.originalType && child.props.originalType.displayName === "CardActions"){
            actions = child;
        }});

    return(
        <div style={{...cardStyle, ...style}} className={styles.card}>
            <div>
                {header}
            </div>
            <div>
                {content}
            </div>
            <div>
                {actions}
            </div>
        </div>
    );
};

Card.defaultProps = {
    color: "estherGreen",
};

Card.propTypes = {
    style: PropTypes.object,
    children: PropTypes.any,
    color: PropTypes.string,
};

export default Card;