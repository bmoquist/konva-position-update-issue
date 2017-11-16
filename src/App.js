import React, { Component } from 'react';
import './App.css';
import { Layer, Stage, Group, Rect } from 'react-konva';
import { connect } from 'react-redux'
import { updatePosition } from './actions'

class App extends Component {

  constructor(props) {
    super(props);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.state = {
      groupStartX: null,
      groupStartY: null,
      childStart0X: null,
      childStart0Y: null,
      childStart1X: null,
      childStart1Y: null
    };
  }

  handleDragStart(){
    console.log("HANDLE DRAG START")

    this.setState(
      Object.assign({}, this.state, {
        groupStartX: this.refs.itemsGroup.getAbsolutePosition().x,
        groupStartY: this.refs.itemsGroup.getAbsolutePosition().y,
        childStart0X: this.refs.itemsGroup.getChildren()[0].getAbsolutePosition().x,
        childStart0Y: this.refs.itemsGroup.getChildren()[0].getAbsolutePosition().y,
        childStart1X: this.refs.itemsGroup.getChildren()[1].getAbsolutePosition().x,
        childStart1Y: this.refs.itemsGroup.getChildren()[1].getAbsolutePosition().y,
        })
    );
  }


  handleDragEnd(){

    console.log("HANDLE DRAG END")

    console.log("GROUP")
    console.log(this.refs.itemsGroup)

    console.log("CHILDREN OBJECTS")
    console.log(this.refs.itemsGroup.getChildren())

    console.log("START: GROUP ABSOLUTE POSITION")
    const startGroupAbsoluteX = this.state.groupStartX
    const startGroupAbsoluteY = this.state.groupStartY
    console.log('X: ' + startGroupAbsoluteX)
    console.log('Y: ' + startGroupAbsoluteY)

    console.log("START: CHILD 0 ABSOLUTE POSITION")
    const startChildAbsolute0X = this.state.childStart0X
    const startChildAbsolute0Y = this.state.childStart0Y
    console.log('X: ' + startChildAbsolute0X)
    console.log('Y: ' + startChildAbsolute0Y)

    console.log("START: CHILD 1 ABSOLUTE POSITION")
    const startChildAbsolute1X = this.state.childStart1X
    const startChildAbsolute1Y = this.state.childStart1Y
    console.log('X: ' + startChildAbsolute1X)
    console.log('Y: ' + startChildAbsolute1Y)

    console.log("END: GROUP ABSOLUTE POSITION")
    const endGroupAbsoluteX = this.refs.itemsGroup.getAbsolutePosition().x
    const endGroupAbsoluteY = this.refs.itemsGroup.getAbsolutePosition().y
    console.log('X: ' + endGroupAbsoluteX)
    console.log('Y: ' + endGroupAbsoluteY)

    console.log("END: CHILD 0 ABSOLUTE POSITION")
    const endChildAbsolute0X = this.refs.itemsGroup.getChildren()[0].getAbsolutePosition().x
    const endChildAbsolute0Y = this.refs.itemsGroup.getChildren()[0].getAbsolutePosition().y
    console.log('X: ' + endChildAbsolute0X)
    console.log('Y: ' + endChildAbsolute0Y)

    console.log("END: CHILD 1 ABSOLUTE POSITION")
    const endChildAbsolute1X = this.refs.itemsGroup.getChildren()[1].getAbsolutePosition().x
    const endChildAbsolute1Y = this.refs.itemsGroup.getChildren()[1].getAbsolutePosition().y
    console.log('X: ' + endChildAbsolute1X)
    console.log('Y: ' + endChildAbsolute1Y)

    console.log("GROUP DELTA: END - START")
    const groupPositionDeltaX = endGroupAbsoluteX - startGroupAbsoluteX
    const groupPositionDeltaY = endGroupAbsoluteY - startGroupAbsoluteY
    console.log('X: ' + groupPositionDeltaX)
    console.log('Y: ' + groupPositionDeltaY)

    console.log("CHILD 0 DELTA: END - START")
    const childPositionDelta0X = endChildAbsolute0X - startChildAbsolute0X
    const childPositionDelta0Y = endChildAbsolute0Y - startChildAbsolute0Y
    console.log('X: ' + childPositionDelta0X)
    console.log('Y: ' + childPositionDelta0Y)

    console.log("CHILD 1 DELTA: END - START")
    const childPositionDelta1X = endChildAbsolute1X - startChildAbsolute1X
    const childPositionDelta1Y = endChildAbsolute1Y - startChildAbsolute1Y
    console.log('X: ' + childPositionDelta1X)
    console.log('Y: ' + childPositionDelta1Y)

    this.props.dispatch(updatePosition(childPositionDelta0X, childPositionDelta0Y))

    this.setState(
      Object.assign({}, this.state, {
          groupStartX: null,
          groupStartY: null,
          childStart0X: null,
          childStart0Y: null,
          childStart1X: null,
          childStart1Y: null
        })
      );
  }

  render() {

    let canvasObjects = []

    for(var ii=0; ii<this.props.stageObjects.length; ii++){
      canvasObjects.push(
        <Rect
            key={"Rect"+ii}
            width={this.props.stageObjects[ii].width}
            height={this.props.stageObjects[ii].height}
            x={this.props.stageObjects[ii].x}
            y={this.props.stageObjects[ii].y}
            fill={this.props.stageObjects[ii].fill}
            stroke={'black'}
            strokeWidth={1}
            draggable={false}
            onDragStart={this.handleDragStart}
            onDragEnd={this.handleDragEnd}
        />
      )
    }

    const divStyleA = {
      display: 'flex',
      justifyContent: 'center',
      margin: '2em 0'
    }

    const divStyleB = {
      width: '700px',
      textAlign: 'left'
    }

    const spanStyleA = {
      fontWeight: 700,
      lineHeight: '1.1em'
    }

    return (
      <div className="App">
        <div style={divStyleA}>
          <div style={divStyleB}>
              <span style={spanStyleA}>Objective:</span>
              <ul>
                <li>Move a group of objects together by dispatching Redux actions and using position information from the Redux store for rendering</li>
              </ul>
              <span style={spanStyleA}>Current Approach:</span>
              <ol>
                <li>Get the absolute position of one of the objects at drag start and the new absolute position of the same object at drag end</li>
                <li>Calculate the position change (delta)</li>
                <li>Dispatch the calculated delta to Redux and adjust all of the positions of the objects by the delta in the reducer</li>
              </ol>
              <span style={spanStyleA}>Issue:</span>
              <ul>
                <li>The objects on canvas jump by more than the amount dragged after the Redux update (try below) --- sometimes by a large amount. The jump appears to be larger when the distance moved is larger. </li>
                <li>For debugging, the object positions are printed to the Console and Redux Dev tools can be used to examine state.</li>
              </ul>
              <span style={spanStyleA}>Test Stage:</span>
          </div>
        </div>
        <Stage width={1000} height={500}>
          <Layer>
              <Group
                ref="itemsGroup"
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
                draggable={true}
                >
                {canvasObjects}
              </Group>
          </Layer>
        </Stage>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stageObjects: state.stageObjects,
   }
};

export default connect(mapStateToProps)(App);
