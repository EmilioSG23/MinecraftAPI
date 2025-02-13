import { useCallback, useEffect, useState } from "react"

export function useImageLoaded(length) {
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [isAllImageLoaded, setIsAllImageLoaded] = useState(false);

    const addImageLoaded = useCallback(() => {
        setImagesLoaded((prev) => prev + 1)
    },[])
    
    useEffect(() => {
        if (imagesLoaded === length && length > 0){
            setIsAllImageLoaded(true)
        } 
    },[length, imagesLoaded])
    
    return {isAllImageLoaded, addImageLoaded}
}