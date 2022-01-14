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
    const event = this.props.event;
    return (
      <div className='event'>
        <h3 className='eventTitle'>{event.summary}</h3>
        <p className='eventStartTime'>{event.created}</p>
        <p className='eventLocation'>{event.location}</p>
        <a href={event.htmlLink} className={`eventLink ${this.state.isDisplay ? 'show' : 'hidden'}`}>See details on Google Calendar</a>
        <p className={`eventDescription ${this.state.isDisplay ? 'show' : 'hidden'}`}>{event.description}</p>
        <button className='details-btn' onClick={this.handleClick}>{this.state.isDisplay ? 'hide details' : 'show details'}</button>
      </div>
    )
  } 
}
export default Event;