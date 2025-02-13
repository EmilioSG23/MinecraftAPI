export function AlertMessage (props){
    const {message, fontSize = "text-[48px]", borderColor = "border-white-900"} = props
    return (
      <div className = {"fixed left-1/2 top-1/2 -translate-1/2 bg-black/25 border-4 text-white/100 text-center py-10 px-20"+ " "+fontSize+ " "+borderColor}>
        {message}
      </div>
    )
}

export function AlertLoadingMessage(){
  return(<AlertMessage message = "Loading the information..." />)
}

export function AlertImageLoading(){
  return(<AlertMessage message = "Loading the images..." />)
}

export function AlertErrorMessage(){
  return(<AlertMessage message = "Error with the fetching of the datas :(, go back and try again..." fontSize = "text-[32px]" borderColor = "border-red-900"/>)
}