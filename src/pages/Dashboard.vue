<template>
  <div>

    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : 'text-left'">
                <h5 class="card-category">Promedios</h5>
                <h2 class="card-title">Interacciones en el stand</h2>
              </div>
              <div class="col-sm-6">
              </div>
            </div>
          </template>
          <bigline :data-synergy-compra="dataSynergyCompra" :data-synergy="dataSynergy"></bigline>
          {{ dataSynergy }}
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category"># Escaneos Totales</h5>
            <h3 class="card-title"><i class="tim-icons icon-camera-18 text-primary "></i> 259</h3>
          </template>
          
            <scans></scans>
          
        </card>
      </div>
      <div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category"># Compras del libro</h5>
            <h3 class="card-title"><i class="tim-icons icon-cart text-info "></i> ¿Se interactuó con los QR?</h3>
          </template>
          <barch :data-synergy="dataSynergyCompra"></barch>
        </card>
      </div>
      <!--<div class="col-lg-4" :class="{'text-right': isRTL}">
        <card type="chart">
          <template slot="header">
            <h5 class="card-category">{{$t('dashboard.completedTasks')}}</h5>
            <h3 class="card-title"><i class="tim-icons icon-send text-success "></i> 12,100K</h3>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        chart-id="green-line-chart"
                        :chart-data="greenLineChart.chartData"
                        :gradient-stops="greenLineChart.gradientStops"
                        :extra-options="greenLineChart.extraOptions">
            </line-chart>
          </div>
        </card>
      </div>-->
      <div class="col-lg-4" >
        <card class="card" :header-classes="{'text-right': isRTL}">
          <h3 slot="header" class="card-title">QR escaneados</h3>
          <div class="table-responsive" >
            <user-table></user-table>
          </div>
        </card>
      </div>
    </div>
    <div class="row">
      <!--<div class="col-lg-6 col-md-12">
        <card type="tasks" :header-classes="{'text-right': isRTL}">
          <template slot="header">
            <h6 class="title d-inline">{{$t('dashboard.tasks', {count: 5})}}</h6>
            <p class="card-category d-inline">{{$t('dashboard.today')}}</p>
            <base-dropdown menu-on-right=""
                          tag="div"
                          title-classes="btn btn-link btn-icon"
                          aria-label="Settings menu"
                          :class="{'float-left': isRTL}">
              <i slot="title" class="tim-icons icon-settings-gear-63"></i>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.action')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.anotherAction')}}</a>
              <a class="dropdown-item" href="#pablo">{{$t('dashboard.dropdown.somethingElse')}}</a>
            </base-dropdown>
          </template>
          <div class="table-full-width table-responsive">
            <task-list></task-list>
          </div>
        </card>
      </div>-->
      <!--<div class="col-lg-6 col-md-12">
        <card class="card" :header-classes="{'text-right': isRTL}">
          <h4 slot="header" class="card-title">QR escaneados</h4>
          <div class="table-responsive">
            <user-table></user-table>
          </div>
        </card>
      </div>-->
    </div>
  </div>
</template>
<script>
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import TaskList from './Dashboard/TaskList';
  import UserTable from './Dashboard/UserTable';
  import config from '@/config';
  import barch from './Dashboard/barch.vue';
  import bigline from './Dashboard/bigline.vue';
  import db from '../firebase/init.js'
  import { query, collection, getDocs, limit, orderBy } from "firebase/firestore"
  import scans from './Dashboard/scans.vue';
  export default {
    components: {
      LineChart,
      BarChart,
      TaskList,
      UserTable,
      barch,
      bigline,
      scans
    },
    data() {
      return {
          dataSynergy:[],
          dataSynergyCompra:[],
        purpleLineChart: {
          extraOptions: chartConfigs.purpleChartOptions2,
          chartData: {
            
            datasets: [{
              label: "Qr escaneados",
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
              data: [{x:1678229856000,y:1}, {x:1678229859000, y:2}, {x:1678229879000,y:3}, {x:1678229889000,y:4}, {x:1678229899000,y:5}, {x:1678229909000,y:1}],
            },
          ]
          },
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.2, 0],
        },
        greenLineChart: {
          extraOptions: chartConfigs.greenChartOptions,
          chartData: {
            labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV'],
            datasets: [{
              label: "My First dataset",
              fill: true,
              borderColor: config.colors.danger,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: config.colors.danger,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: config.colors.danger,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              data: [90, 27, 60, 12, 80],
            }]
          },
          gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
          gradientStops: [1, 0.4, 0],
        },
        blueBarChart: {
          extraOptions: chartConfigs.barChartOptions,
          chartData: {
            labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
            datasets: [{
              label: "Si",
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
        }
      }
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('dashboard.chartCategories');
      }
    },
    mounted() {
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    },
    created() {
      this.getData()
    },
    methods: {
      async getData() {
        // quitar comentarios ya quedo
        /*let data = [];
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
  };
</script>
<style>
</style>
