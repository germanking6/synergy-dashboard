<template>
  <div>
    <div v-if="online" class="chart-area">
      <line-chart style="height: 220px"
                  ref="bigChart"
                  chart-id="big-line-chart"
                  :chart-data="bigLineChart2.chartData"
                  :gradient-colors="bigLineChart.gradientColors"
                  :extra-options="bigLineChart.extraOptions"
                  >
      </line-chart>
    </div>
</div>
</template>

<script>
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import UserTable from '../Dashboard/UserTable';
  import config from '@/config';
  import db from '@/firebase/init.js'
  import { query, collection, getDocs, limit, orderBy } from "firebase/firestore"
  export default {
    components: {
      LineChart,
      BarChart,
      UserTable
    },
    props:{
    },  
    data() {
      return {
        bigLineChart: {
          extraOptions: chartConfigs.purpleChartOptions2,
          chartData: {
            datasets: [{
              label: "Ventas",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [],
            },
            {
              label: "personas",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.info,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.info,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [],
            }
          ]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        },
        online: false,
        dataSynergy:[],
        dataSynergyCompra:[],
        
      }
    },
    computed: {
      data1() {
        let data = []
        for (const element of this.dataSynergy) {
          let obj = {x: element.timestamp*1000, y: element.qr}
          data.push(obj)
        }
        data.sort(function(x, y){
            return x.x - y.x;
        })
        console.log("sas")
        return data;
      },
      data2() {
        
        return data;
      },
      bigLineChart2() {
        
        const blueBarChart3 = this.bigLineChart;

        let data2 = []
        for (const element of this.dataSynergyCompra) {
          let obj = {x: (element.timestamp*1000)-990000, y: element.qr+1}
          data2.push(obj)
        }
        let data1 = []
        for (const element of this.dataSynergy) {
          let obj = {x: element.timestamp*1000, y: element.qr}
          data1.push(obj)
        }

        blueBarChart3.chartData.datasets = 
          [{
              label: "Ventas",
              fill: true,
              borderColor: config.colors.primary,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.primary,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.primary,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: data1,
            },
            {
              label: "personas",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.info,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.info,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: data2,
            }
          ]
        
        return blueBarChart3;
      }
    },
    methods: {
      async getData() {
        // quitar comentarios ya quedo
        let data = [];
        const querySnap = await getDocs(query(collection(db, 'ARQR'),orderBy('timestamp') ,limit(10)));
        // add each doc to 'countries' array
        querySnap.forEach((doc) => {
          data.push(doc.data())
        })
        this.dataSynergy = data
        
        let data2 = []
        const querySnap2 = await getDocs(query(collection(db, 'compra'),orderBy('timestamp') ,limit(10)));
        // add each doc to 'countries' array
        querySnap2.forEach((doc) => {
          data2.push(doc.data())
        })
        this.dataSynergyCompra = data2

        this.online = true;
        /**/
      }
    },
    created() {
      this.getData()
    },
  }
</script>
<style>
</style>
