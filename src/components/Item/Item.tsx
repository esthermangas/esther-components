import React from "react";
import PropTypes from 'prop-types';
// @ts-ignore
import styles from './Item.module.css';

type ItemProps = {
    value: string,
    children?: string,
    onClick?: (value: any)=>{}
}

const Item = (props: ItemProps) => {
    const {children, onClick, value} = props;


    const handleClick = () => {
        onClick(value)
    };

    return(
        <div className={styles.item} onClick={handleClick}>
            {children}
        </div>
    )
};

Item.propTypes = {
    value: PropTypes.string.isRequired,
    children: PropTypes.string,
    onClick: PropTypes.func,
};

export default Item;