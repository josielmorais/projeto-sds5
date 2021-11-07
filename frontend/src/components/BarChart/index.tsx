import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { BASE_URL } from 'Utils/requests';
import { SaleSuccess } from 'types/sales';
import { round } from 'Utils/format';

type SeriesData = {
   name: string,
   data: number[]

}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[];

}


function BarChart() {

    const  [chartData,setChartData] = useState<ChartData>({
        labels: {
        categories: []
    },
    series: [
        {
            name: "",
            data: []                   
        }
    ]
 });

 useEffect(() => {
    axios.get(`${BASE_URL}/sales/success-by-saller`)
    .then(response => {
        const data = response.data as SaleSuccess[];
        const myLabels = data.map(x => x.sellerName);
        const mySeries = data.map(x => round(100.0*x.deals / x.visited,1));

        setChartData({
         labels: {
            categories: myLabels
        },
        series: [
            {
                name: "% Success",
                data: mySeries           
            }
        ]
     });

        console.log(response.data);
    });
    
}, []
);


    
    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };
    
     
    
    return (
       <Chart 
       
       options={{...options, xaxis: chartData.labels}}
       series={chartData.series}
        type="bar"
        height="240"
       />
       
    );
  }
  
  export default BarChart;
