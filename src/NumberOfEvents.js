import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
   errorText: ''
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    if(value <= 0 || value >32){
      this.setState({
          errorText: 'Enter a number between 1 and 32'
        });
    }else {
      this.setState({
        errorText: ''
      });
      this.props.updateEvents(undefined,value);
    }
    
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
       <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;