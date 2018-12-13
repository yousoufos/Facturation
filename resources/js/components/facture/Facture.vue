
<template>
  <v-container>
    <v-layout row wrap v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular indeterminate color="primary"  >

                </v-progress-circular>
            </v-flex>
        </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-btn color="success" @click="submit" block>Save</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-btn color="primary" @click="test" block>Vuex</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 d-flex>
        <v-select 
          :items="liste"
          label="Client"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["url"],
  created(){
    
    
  },
  data() {
    return {
      liste:[],
      facture: {
        reference: "FACT-TEST",
        statut: "En cours",
        reglement: "cheque",
        date_emission: new Date(),
        date_echeance: new Date(),
        client_id: 1,
        total_ht: 100,
        total_tva: 20,
        total_ttc: 120,
        total_remise: 11,
        lignes: [
          {
            produit_id: 5,
            qte: 10,
            remise: 0
          },
          {
            produit_id: 1,
            qte: 6,
            remise: 4
          },
          {
            produit_id: 3,
            qte: 2,
            remise: 7
          }
        ]
      }
    }
  },
  methods: {
    submit() {
      let uri = this.url + "/api/facturation/create"
      this.axios
        .post(uri, this.facture)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        });
    },
    test() {
      //this.client = this.$store.getters.getloadedClients
      
      
      
    }
  },
  computed:{
    loading(){
        return this.$store.getters.loading
      },
    client(){
      
      return this.$store.getters.getloadedClients
    }  
  },
};
</script>
