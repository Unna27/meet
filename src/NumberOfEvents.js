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
          defaultValue={this.props.eventCount}
          onBlur={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;