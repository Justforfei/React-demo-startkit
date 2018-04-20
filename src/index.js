import React from 'react'
import ReactDom from 'react-dom'
import App from './App'

const render = (App) => {
  ReactDom.render(
    <App/>,
    document.getElementById('app')
  )
}

render(App)