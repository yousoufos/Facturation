
<template>
  <v-container grid-list-md>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
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
      <v-flex xs12 sm4 d-flex>
        <v-select
          :items="client "
          item-text="nom"
          item-value="id"
          label="Client"
          v-model="client_id"
          @change
        ></v-select>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap>
      <v-flex xs12 sm4 md6 d-flex>
        <v-select
          :items="produit "
          item-text="designation"
          item-value="id"
          label="Produits"
          v-model="produit_id"
          @change
        ></v-select>
      </v-flex>
      <v-flex xs12 sm4 md2>
        <v-text-field label="Quantité" v-model="qte"></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md2>
        <v-text-field label="Remise" v-model="remise"></v-text-field>
      </v-flex>
      <v-flex xs12 sm4 md2>
        <v-btn fab dark small color="indigo" @click="ajouter">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex>
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table :headers="headers" :items="ligne_tab" class="elevation-1" :total-items="50">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td class>{{ props.item.designation }}</td>
              <td class>{{ props.item.qte }}</td>
              <td class>{{ props.item.prix_unitaire }}</td>
              <td class>{{ props.item.tva }}</td>
              <td class>{{ props.item.total_ht_ligne }}</td>
              <td class>{{ props.item.remise }}</td>
              <td class="justify-center layout px-0">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item)"
              >
                edit
              </v-icon>
              <v-icon
              small
              @click="deleteItem(props.item)"
              >
                delete
              </v-icon>
              </td>              
            </template>
            <template slot="footer">
                <td :colspan="headers.length">
                  <strong>This is an extra footer</strong>
                </td>
              </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["url"],
  created() {},
  data() {
    return {
      ligne_tab:[],
      qte: "",
      remise: "",
      headers: [
        {
          align: "left",
          sortable: false,
          value:"name"
        },
        { text: "Designation", value: "designation" },
        { text: "Quantité", value: "qte" },
        { text: "Prix Unitaire", value: "prix_unitaire" },
        { text: "TVA", value: "tva" },
        { text: "Total HT", value: "total_ht_ligne" },
        { text: "Remise", value: "remise" },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      client_id: "",
      produit_id: "",
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
    };
  },
  methods: {
    submit() {
      let uri = this.url + "/api/facturation/create";
      this.axios
        .post(uri, this.facture)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    test() {
      console.log(this.ligne_tab);
    },
    ajouter(){
      this.ligne_tab.push({
        designation : this.$store.getters.getProduitById(this.produit_id).designation,
        qte : this.qte,
        prix_unitaire : this.$store.getters.getProduitById(this.produit_id).prix,
        tva : this.$store.getters.getProduitById(this.produit_id).tva,
        total_ht_ligne :  this.total_ht_ligne(this.produit_id),
        remise : this.remise
      })
    },
    total_ht_ligne(id){
      let a = this.$store.getters.getProduitById(id).prix
      let b = this.$store.getters.getProduitById(id).tva
      return  a * b
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    client() {
      return this.$store.getters.getClientListName;
    },
    produit() {
      return this.$store.getters.getProduitListName;
    }
  }
};
</script>
