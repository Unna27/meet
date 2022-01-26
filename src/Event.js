import React, { Component } from "react";
import { WarningAlert } from './Alert';

class Event extends Component {
  state = {
    isDisplay: false,
    warnText: 'Warning! You will be re-directed away from this web-site to Google Calendar'
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
    const eventTime=new Date(event.start.dateTime)
    return (
      <div className='event'>
        <h3 className='eventTitle'>{event.summary}</h3>
        <p className='eventStartTime'>{eventTime.toString()}</p>
        <p className='eventLocation'>@{event.summary} | {event.location}</p>
        <h4 className={`${this.state.isDisplay ? 'show' : 'hidden'}`}>About Event</h4>
        <a href={event.htmlLink} className={`eventLink ${this.state.isDisplay ? 'show' : 'hidden'}`}>See details on Google Calendar
          <WarningAlert text={this.state.warnText} />
        </a>
        <p className={`eventDescription ${this.state.isDisplay ? 'show' : 'hidden'}`}>{event.description}</p>
        <button className='details-btn' onClick={this.handleClick}>{this.state.isDisplay ? 'hide details' : 'show details'}</button>
      </div>
    )
  } 
}
export default Event;