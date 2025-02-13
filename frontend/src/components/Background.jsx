export function Background(){
    const rng = Math.floor(Math.random() * 10) + 1;
    return(
    <>
        <div className = "fixed -z-40 bg-black/25 h-full w-full top-0 left-0 pointer-events-none backdrop-blur-[0px]"/>
        <div className = {`background fixed -z-50 bg-black h-full w-full top-0 left-0 pointer-events-none`} style={{backgroundImage: `url(panorama/panorama_${rng}.webp)`}}/>
    </>
    )
}