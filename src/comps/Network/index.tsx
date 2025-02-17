import { forwardRef, useEffect, useState } from "react";
import Box from "../Box";
import Text from "../Text";
import Button from "../Button";
import { ALERT, Position, Size, TRANSITION_CURVES } from "../../types/enums";
import { useNetworkStatus } from "../../hooks";
import { NetworkManagerprops } from "./types";
import SVGIcons from "../svgicons";

const NetworkManager = forwardRef<HTMLDivElement, NetworkManagerprops>((props, ref) => {

    const isOnline = useNetworkStatus()
    const { onlineMessage, offlineMessage, size } = props

    useEffect(() => {
        
    }, [])

    return <Box 
        animate={{
            from: { x: `-50%`, y: 200, opacity: 0 },
            to: { x: `-50%`, y: 0, opacity: 1 },
            when: isOnline == false,
            curve: TRANSITION_CURVES.Spring,
            duration: 0.5,
            delay: 2
        }}
        className={`--network-manager --${isOnline == true ? `online` : `offline`} --${size || Size.Small} fixed flex`}>
        <Box className={`--ico`}>
            {isOnline ? SVGIcons[ALERT.Success] : SVGIcons[ALERT.Error]}
        </Box>
        <Text as={`--message`}>{isOnline ? onlineMessage || `internet connection restored :)` : offlineMessage || `no internet connection`}</Text>
    </Box>

})

export default NetworkManager;