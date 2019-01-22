<template>
  <v-container grid-list-xs>
      <navigation></navigation>
      <v-layout
      row
      wrap
      v-if="loading"
    >
      <v-flex
        xs12
        class="text-xs-center"
      >
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
      v-else
    >
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="factures"
          class="elevation-1"
          item-key="id"
          loading="true"
          :rows-per-page-items="[25,50]"
          disable-initial-sort

        >
          <template
            slot="items"
            slot-scope="props"
          >
            <td>{{ props.item.name }}</td>
            <td><router-link :to="{name: 'showfacture', params: { factureId: props.item.id }}" class="text-xs-left">{{ props.item.reference }}</router-link> </td>
            <td class="text-xs-left">{{ getClientName(props.item) }}</td>
            <td class="text-xs-left">{{ formatDate(props.item.date_emission) }}</td>
            <td class="text-xs-left">{{ formatDate(props.item.date_echeance) }}</td>
            <td class="text-xs-left">{{ props.item.total_ht }}</td>
            <td class="text-xs-left">{{ props.item.total_ttc }}</td>
            <td class="text-xs-left" :class="getStatutClass(props.item)">{{ props.item.statut }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
var moment = require('moment');
export default {
  props: ["url"],
  data () {
    return {
      headers: [
        {
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Reference", value: "reference" },
        { text: "Client", value: "client_id" },
        { text: "Date", value: "date_emission" },
        { text: "Echeance", value: "date_echeance" },
        { text: "Total HT", value: "total_ht" },
        { text: "Total TTC", value: "total_ttc" },
        { text: "Statut ", value: "statut" },
      ],
      pagination: {
        rowsPerPage:10
      },

    }
  },
  methods: {
      formatDate(d){
          return moment(d).format("DD-MM-YYYY")
      },
      getClientName(item){
          return this.$store.getters.getClient(+item.client_id).nom
      },
      getStatutClass(item){
          if(item.statut === 'En cours'){
              return 'light-blue lighten-1'
          }
          if(item.statut === 'Annulée'){
              return 'red lighten-1'
          }
          if(item.statut === 'Close'){
              return 'teal lighten-1'
          }
          if(item.statut === 'En attente'){
              return 'orange lighten-1'
          }
      },
      rowId(item){
          let id = item.id
          this.$router.push({ name: 'showfacture', params: { factureId:id }})
          console.log(item.id);


      }

  },
  computed: {
      factures(){
          return this.$store.getters.getLoadedFactures
      },
      loading(){
          return this.$store.getters.loading;
      }

  }
}
</script>

<style>
</style>
