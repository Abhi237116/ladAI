import React from 'react'
import { BrowserRouter,Link,Route,Routes } from 'react-router-dom' 
import {logo} from './assets';
import {Home,ContactUs} from './pages';


const App = () => {
  return (
    <BrowserRouter>
    
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border -b border-b-[#e6eb]">
   
    <Link to="/">
      <img src={logo} alt="logo" className="w-28 object-contain"/>
    </Link>
     
    </header>
    <Routes>
    <Route path="/" element={<Home/>} />
   
    
    <Route path="/contact" element={<ContactUs/>}/>
    </Routes></BrowserRouter>

    
  )
}

export default App