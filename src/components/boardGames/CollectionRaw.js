import React from "react";
import {UsersStack} from "@vkontakte/vkui";
import {declOfNum} from "../../Util/Util";
import {Box} from "@material-ui/core";

export const CollectionRaw = (props) => {
    return (
        <Box sx={{padding: 2}}>
            <UsersStack
                photos={game.boardGameCollections
                    .filter(c => c.type	=== "OWN")
                    .map(c => c.owner.avatarUrl)}
                count={3}
            >В коллекции у {declOfNum(game.boardGameCollections
                .filter(c => c.type	=== "OWN").length, titles)}</UsersStack>
        </Box>
    )
}