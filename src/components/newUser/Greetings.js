import {Button, FormItem, FormLayout, Group, Input, Panel, PanelHeader, View} from "@vkontakte/vkui";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {setActiveView, setGameCollectionLoadingStatus} from "../../store/rootReducer";
import {importGameCollection} from "../../api/backApi/teseraApi";



export const Greetings = ({onSubmit}) => {

    const [teseraNickName, setTeseraNickname] = useState("");
    const dispatch = useDispatch();

    const submitWithoutImport = () => {
        dispatch(setActiveView("view1"));
    }


    return (<>
                <PanelHeader>Добро пожаловать!</PanelHeader>
                <Group>
                    <FormLayout>
                        <FormItem
                            top="Никнейм на тесере"
                        >
                            <Input
                                type="text"
                                name="teseraNickName"
                                value={teseraNickName}
                                onChange={(e) => setTeseraNickname(e.target.value)}
                            />
                        </FormItem>
                        <FormItem>
                            <Button size="l" stretched onClick={() => onSubmit(teseraNickName)}>Импортировать</Button>
                        </FormItem>
                        <FormItem>
                            <Button size="l" stretched onClick={submitWithoutImport}>У меня ещё нет профиля на Тесере</Button>
                        </FormItem>
                    </FormLayout>
                </Group>
        </>
    )
}