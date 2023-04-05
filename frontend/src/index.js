import React from 'react'
import ReactDOM from 'react-dom'
import  App  from './App'
import {BrowserRouter} from 'react-router-dom'
// import Context from './Context'
function Card(){
    return(
        // <Context.Provider value='hello'>
        <BrowserRouter>
        <div>
        <App/>
        </div>
        </BrowserRouter>
        // </Context.Provider>
    )
}


let div=document.querySelector('div')
ReactDOM.render(<Card/>,div)