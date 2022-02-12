import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

// Unit Testing

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

// Integration Testing
describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', async () => {
      const AppWrapper = await mount(<App />);
      const AppEventsState = AppWrapper.state('events');
      expect(AppEventsState).not.toEqual(undefined);
      AppWrapper.update();
      expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
      AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', async () => {
    const AppWrapper = await mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    AppWrapper.update();
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    //console.log(AppWrapper.debug());
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = await mount(<App />);
    //const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    AppWrapper.update();
    AppWrapper.find(CitySearch).setState({ suggestions: locations });
    const suggestions = AppWrapper.find(CitySearch).state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    //console.log(selectedIndex);
    const selectedCity = suggestions[selectedIndex];
    await AppWrapper.find(CitySearch).instance().handleItemClicked(selectedCity); // calling asyc function stack
    //console.log( CitySearchWrapper.state('suggestions'));
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    //console.log(eventsToShow);
    //console.log(AppWrapper.state('events'));
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = await mount(<App />);
    //const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    AppWrapper.update();
    await AppWrapper.find(CitySearch).find('.suggestions li').at((AppWrapper.find(CitySearch).find('.suggestions li')).length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('App passes "eventCount" state as a prop to NumberOfEvents', async () => {
    const AppWrapper = await mount(<App />);
    const AppEventCountState = AppWrapper.state('eventCount');
    expect(AppEventCountState).not.toEqual(undefined);
    AppWrapper.update();
    expect(AppWrapper.find(NumberOfEvents).props().eventCount).toEqual(AppEventCountState);
    //console.log(AppWrapper.debug());
    AppWrapper.unmount();
  });

  test('get the specified number of events mentioned in eventCount', async () => {
    const AppWrapper = await mount(<App />);
    AppWrapper.update();
    const NumberOfEventsWrapper = AppWrapper.find('.numberOfEvents');
    
    const eventObject = { target: { value: 2 }};
    //console.log(NumberOfEventsWrapper.debug());
    AppWrapper.update();
    await NumberOfEventsWrapper.find('.eventNumber').simulate('change', eventObject);

    const numEvents = AppWrapper.state('eventCount');
    const allEvents = await getEvents();
    //const eventsToShow = allEvents.filter((event,index) => index < numEvents);
    const eventsToShow = allEvents.slice(0, numEvents);
    //console.log(eventsToShow.length);
    expect(AppWrapper.state('eventCount')).toEqual(numEvents);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });
});