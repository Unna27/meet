import React, { Component } from 'react';

class NumberOfEvents extends Component {

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateEvents(undefined,value);
  }

  render() {
    return (
      <div className='numberOfEvents'>
        <label>Number of Events to be displayed</label>
        <input
          type='number'
          className='eventNumber'
          value={this.props.eventCount}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;