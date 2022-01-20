import React from 'react';
import { mount, shallow } from 'enzyme';

import App from '../App';
import Event from '../Event';

import { mockData } from '../mock-data';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    let AppWrapper;
    given('user opens the app', () => {
      AppWrapper=mount(<App />)
    });

    when('the user has not selected any city', () => {

    });

    then('the user should see a list of all upcoming events with “show details” button', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event .show')).toHaveLength(0);
      AppWrapper.unmount();
    });
  });

  test('User should see more detailed information about the selected event', ({ given, and, when, then }) => {
    let AppWrapper, EventWrapper;
    given('the main page is open', () => {
      AppWrapper=mount(<App />)
    });

    and('the user looks at the first event', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    when('user clicks “show details” button of a particular event', () => {
      EventWrapper.find('.details-btn').simulate('click');
    });

    then('the user should see more detailed information about the selected event along with “hide details” button', () => {
      expect(EventWrapper.find('.show')).toHaveLength(3);
      AppWrapper.unmount();
    });
  });

  test('User can collapse an event to show minimal information about an event', ({ given, and, when, then }) => {
    let AppWrapper, EventWrapper;
    given('the main page is open', () => {
      AppWrapper=mount(<App />)
      EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    and('the user has viewed more detailed information about an event', () => {
      EventWrapper.setState({
        isDisplay: true
      });
    });

    when('the user clicks “hide details” button', () => {
      EventWrapper.find('.details-btn').simulate('click');
    });

    then('the user should see less information about the event with “show details” button', () => {
      expect(EventWrapper.find('.hidden')).toHaveLength(3);
      AppWrapper.unmount();
    });
  });
} );