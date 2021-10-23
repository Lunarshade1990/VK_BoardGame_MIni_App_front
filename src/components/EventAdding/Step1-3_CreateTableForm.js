import React, {useState} from "react";
import {Button, FormItem, FormLayout, FormLayoutGroup, Group, Input, Radio} from "@vkontakte/vkui";
import {StandardPanelHeader} from "../NavElements/StandardPanelHeader";

export const CreateTableForm = ({onSaveTable}) => {

    const [name, setName] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [max, setMax] = useState('');
    const [shape, setShape] = useState('');

    const onSaveButtonClick = () => {
        const form = {
            name: name,
            width: width,
            length: length,
            max: max,
            shape: shape.toUpperCase()
        }
        if (name && length && width && max && shape) onSaveTable(form);
    }

    return(
        <>
            <StandardPanelHeader showBack title={"Стол - форма"} />
            <Group>
                <FormLayout>
                    <FormItem top="Название" bottom={name ? '' : 'Заполните поле'} status={name ? 'valid' : 'error'}>
                        <Input
                            required
                            placeholder="Кодовое имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                    </FormItem>
                </FormLayout>
                <FormLayoutGroup mode="horizontal">
                    <FormItem top="Длина" bottom={length ? '' : 'Заполните поле'} status={length ? 'valid' : 'error'}>
                        <Input
                            required
                            type="Number"
                            placeholder="Размер длинной стороны в см"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}/>
                    </FormItem>
                    <FormItem top="Ширина" bottom={width ? '' : 'Заполните поле'} status={width ? 'valid' : 'error'}>
                        <Input
                            required
                            type="Number"
                            placeholder="Размер короткой стороны в см"
                            value={width}
                            onChange={(e) => setWidth(e.target.value)}/>
                    </FormItem>
                </FormLayoutGroup>
                <FormLayout>
                    <FormItem top="Максимальная вместимость" bottom={max ? '' : 'Заполните поле'} status={max ? 'valid' : 'error'}>
                        <Input
                            required
                            type="Number"
                            placeholder="Сколько максимум игроков можно посадить за стол"
                            value={max}
                            onChange={(e) => setMax(e.target.value)}/>
                    </FormItem>
                    <FormItem top="Форма стола" bottom={shape ? '' : 'Заполните поле'} status={shape ? 'valid' : 'error'}>
                        <Radio name="shape"
                               value="square"
                               checked={shape === "square"}
                               onChange={(e) => setShape(e.target.value)}
                        >
                            Прямоугольная (квадратная)
                        </Radio>
                        <Radio
                            name="shape"
                            value="circle"
                            checked={shape === "circle"}
                            onChange={(e) => setShape(e.target.value)}
                        >
                            Овальная (круглая)
                        </Radio>
                    </FormItem>
                    <FormItem>
                        <Button size="l" stretched onClick={onSaveButtonClick}>Сохранить</Button>
                    </FormItem>
                </FormLayout>
            </Group>
        </>
    )
}