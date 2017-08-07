import * as types from './../../action-types'
import { createReducer } from './../../utils'

const initialState = {
    audioData: [],
    vizualizer: {}
}

const audio = createReducer(initialState, {
    [types.UPDATE_DATA](state, action) {
        return Object.assign({}, state, { audioData: [...action.data] })
    },
    [types.UPDATE_VIZUALIZER](state, action) {
        return Object.assign({}, state, { vizualizer: action.data })
    }
})

export default audio
