import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });
 

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.eventNumber')).toHaveLength(1);
  });

  test('renders text input correctly', () => {
    const numEvents = NumberOfEventsWrapper.state('numEvents');
    //console.log(numEvents);
    expect(NumberOfEventsWrapper.find('.eventNumber').prop('value')).toBe(numEvents);
  });

  test('change state when text input changes', () => {
    NumberOfEventsWrapper.setState({
      numEvents: 32
    });
    const eventObject = { target: { value: 7 }};
    NumberOfEventsWrapper.find('.eventNumber').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('numEvents')).toBe(7);
  });

  test('number of Events should be numeric', () => {
    NumberOfEventsWrapper.setState({
      numEvents: '6'
    });
    //console.log(NumberOfEventsWrapper.state('numEvents'));
    expect(Number.isNaN(-NumberOfEventsWrapper.state('numEvents'))).toBe(false)
  })
});