import * as types from './../../action-types'

export const updateAudioData = data => {
    return  {
        type: types.UPDATE_DATA,
        data
    }
}

export const updateVizualizer = data => {
    return {
        type: types.UPDATE_VIZUALIZER,
        data
    }
}
