<template>
  <v-container grid-list-md>
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
    <v-layout>
      <v-flex xs12>
        <v-btn
          color="success"
          @click="submit"
          block
        >Save</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-btn
          color="primary"
          @click="test"
          block
        >Vuex</v-btn>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm4
        md4
        d-flex
      >
        <v-select
          :items="client "
          item-text="nom"
          item-value="id"
          label="Client"
          v-model="client_id"
          @change
        ></v-select>
      </v-flex>
      <date :date_facture="'Date Facturation'" ref="datefacture"></date>
      <date :date_facture="'Date Echeance'" ref="dateecheance"></date>
    </v-layout>
    <v-divider></v-divider>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        sm4
        md6
        d-flex
      >
        <v-select
          :items="produit "
          item-text="designation"
          item-value="id"
          label="Produits"
          v-model="produit_id"
          @change
        ></v-select>
      </v-flex>
      <v-flex
        xs12
        sm4
        md2
      >
        <v-text-field
          min="0"
          step="1"
          type="number"
          label="Quantité"
          v-model="qte"
        ></v-text-field>
      </v-flex>
      <v-flex
        xs12
        sm4
        md2
      >
        <v-text-field
          class="inputPrice"
          type="number"
          label="Remise"
          v-model="remise"
        ></v-text-field>
      </v-flex>
      <v-flex
        xs12
        sm4
        md2
      >
        <v-btn
          fab
          dark
          small
          color="indigo"
          @click="ajouter"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex>
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <v-data-table
            :headers="headers"
            :items="ligne_tab"
            class="elevation-1"
            :total-items="50"
          >
            <template
              slot="items"
              slot-scope="props"
            >
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
                >edit</v-icon>
                <v-icon
                  small
                  @click="deleteItem(props.item)"
                >delete</v-icon>
              </td>
            </template>
            <template slot="footer">
              <td :colspan="headers.length">
                <v-layout
                  row
                  wrap
                >
                  <v-flex
                    offset-xs10
                    xs2
                  >
                    <v-text-field
                      class="inputPrice"
                      type="number"
                      readonly
                      label="Totale Remise"
                      v-model="total_remise"
                      disabled
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout
                  row
                  wrap
                >
                  <v-flex
                    offset-xs10
                    xs2
                  >
                    <v-text-field
                      class="inputPrice"
                      type="number"
                      readonly
                      label="Totale Tva"
                      v-model="total_tva"
                      disabled
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout
                  row
                  wrap
                >
                  <v-flex
                    offset-xs10
                    xs2
                  >
                    <v-text-field
                      class="inputPrice"
                      type="number"
                      readonly
                      label="Totale HT"
                      v-model="total_ht"
                      disabled
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout
                  row
                  wrap
                >
                  <v-flex
                    offset-xs10
                    xs2
                  >
                    <v-text-field
                      outline
                      class="inputPrice is-bold"
                      type="number"
                      readonly
                      label="Totale TTC"
                      v-model="total_ttc"
                      disabled
                    ></v-text-field>
                  </v-flex>
                </v-layout>
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
  created () { },
  data () {
    return {
      ligne_tab: [],
      qte: 0,
      remise: 0,
      headers: [
        {
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Designation", value: "designation" },
        { text: "Quantité", value: "qte" },
        { text: "Prix Unitaire", value: "prix_unitaire" },
        { text: "TVA", value: "tva" },
        { text: "Total HT", value: "total_ht_ligne" },
        { text: "Remise", value: "remise" },
        { text: "Actions", value: "name", sortable: false }
      ],
      client_id: "",
      produit_id: "",
      reference: "FACT-TEST",
      statut: "En cours",
      reglement: "cheque",
      date_emission: new Date(),
      date_echeance: new Date(),
      client_id: 1,
      total_ht: 0,
      total_tva: 0,
      total_ttc: 0,
      total_remise: 0,
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
    };
  },
  methods: {
    submit () {
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
    test () {
      console.log(this.$refs['datefacture'].computedDateFormatted);
    },
    ajouter () {
      this.ligne_tab.push({
        designation: this.$store.getters.getProduitById(this.produit_id)
          .designation,
        qte: this.qte,
        prix_unitaire: this.$store.getters.getProduitById(this.produit_id).prix,
        tva: this.$store.getters.getProduitById(this.produit_id).tva,
        total_ht_ligne: this.total_ht_ligne(this.produit_id),
        remise: this.remise
      });
      this.total_remise = (eval(this.total_remise) + eval(this.remise)).toFixed(3)
      this.total_ht = (eval(this.total_ht) + eval(this.total_ht_ligne(this.produit_id))).toFixed(3)
      this.total_ttc = (eval(this.total_ttc) + eval(this.total_ttc_ligne(this.produit_id))).toFixed(3)
      this.total_tva = (eval(this.total_tva) + eval(this.total_tva_ligne(this.produit_id))).toFixed(3)

    },
    total_ht_ligne (id) {
      let a = this.$store.getters.getProduitById(id).prix;
      return a * this.qte;
    },
    total_ttc_ligne (id) {
      let a = this.$store.getters.getProduitById(id).tva
      return this.total_ht_ligne(id) * (1 + (a / 100))
    },
    total_tva_ligne (id) {
      return this.total_ttc_ligne(id) - this.total_ht_ligne(id)
    },
  },
  computed: {
    loading () {
      return this.$store.getters.loading;
    },
    client () {
      return this.$store.getters.getClientListName;
    },
    produit () {
      return this.$store.getters.getProduitListName;
    }
  }
};
</script>
<style scoped>
    .is-bold{
        font-weight:bold;
    }

</style>

