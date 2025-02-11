export function Background(){
    return(
    <>
        <div className = "fixed -z-40 bg-black/25 h-full w-full top-0 left-0 pointer-events-none backdrop-blur-[0px]"/>
        <div className = "background fixed -z-50 bg-black h-full w-full top-0 left-0 pointer-events-none" />
    </>
    )
}