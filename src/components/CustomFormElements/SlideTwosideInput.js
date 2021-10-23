import {CustomSideInput} from "./CustomSideInput";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCollectionFilter} from "../../store/rootReducer";


export const SlideTwosideInput = ({param, title}) => {

    const didMountRef = useRef(false);
    const dispatch = useDispatch();

    const params = useSelector((state) => state.rootReducer.collectionFilterParams.filters);
    const filter = useSelector((state) => state.rootReducer.collectionFilter.filters);
    const LOW_BORDER =  params[param][0];
    const UPPER_BORDER =  params[param][1];
    const initMin = filter[param][0];
    const initMax = filter[param][1];


    const [bindValue, setBindValue] = useState([initMin, initMax]);
    const [min, setMin] = useState(initMin);
    const [max, setMax] = useState(initMax);
    const [inputTimer, setInputTimer] = useState(null);
    const [slideTimer, setSlideTimer] = useState(null);

    const setFilterOnChange = (bindValue) => {
        dispatch(setCollectionFilter({filters: {[param]: bindValue}}));
    }

    useEffect(() => {
        if (didMountRef.current) {
            if (slideTimer) clearTimeout(slideTimer);
            setSlideTimer(setTimeout(() => {
                setFilterOnChange(bindValue);
            }, 500));
        } else didMountRef.current = true
    }, [bindValue])


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