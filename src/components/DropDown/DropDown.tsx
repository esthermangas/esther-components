import * as React from "react";
import { FC, ReactNode, CSSProperties } from "react";
import { useState } from "react";
import { usePopper } from "react-popper";
import {
    BasePlacement,
    VariationPlacement,
    ModifierArguments,
} from "@popperjs/core";
import classes from "./DropDown.module.css";
import Portal from "./Portal/Portal";
import { ColorType } from "../../typings";
import { toVariable } from "../../utils/color";

const setAnchorWidth = <T extends any>({ state }: ModifierArguments<T>) => {
    const { styles, rects, options } = state;
    const modifier = options.modifiers.find(({ name }) => name === "anchorWidth");
    const width = modifier.options.width;

    let ratio = 1;

    // Scale box when width is a percentage
    if (width && width.toString().includes("%")) {
        ratio = width.replace("%", "") / 100;
    }

    const x = rects.reference.x;
    const y = styles.popper.transform.match(/-?[.\d]+px, (-?[.\d]+)px/)[1];

    styles.popper.transform = `translate(${x}px, ${y}px)`;
    styles.popper.width = `${Math.max(rects.popper.width, rects.reference.width * ratio)}px`;

    return state;
};

export interface DropdownProps {
    children?: any;
    anchor?: ReactNode;
    width?: number | string;
    expand?: boolean;
    position?: BasePlacement | VariationPlacement;
    arrow?: boolean;
    visible?: boolean;
    color?: ColorType;
}

const Dropdown: FC<DropdownProps> = (Props) => {
    const {
        anchor,
        expand,
        arrow,
        width,
        children,
        color,
        position,
        visible,
    } = Props;

    const [anchorElem, setAnchorElem] = useState(null);
    const [dropdownElem, setDropdownElem] = useState(null);
    const [arrowElem, setArrowElem] = useState(null);

    const { styles, attributes } = usePopper(anchorElem, dropdownElem, {
        placement: position,
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, arrow ? 16 : 0],
                },
            },
            {
                name: "arrow",
                enabled: arrow,
                options: {
                    element: arrowElem,
                },
            },
            {
                name: "anchorWidth",
                enabled: expand,
                fn: setAnchorWidth,
                phase: "beforeWrite",
                requires: ["computeStyles"],
                options: {
                    width,
                },
            },
        ],
    });

    const boxStyle: CSSProperties = {
        backgroundColor: toVariable(color),
        width: !expand && width,
    };

    const arrowStyle: CSSProperties = {
        backgroundColor: toVariable(color),
    };

    return (
        <>
            <div
                ref={setAnchorElem}
                style={{
                    display:
                        width && width.toString().includes("%") ? "block" : "inline-block",
                }}
            >
                {anchor}
            </div>
            <Portal>
                {visible && (
                    <div
                        ref={setDropdownElem}
                        style={{ ...styles.popper, zIndex: 2 }}
                        {...attributes.popper}
                    >
                        <div
                            className={classes.dropdown}
                            style={boxStyle}
                        >
                            {arrow && (
                                <span
                                    ref={setArrowElem}
                                    className={classes.arrow}
                                    style={styles.arrow}
                                >
                  <i className={classes.shape} style={arrowStyle} />
                </span>
                            )}
                            {children}
                        </div>
                    </div>
                )}
            </Portal>
        </>
    );
};

Dropdown.defaultProps = {
    arrow: true,
    expand: false,
    position: "bottom",
    color: "white",
};

export default Dropdown;