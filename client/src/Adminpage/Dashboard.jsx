import React from 'react'
import Adminpage from './Adminpage'
import { FaUsers } from "react-icons/fa6";
import { IoQrCodeOutline } from "react-icons/io5";
import { Line } from 'react-chartjs-2';

function Dashboard() {
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };
      
      const chartOptions = {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255,255,255,0.2)', // Change grid color
            },
            ticks: {
              color: 'white', // Change tick color
            },
          },
          x: {
            grid: {
              color: 'rgba(255,255,255,0.2)', // Change grid color
            },
            ticks: {
              color: 'white', // Change tick color
            },
          },
        },
        plugins: {
          title: {
            color: 'white', // Change title color
          },
          legend: {
            labels: {
              color: 'white', // Change legend label color
            },
          },
        },
      };
  return (
      <Adminpage>
         <div className='flex ml-[250px] w-5/6 mt-[70px] absolute'>

<div className='w-2/6 h-[87vh] flex flex-col justify-center items-center gap-[70px]'>
  <div className='w-[250px] h-[200px] bg-slate-900 rounded-lg flex flex-col justify-center items-center gap-[15px]'>
  <FaUsers className='font-bold text-5xl'/>
   <h1 className='font-bold text-lg'>0 Users</h1>
  </div>
  <div className='w-[250px] h-[200px] bg-slate-900 rounded-lg flex flex-col justify-center items-center gap-[15px]'>
  <IoQrCodeOutline className='font-bold text-5xl'/>
  <h1 className='font-bold text-lg'>0 Qr Codes</h1>
  </div>
</div>
<div className='w-5/6 '>
<div className=' w-[800px] h-[470px] bg-slate-900 flex flex-col justify-center items-center rounded-lg mt-[70px] p-4'> 
<Line key="uniqueChartKey" data={chartData} options={chartOptions}/>
</div> 
</div>
</div>
      </Adminpage>   
  )
}

export default Dashboard
