import React, { Component } from "react";

class Event extends Component {
  state = {
    isDisplay: false
  }

  handleClick = () => {
    this.setState(
      {
        isDisplay: !this.state.isDisplay 
      }
    );
    //console.log("inside handle"+this.state.isDisplay);
  }

  render() {
    return (
      <div className='Event'>
        <h3 className='eventTitle'></h3>
        <p className='eventStartTime'></p>
        <p className='eventLocation'></p>
        <a className={`eventLink ${this.state.isDisplay ? 'show' : 'hidden'}`}>See details on Google Calendar</a>
        <p className={`eventDescription ${this.state.isDisplay ? 'show' : 'hidden'}`}></p>
        <button className='eventDetails' onClick={this.handleClick}>{this.state.isDisplay ? 'hide details' : 'show details'}</button>
      </div>
    )
  } 
}
export default Event;