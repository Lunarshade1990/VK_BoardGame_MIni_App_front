import {FormItem, FormLayoutGroup, Input, SizeType} from "@vkontakte/vkui";
import {Slider} from "@material-ui/core";
import React from "react";


export const CustomSideInput = (props) => {

    return (
        <FormItem top={props.title} style={{padding: '24 16 24 0'}}>
            <FormLayoutGroup mode="horizontal" style={{alignItems: 'center', padding: 0}}>
                <FormItem>
                    <Slider
                        aria-label="Temperature"
                        onChange={(e) => props.onChange(e.target.value)}
                        valueLabelDisplay="auto"
                        value={[...props.boundInput]}
                        min={props.min}
                        max={props.max}
                        step={props.step}
                    />
                </FormItem>
                <FormLayoutGroup mode="horizontal" style={{width: '38%', paddingRight: 0}}>
                    <FormItem style={{paddingRight: '0'}}>
                        <Input type={"number"}
                               min={props.min}
                               sizeY={SizeType.COMPACT}
                               value={props.minValue}
                               onChange={(e) => props.setMinValue(e.target.value)}/>
                    </FormItem>
                    <FormItem style={{paddingLeft: '0', marginLeft: 10}}>
                        <Input type={"number"}
                               max={props.max}
                               sizeY={SizeType.COMPACT}
                               value={props.maxValue}
                               onChange={(e) => props.setMaxValue(e.target.value)}/>
                    </FormItem>
                </FormLayoutGroup>
            </FormLayoutGroup>
        </FormItem>
    )

}