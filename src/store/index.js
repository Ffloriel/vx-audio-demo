import { applyMiddleware, combineReducers, createStore } from "redux"
import audio from './modules/audio/reducer'

const store =  createStore(
    combineReducers(
        {
            audio
        }
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store