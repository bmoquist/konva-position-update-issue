export const UPDATE_POSITION = 'UPDATE_POSITION'

export const updatePosition = (deltaX, deltaY) => {
  return {
    type: UPDATE_POSITION,
    deltaX: deltaX,
    deltaY: deltaY
  }
}
