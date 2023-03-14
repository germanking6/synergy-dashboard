<template>
  <div>
    <div v-if="online" class="chart-area">
      <bar-chart style="height: 100%"
                chart-id="blue-bar-chart"
                :chart-data="blueBarChart2.chartData"
                :gradient-stops="blueBarChart2.gradientStops"
                :extra-options="blueBarChart2.extraOptions">
      </bar-chart>
    </div>
</div>
</template>

<script>
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import config from '@/config';
  import db from '@/firebase/init.js'
  import { query, collection, getDocs, limit, orderBy } from "firebase/firestore"
  export default {
    components: {
      BarChart
    },
    props:{
      
    },  
    data() {
      return {
        hours: ["7:00-10:00", "10:00-13", "13-16", "16-19","19-22"],
        blueBarChart: {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: ["07:00-10:00", "10:00-13:00", "13:00 - 16:00", "16:00-19:00","19:00-22:00"],
            datasets: [{
              label: "Sí",
              fill: true,
              borderColor: config.colors.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [1, 2, 3, 4, 5, 6],
            },
            {
              label: "No",
              fill: true,
              borderColor: "#42b882",
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              data: [6, 5, 4, 3, 2, 1],
            },
          ]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
        },
        dataSynergy: [],
        online: false
      }
    },
    computed: {
      hours0() {
        let data = [0,0,0,0,0]
        for (const element of this.dataSynergy) {
          if(element.qr==1){
            var h = new Date(element.timestamp*1000).getHours()
            if(h<10){
              data[0]++;
            }else if(h<13){
              data[1]++;
            }else if(h<16){
              data[2]++;
            }else if(h<19){
              data[3]++;
            }else{
              data[4]++;
            }
          }
          
        }
        return data;
      },
      hours1() {
        let data = [0,0,0,0,0]
        for (const element of this.dataSynergy) {
          if(element.qr==0){
            var h = new Date(element.timestamp*1000).getHours()
            if(h<10){
              data[0]++;
            }else if(h<13){
              data[1]++;
            }else if(h<16){
              data[2]++;
            }else if(h<19){
              data[3]++;
            }else{
              data[4]++;
            }
          }
          
        }
        return data;
      },
      blueBarChart2() {
        const blueBarChart3 = this.blueBarChart;
        
        blueBarChart3.chartData.datasets[0].data = this.hours1;
        blueBarChart3.chartData.datasets[1].data = this.hours0;
        return blueBarChart3;
      }
    },
    created() {
          this.getData()

    },
    methods: {
      async getData() {
        // quitar comentarios ya quedo
        let data = [];
        const querySnap = await getDocs(query(collection(db, 'compra'),orderBy('timestamp', "desc") ,limit(10)));
        // add each doc to 'countries' array
        querySnap.forEach((doc) => {
          data.push(doc.data())
        })
        this.dataSynergy = data
        this.online = true;
        /**/
      }
    }
  }
</script>
<style>
</style>
