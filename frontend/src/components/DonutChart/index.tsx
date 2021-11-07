import Chart from 'react-apexcharts';
import axios from 'axios';
import { BASE_URL } from 'Utils/requests';
import { SaleSum } from 'types/sales';

type ChartData = {
    labels: string[];
    series: number[];

}


function DonutChart() {
    // FOrma errada
    let chartDate : ChartData = { labels: [], series: [] };

    axios.get(BASE_URL +'/sales/amount-by-saller')
        .then(response => {
            const data = response.data as SaleSum[];
            const myLabels = data.map(x => x.sellerMane);
            const mySeries = data.map(x => x.sum);

            console.log(response.data);
        });
    
   // const mockData = {
     //   series: [477138, 499928, 444867, 220426, 473088],
     //   labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
   // }
    
    const options = {
        legend: {
            show: true
        }
    }
    
    
    return (
       <Chart 
       
       options={{...options, labels: chartDate.labels}}
       series={chartDate.series}
        type="donut"
        height="240"
       />
       
    );
  }
  
  export default DonutChart;
