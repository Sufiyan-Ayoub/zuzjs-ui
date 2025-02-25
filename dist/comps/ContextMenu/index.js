"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Box from "../Box";
import { useAnchorPosition, useBase } from "../../hooks";
import MenuItem from "./item";
import { TRANSITION_CURVES } from "../../types/enums";
// import { dynamicObject } from "../../types";
const ContextMenu = forwardRef((props, ref) => {
    const { as, offsetX, offsetY, parent, items: _items, ...pops } = props;
    const { className, style, rest } = useBase(pops);
    const event = useRef(undefined);
    const [visible, setVisible] = useState(false);
    // const [_position, setPosition] = useState<{ x: number, y: number } | null>(null);
    // const [_parent, setParent] = useState<{ x: number, y: number, width: number, height: number } | null>(null);
    const [items, setItems] = useState(_items || []);
    const { position, targetRef } = useAnchorPosition(parent, event.current, { offsetX, offsetY });
    useImperativeHandle(ref, () => ({
        show: (e, menuItems) => {
            if (!parent)
                event.current = e;
            // let x = 0, y = 0;
            // if ( parent ){
            //     const { x: px, y: py, width, height } = _parent || parent.getBoundingClientRect()
            //     // x = right + 5
            //     // y = top + height + 5
            // }
            // else{
            //     x = e instanceof MouseEvent ? e.clientX 
            //         : e instanceof TouchEvent && e.touches.length > 0 ? e.touches[0].clientX : (e as dynamicObject).clientX || 0;
            //     y = e instanceof MouseEvent ? e.clientY
            //         : e instanceof TouchEvent && e.touches.length > 0 ? e.touches[0].clientY : (e as dynamicObject).clientY || 0;
            // }
            // setPosition({ x, y })
            if (menuItems) {
                setItems(menuItems);
            }
            setVisible(true);
        },
        hide: (e) => setVisible(false),
    }));
    // useEffect(() => {
    //     if ( !visible || !_menu.current ) return;
    //     const menu = _menu.current;
    //     const { offsetWidth: w, offsetHeight: h } = menu;
    //     let { x, y } = position;
    //     // Prevent overflow on the right
    //     if (x + w > window.innerWidth) {
    //         x = window.innerWidth - w - 10;
    //     }
    //     // Prevent overflow on the bottom
    //     if (y + h > window.innerHeight) {
    //         y = window.innerHeight - h - 10;
    //     }
    //     // Prevent going off the left side
    //     if (x < 0) x = 10;
    //     // Prevent going off the top side
    //     if (y < 0) y = 10;
    //     setPosition({ x, y })
    // }, [visible])
    // useEffect(() => {
    //     if ( visible ){
    //         let px, py = 0
    //         if ( parent ){
    //             const { x, y, width, height } = _parent || parent.getBoundingClientRect()
    //             px = x
    //             py = y
    //         }
    //         const { width: w, height: h } = _menu.current!.getBoundingClientRect()
    //         // Prevent overflow on the right
    //         if (px! + w > window.innerWidth) {
    //             px = window.innerWidth - w - 10;
    //         }
    //         setPosition({ x: px!, y: py! })
    //     }
    // }, [visible])
    // useEffect(() => {
    //     if ( parent && !position ){
    //         const { x, y, width, height } = parent.getBoundingClientRect()
    //         setParent({ x, y, width, height })
    //         setPosition({ x, y })
    //     }
    // }, [parent])
    // if ( !visible ) return null
    return _jsx(Box, { className: `--contextmenu abs flex cols ${className}`.trim(), "aria-hidden": !visible, style: {
            ...style,
            top: position.top,
            left: position.left
        }, animate: {
            from: { opacity: 0, y: 20 },
            to: { opacity: 1, y: 0 },
            curve: TRANSITION_CURVES.EaseInOut,
            duration: 0.05,
            when: visible
        }, ref: targetRef, ...rest, children: items.map((item, index) => _jsx(MenuItem, { ...{ ...item, index } }, `context-${item.label.toLowerCase()}-${index}`)) });
});
export default ContextMenu;
