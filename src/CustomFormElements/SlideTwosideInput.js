import {CustomSideInput} from "./CustomSideInput";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCollectionFilter, setCollectionFilter} from "../store/rootReducer";


export const SlideTwosideInput = ({param, title}) => {

    const dispatch = useDispatch();

    const params = useSelector((state) => state.rootReducer.collectionFilterParams);
    const LOW_BORDER =  params[param][0];
    const UPPER_BORDER =  params[param][1];


    const [bindValue, setBindValue] = useState([params[param][0], params[param][1]]);
    const [min, setMin] = useState(params[param][0]);
    const [max, setMax] = useState(params[param][1]);
    const [inputTimer, setInputTimer] = useState(null);

    const applyFilter = () => {
        if (min !== LOW_BORDER || max !== UPPER_BORDER) {
            dispatch(setCollectionFilter({
                name: param,
                config: {
                    min: min,
                    max: max
                }
            }));
        } else dispatch(deleteCollectionFilter(param));
    }

    useEffect(() => {
        applyFilter();
        return () => {
            applyFilter()
        };
    }, [min, max]);


    const changeMin = (value) => {
        setMin(value);
        if (inputTimer) clearTimeout(inputTimer);
        setInputTimer(setTimeout(() => {
            setBindValue([value, bindValue[1]])
        }, 500));
    }

    const changeMax = (value) => {
        setMax(value)
        if (inputTimer) clearTimeout(inputTimer);
        setInputTimer(setTimeout(() => {
            setBindValue([bindValue[0], value]);
        }, 500));
    }

    const onSlideTimeChange = (value) => {
        setBindValue(value);
        setMin(value[0]);
        setMax(value[1]);
    }


    return (
        <CustomSideInput
            onClose = {applyFilter}
            boundInput={bindValue}
            min={LOW_BORDER}
            max={UPPER_BORDER}
            minValue = {min}
            maxValue = {max}
            setMinValue={changeMin}
            setMaxValue={changeMax}
            onChange={onSlideTimeChange}
            step={1}
            title={title}
        />
    )
}