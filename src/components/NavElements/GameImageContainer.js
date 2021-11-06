import React from "react";
import {Div} from "@vkontakte/vkui";

export const GameImageContainer = ({src, width, height, border, padding}) => {

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
        borderRadius: 8,
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
        maxWidth: '100%',
        width: 'auto',
        height: 'auto',
        maxHeight: '100%',
        display: 'table-cell',
        verticalAlign: 'middle',
        textAlign: 'center'

    };

    return (
        <Div style={imageContainer}>
            <img style={largeImageStyles} src={src} alt={""}/>
        </Div>
    )
}