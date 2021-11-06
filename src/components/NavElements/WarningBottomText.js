import React from "react";
import { Icon24WarningTriangleOutline } from '@vkontakte/icons';

export const WarningBottomText = ({text}) => {

    const containerStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start"
    }

    const iconContainer = {
        marginRight: "0.25rem"
    }

    const textStyle = {
        color: "#FF8800"

    }

    return (
        <div style={containerStyle}>
            <div style={iconContainer}><Icon24WarningTriangleOutline width={16} height={16} fill={"#FF8800"}/></div>
            <div style={textStyle}>{text}</div>
        </div>
    )
}