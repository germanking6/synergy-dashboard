<template>
  <div>
    <base-table :data="countries"
                :columns="Object.keys(countries[0])"
                thead-classes="text-primary">
    </base-table>
</div>
</template>
<script>
  import { BaseTable } from "@/components";
  import db from '../../firebase/init.js'
  import { query, collection, getDocs, limit } from "firebase/firestore"
  export default {
    components: {
      BaseTable
    },
    data() {
      return {
        countries: []
      }
    },
    computed: {
      
    },
    created() {
      this.getData()
    },
    methods: {
    async getData() {
      // quitar comentarios ya quedo
      const querySnap = await getDocs(query(collection(db, 'ARQR'),limit(5)));
      // add each doc to 'countries' array
      querySnap.forEach((doc) => {
        console.log(doc.data)
        this.countries.push(doc.data())
      })/* */
    }
  }
  }
</script>
<style>
</style>
