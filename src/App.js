import React, { Component } from 'react';
import './App.css';
import './nprogress.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { WarningAlert } from './Alert';
import CityScatterPlot from './CityScatterPlot';
import EventGenre from './EventGenre';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    warnText: '',
    showWelcomeScreen: undefined
  }

  // set eventCount value
  setEventCount = (value) => {
    this.setState({eventCount: value});
  }

  // update events, when a suggestion list has been clicked in CitySearch
  updateEvents = (location, numEvents) => {
    getEvents().then((events) => {
      if(location!==undefined){
        const locationEvents = (location === 'all') ?
          events :
          events.filter((event) => event.location === location);
        this.setState({
          events: locationEvents.slice(0, this.state.eventCount)
        });
      }
      if(numEvents!==undefined){
        const numofEventsList = events.slice(0, numEvents);
        this.setState({
          events: numofEventsList,
          eventCount: numEvents
        });
      }
    });
   
  }

  async componentDidMount() {
    this.mounted = true;
    if(window.location.href.startsWith("http://localhost")){
      getEvents().then((events) =>{
        if (this.mounted) {
          this.setState({ 
            events: events.slice(0, this.state.eventCount),
            locations: extractLocations(events),
            showWelcomeScreen: false
          });
        }
      });
    }
    else {
      const accessToken = localStorage.getItem('access_token');
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      this.setState({ showWelcomeScreen: !(code || isTokenValid )});
      if((code || isTokenValid ) && this.mounted){
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({ 
              events: events.slice(0, this.state.eventCount),
              locations: extractLocations(events),
              warnText: !navigator.onLine ? 'You are offline. Events data displayed might not be accurate.' : ''
            });
          }
        });
      }
    }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" /> // empty App

    return (
        <div className='App'>
          <h2>List of Training Events</h2>
          <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          <NumberOfEvents eventCount={this.state.eventCount} updateEvents={this.updateEvents} updateEventCount={this.setEventCount} />
          <h4>Events in each City</h4>
          <WarningAlert text={this.state.warnText} />
          <div className='data-vis-wrapper'>
            <EventGenre events={this.state.events} />
            <CityScatterPlot locations={this.state.locations} events={this.state.events} />
          </div>
          <EventList events={this.state.events} />
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
        </div>
      );
    }
  }
 
export default App;
