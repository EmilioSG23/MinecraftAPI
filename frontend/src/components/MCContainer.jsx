export function MCContainer(props){
    return (
    <div className = "max-w-6xl min-h mx-auto w-[95%] bg-[#c6c6c6] rounded-3xl border-5 border-black bg-gradient-to-br from-white/75 from-50% to-black/50 to-50%">
      <div className='bg-[#c6c6c6] rounded-3xl m-1'>{props.children}</div>
    </div>
    )
}