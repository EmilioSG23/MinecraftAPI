/* eslint-disable no-constant-binary-expression */
import { useLayoutEffect, useState } from "react"

export const DISPLAY_MODE = {
    RANDOM: "random",
    SELECT: "select"
}

const DEFAULT = {
    panorama: 10,
    blur: 5,
    displayMode: DISPLAY_MODE.SELECT
}

const VALUES = {
    PANORAMA: "panorama",
    DISPLAY_MODE: "displayMode",
    BLUR: "blur"
}

export function useConfigBackground () {
    const { initialPanorama, initialDisplayMode, initialBlur } = {
        initialPanorama: Number(window.localStorage.getItem(VALUES.PANORAMA)) ?? DEFAULT.panorama,
        initialDisplayMode: window.localStorage.getItem(VALUES.DISPLAY_MODE) ?? DEFAULT.displayMode,
        initialBlur: Number(window.localStorage.getItem(VALUES.BLUR)) ?? DEFAULT.blur
    }

    const [panorama, setPanorama] = useState(initialPanorama)
    const [displayMode, setDisplayMode] = useState(initialDisplayMode)
    const [blur, setBlur] = useState(initialBlur)
    
    const changePanorama = (panorama) => {
        setPanorama(panorama)
        if (displayMode === DISPLAY_MODE.SELECT)
            window.localStorage.setItem(VALUES.PANORAMA, panorama)
    }
    const changeDisplayMode = (displayMode) => {
        setDisplayMode(displayMode)
        window.localStorage.setItem(VALUES.DISPLAY_MODE, displayMode)
        if(displayMode === DISPLAY_MODE.SELECT)
            setPanorama(initialPanorama)
    }
    const changeBlur = (blur) => {
        setBlur(blur)
        window.localStorage.setItem(VALUES.BLUR, blur)
    }

    useLayoutEffect(() => {
        if (displayMode === DISPLAY_MODE.RANDOM){
            const rng = Math.floor(Math.random() * 10) + 1;
            setPanorama(rng)
        }
    },[])

    return {panorama, blur, displayMode, changePanorama, changeBlur, changeDisplayMode}
}