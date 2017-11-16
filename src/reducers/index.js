import { combineReducers } from 'redux'

import {
  UPDATE_POSITION,
} from '../actions'

const setUpInitialState = () => {
  return [
    {
      x: 200,
      y: 150,
      width: 150,
      height: 100,
      fill: 'blue'
    },
    {
      x: 100,
      y: 50,
      width: 50,
      height: 50,
      fill: 'green'
    },
    {
      x: 450,
      y: 250,
      width: 50,
      height: 100,
      fill: 'yellow'
    }
  ]
}

const updatePosition = (state, action) => {

  let newStageObjects = []

  for(var ii=0; ii < state.length; ii++){
    newStageObjects.push(
      Object.assign({}, state[ii],{
        x: state[ii].x + action.deltaX,
        y: state[ii].y + action.deltaY
      })
    )
  }

  return newStageObjects

}

const stageObjects = (state = setUpInitialState(), action) => {
  switch (action.type) {
    case UPDATE_POSITION:
      return updatePosition(state, action)
    default:
      return state
  }
}

const shapeList = combineReducers({
  stageObjects: stageObjects
})

export default shapeList
