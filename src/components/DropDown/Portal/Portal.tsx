import { FC } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
    children: any;
}

const Portal: FC<PortalProps> = (Props) => {
    const { children } = Props;
    return createPortal(children, document.body);
};

export default Portal;