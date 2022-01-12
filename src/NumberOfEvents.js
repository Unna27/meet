import React, { Component } from 'react';

class NumberOfEvents extends Component {
  // state variable initialization (could also be initaialized using constructor and this varaiable)
  state = {
   numEvents: 32
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({
      numEvents: value      
    });
    console.log(this.state.numEvents);
  }


  render() {
    return (
      <div className='NumberOfEvents'>
        <input
          type='number'
          className='eventNumber'
          value={this.state.numEvents}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;