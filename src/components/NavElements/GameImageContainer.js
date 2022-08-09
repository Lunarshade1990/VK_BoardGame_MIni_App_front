import React from "react";
import {Div} from "@vkontakte/vkui";

export const GameImageContainer = ({src, width, height, border, padding, roundCorner}) => {

   let horizontalPadding = 16;
   let verticalPadding = 12;
   if (height < 100) {
       horizontalPadding = 8;
       verticalPadding = 6;
   }

   if (!padding) {
       horizontalPadding = 0;
       verticalPadding = 0;
   }

    const imageContainer = {
        width: width,
        height: height,
        overflow: "hidden",
        borderRadius: roundCorner ? 8 : 0,
        paddingTop: verticalPadding,
        paddingBottom: verticalPadding,
        paddingRight: horizontalPadding,
        paddingLeft: horizontalPadding,
        border: border ? '1px solid var(--placeholder_icon_background)' : null,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const largeImageStyles = {
       width: '100%',
        height: '100%',
        objectFit: "scale-down"
    };

    return (
        <Div style={imageContainer}>
            <img style={largeImageStyles} src={src} alt={""}/>
        </Div>
    )
}