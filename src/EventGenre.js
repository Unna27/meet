import React, {useEffect, useState} from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer  } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9F2B68'];  
  /* to have custom label
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  */
  useEffect(()=>{
    const getData = () => {
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS']; // list of genres to be labeled in pie chart and checked against the events prop
      const data = genres.map((genre) => {
        const value = (events.filter((event)=> event.summary.split(' ').includes(genre))).length; // filter the events summary that includes the specific genre into an array and then calculate its length
        return { name: genre, value };
      });
      const filteredData=data.filter((d)=>d.value>0);
      return filteredData;
    };
    setData(() => getData());  // set the state variable, whenever there is a change in events
  },[events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          //labelLine={false}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%` }
          //label = {renderCustomizedLabel}
        >
          {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenre;