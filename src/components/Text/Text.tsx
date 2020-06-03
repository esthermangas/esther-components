import React from "react";
// @ts-ignore
import styles from './Text.module.css';
import PropTypes from "prop-types";
import {ColorType} from "../../typings";
import {toVariable} from "../../utils/color";
import classNames from "classnames";

type TextProps = {
    children?: string,
    tagHtml?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span',
    color?: ColorType,
    paragraph?: boolean,
    display?: 'block' | 'inherit' | 'inline-block'
    width?: string,
    align?: 'inherit' | 'center' | 'justify' | 'right' | 'left',
}

const Text = (props: TextProps) => {
    const {children, tagHtml, color, paragraph, display, width, align} =  props;
    const TagHtml = tagHtml;

    const textStyle = {display, width, textAlign: align};
    if(tagHtml !== 'p' && tagHtml !== 'span' && color){
        textStyle['color'] = toVariable(color);
    }

    const classesRoot = classNames(styles.root, {
        [styles.paragraph]: paragraph,
    });

    return(
        <TagHtml style={textStyle} className={classesRoot}>
            {children}
        </TagHtml>
    );
};


Text.defaultProps = {
    tagHtml:'p',
    paragraph: false,
    display: 'inherit',
    width: 'inherit',
    align: 'left',
};


Text.propTypes = {
    children: PropTypes.string,
    tagHtml: PropTypes.string,
    color: PropTypes.string,
    paragraph: PropTypes.bool,
    display: PropTypes.string,
    width: PropTypes.string,
    align: PropTypes.string,
};
export default Text;