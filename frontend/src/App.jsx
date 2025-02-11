import './App.css'
import { Menu } from './pages/Menu'
import { Information } from './pages/Information'
import { Terminal } from './pages/Terminal'
import { Documentation } from './pages/Documentation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Background } from './components/Background'
import { useEffect, useRef } from 'react'

function SelectionSoundEffect(){
  useEffect(() => {
    const sound = new Audio("/gui/selection.m4a")
    const handleClick = (event) => {
      const anchor = event.target.closest("a, button")
      if (anchor){
        sound.play()
        sound.currentTime = 0
      }
    }
    document.addEventListener("click", handleClick)
    return () => {document.removeEventListener("click", handleClick)}
  },[])
  return null;
}

function App() {
  return (
    <>
    <SelectionSoundEffect/>
    <Background/>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element={<Menu/>}/>
      <Route path = "/information/*" element={<Information />}/>
      <Route path = "/terminal" element={<Terminal />}/>
      <Route path = "/documentation" element={<Documentation />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
