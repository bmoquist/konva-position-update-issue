Created this simple example of an issue that I'm encountering in a larger application. Not sure sure if the issue is related to the absolutePosition method in Konva or a logic error on my part -- looking for suggestions how to achieve the objective. This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Konva issue
* Objective: Move a group of objects together by dispatching Redux actions and using position information from the Redux store for rendering
* Current Approach:
  + Get the absolute position of one of the objects at drag start and the new absolute position of the same object at drag end
  + Calculate the position change (delta)
  + Dispatch the calculated delta to Redux and adjust all of the positions of the objects by the delta in the reducer
* Issue:
  + The objects on canvas jump by more than the amount dragged after the Redux update --- sometimes by a large amount. The jump appears to be larger when the distance moved is larger. </li>
  + For debugging, the object positions are printed to the Console and Redux Dev tools can be used to examine state.

## To Run

* Run `yarn install` in the repository local folder and then run `yarn start` -- should launch to localhost:3000
* Debugging information in the console and Redux Dev Tools
