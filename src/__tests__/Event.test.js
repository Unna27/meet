import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper, event;
  beforeAll(() => {
    event=mockData[0];
    //console.log(event);
    EventWrapper = shallow(<Event event={event} />);
  });
 
  test('render event title', () => {
    expect(EventWrapper.find('.eventTitle')).toHaveLength(1);
  });

  test('render event start time', () => {
    expect(EventWrapper.find('.eventStartTime')).toHaveLength(1);
  });

  test('render event location', () => {
    expect(EventWrapper.find('.eventLocation')).toHaveLength(1);
  });

  test('render event details button', () => {
    expect(EventWrapper.find('.details-btn')).toHaveLength(1);
  });

  test('render event link', () => {
    expect(EventWrapper.find('.eventLink')).toHaveLength(1);
  });

  test('render event description', () => {
    expect(EventWrapper.find('.eventDescription')).toHaveLength(1);
  });

  test('selecting show details button', () => {
    EventWrapper.setState({
      isDisplay: false
    });
    expect(EventWrapper.find('.hidden')).toHaveLength(3);

    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.state('isDisplay')).toBe(true);
    //console.log(EventWrapper.debug());
    expect(EventWrapper.find('.eventDescription').hasClass('show')).toEqual(true);
    expect(EventWrapper.find('.eventLink').hasClass('show')).toEqual(true);
  });

  test('selecting hide details button', () => {
    EventWrapper.setState({
      isDisplay: true
    });
    expect(EventWrapper.find('.show')).toHaveLength(3);
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.state('isDisplay')).toBe(false);
    expect(EventWrapper.find('.hidden')).toHaveLength(3);
  });

});
