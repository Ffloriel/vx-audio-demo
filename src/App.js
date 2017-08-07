import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import MainPage from './pages/MainPage'
import Vizualisation from './components/Vizualisation'

class App extends Component {
    render() {
        return (
            <MainPage>
                <Vizualisation width="1000" height="700" />
            </MainPage>
        )
    }
}

export default App
