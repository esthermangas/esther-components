import { useState, useEffect, useRef, MutableRefObject } from "react";

export const useHover = (): [MutableRefObject<any>, boolean] => {
    const [hover, setHover] = useState(false);
    const ref = useRef(null);

    const handleMouseOver = () => setHover(true);
    const handleMouseOut = () => setHover(false);

    // @ts-ignore
    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener("mouseover", handleMouseOver);
            node.addEventListener("mouseout", handleMouseOut);

            return () => {
                node.removeEventListener("mouseover", handleMouseOver);
                node.removeEventListener("mouseout", handleMouseOut);
            };
        }
    }, []);

    return [ref, hover];
};

export const useDelayedUnmount = (render: boolean, duration: number) => {
    const [shouldRender, setShouldRender] = useState(render);

    useEffect(
        () => {
            if (render) {
                setShouldRender(true);
            }
            else {
                window.setTimeout(() => setShouldRender(false), duration);
            }
        },
        [render, duration],
    );

    return shouldRender;
};