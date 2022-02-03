import React, {useEffect, useState} from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CityScatterPlot = ({ locations, events }) => {
  const [data, setData] = useState([]);
    
  useEffect(()=>{
   // generates array of city and total number of events for each city. Chart-data
   const getData = () => {
      const data = locations.map((location)=>{
        const number = events.filter((event) => event.location === location).length
        const city = location.split(', ').shift() // to get the first value (city) from the array
        return {city, number};
    })
    return data;
    };
    setData(() => getData());  // set the state variable, whenever there is a change in events
  },[locations, events]);

  return (
    <ResponsiveContainer height={250}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis type="category" dataKey="city" name="city" />
        <YAxis allowDecimals={false} type="number" dataKey="number" name="number of events" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend verticalAlign="top" height={36}/>
        <Scatter name="Events List by City" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default CityScatterPlot;