
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
        <v-btn fab dark small color="indigo">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex>
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table :headers="headers" :items="client" class="elevation-1" :total-items="50">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td class>{{ props.item.id }}</td>
              <td class>{{ props.item.nom }}</td>
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
      qte: "",
      remise: "",
      headers: [
        {
          align: "left",
          sortable: false
        },
        { text: "Id", value: "id" },
        { text: "Nom", value: "nom" }
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
      console.log(this.produit_id);
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
