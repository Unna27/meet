import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper, numEvents;
  beforeAll(() => {
    numEvents = 5;
    NumberOfEventsWrapper = shallow(<NumberOfEvents eventCount={numEvents} updateEvents={() => {}} />);
  });
 

  test('render text input', () => {
    expect(NumberOfEventsWrapper.find('.eventNumber')).toHaveLength(1);
  });

  test('renders text input correctly', () => {
    expect(NumberOfEventsWrapper.find('.eventNumber').prop('value')).toBe(numEvents);
  });

  test('number of Events should be numeric', () => {
    expect(Number.isNaN(-NumberOfEventsWrapper.find('.eventNumber').prop('value'))).toBe(false)
  })
});