import React from 'react';
import { mount, shallow } from 'enzyme';

import App from '../App';
import NumberOfEvents from '../NumberOfEvents';

import { mockData } from '../mock-data';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasnot specified a event number, default number is 5', ({ given, when, then }) => {
    let AppWrapper;
    given('the main page is open', () => {
      AppWrapper = mount(<App />);
    });

    when('the user doesn’t provide any number in “number of events” field', () => {

    });

    then('the user should see a maximum of 5 or fewer upcoming events aligned according to the screen size', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
      AppWrapper.unmount();
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper, NumberOfEventsWrapper;
    given('the main page is open', () => {
      AppWrapper = mount(<App />);
    });

    when('the user provides a number (e.g. 2) in “number of events” field', async() => {
      NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      await NumberOfEventsWrapper.find('.eventNumber').simulate('change', { target: { value: 2 }});
    });

    then('the user should see the specified number of events being displayed aligned according to the screen size', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event')).toHaveLength(2);
      AppWrapper.unmount();
    });
  });
});
