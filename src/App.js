import React, { Component } from 'react';
import './App.css';
import './nprogress.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { WarningAlert } from './Alert';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Legend, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventCount: 32,
    warnText: '',
    showWelcomeScreen: undefined
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

// generates array of city and total number of events fro each city. Chart-data
  getData = () => {
    const { locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift() // to get the first value (city) from the array
      console.log(city + number);
      return {city, number};
    })
    return data;
  };

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
          <NumberOfEvents eventCount={this.state.eventCount} updateEvents={this.updateEvents} />
          <h4>Events in each City</h4>
          <WarningAlert text={this.state.warnText} />
          <ResponsiveContainer height={250}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis allowDecimals={false} type="number" dataKey="number" name="number of events" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
          <EventList events={this.state.events} />
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
        </div>
      );
    }
  }
 
export default App;
