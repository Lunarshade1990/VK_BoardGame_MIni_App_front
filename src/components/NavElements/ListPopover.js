import React from "react";
import {List, ListItem, ListItemButton, ListItemText, Popover} from "@material-ui/core";

export const ListPopover = ({anchorEl, handleClose, listConf, disableAutoFocus}) => {

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const listItems = listConf.items.map(item => {
        return (
            <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => listConf.onItemChoose(item.item)}>
                    <ListItemText primary={item.text} />
                </ListItemButton>
            </ListItem>
        )
    })

    return (
        <Popover
            disableAutoFocus={disableAutoFocus}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <List>
                {listItems}
            </List>
        </Popover>
    )
}