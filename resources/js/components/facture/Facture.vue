<template>
  <v-container grid-list-md>
    <v-layout row wrap >

      <v-flex xs12>
        <v-alert
      :value="haveErrors"
      type="error"
      dismissible
      @click="test"
    >
        {{ youssef }}
    </v-alert>
      </v-flex>
    </v-layout>
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
      <v-flex xs12 sm4 md4 d-flex>
        <v-select
          :items="client "
          item-text="nom"
          item-value="id"
          label="Client"
          v-model="client_id"
        ></v-select>
        <v-alert
      :value="true"
      type="error"
      v-if="validation_client"
    >
      Vous devez choisir un client.
    </v-alert>
      </v-flex>
      <date :date_facture="'Date Facturation'" ref="datefacture"></date>
      <date :date_facture="'Date Echeance'" ref="dateecheance"></date>
      <v-alert
      :value="true"
      type="error"
      v-if="validation_date"
    >
      La date d'echeance doit etre superieur a celle d'emission.
    </v-alert>
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
        ></v-select>
        <v-alert
      :value="true"
      type="error"
      v-if="validation_produit"
    >
      Vous devez choisir un produit.
    </v-alert>
      </v-flex>
      <v-flex xs12 sm4 md2>
        <v-text-field min="0" step="1" type="number" label="Quantité" v-model="qte"></v-text-field>
        <v-alert
      :value="true"
      type="error"
      v-if="validation_qte"
    >
      La valeur de la quantité doit etre superieur ou egale à 0.
    </v-alert>
      </v-flex>
      <v-flex xs12 sm4 md2>
        <v-text-field class="inputPrice" type="number" label="Remise" v-model="remise"></v-text-field>
        <v-alert
      :value="true"
      type="error"
      v-if="validation_remise"
    >
      La valeur de la remise doit etre superieur ou egale à 0.
    </v-alert>
      </v-flex>
      <v-flex xs12 sm4 md2>
        <v-btn fab dark small color="indigo" @click="ajouter">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex>
      <v-layout row wrap>
        <v-flex xs12>
            <v-alert
      :value="true"
      type="error"
      v-if="validation_lignes"
    >
      La facture ne n'a pas de de data
    </v-alert>
          <v-data-table
            :headers="headers"
            :items="ligne_tab"
            class="elevation-1"
            :total-items="50"
            rows-per-page-text="Lignes par page"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td class>{{ props.item.designation }}</td>
              <td class>{{ props.item.qte }}</td>
              <td class>{{ props.item.prix_unitaire }}</td>
              <td class>{{ props.item.tva }}</td>
              <td class>{{ props.item.total_ht_ligne }}</td>
              <td class>{{ props.item.remise }}</td>
              <td class="justify-center layout px-0">
                <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                <v-icon small @click="deleteItem(props.item)">delete</v-icon>
              </td>
            </template>
            <template slot="footer">
              <td :colspan="headers.length">
                <v-layout row wrap>
                  <v-flex offset-xs10 xs2>
                    <v-text-field
                      class="inputPrice"
                      type="number"
                      readonly
                      label="Total Remise"
                      v-model="total_remise"
                      disabled
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex offset-xs10 xs2>
                    <v-text-field
                      class="inputPrice"
                      type="number"
                      readonly
                      label="Total Tva"
                      v-model="total_tva"
                      disabled
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex offset-xs10 xs2>
                    <v-text-field
                      class="inputPrice"
                      type="number"
                      readonly
                      label="Total HT"
                      v-model="total_ht"
                      disabled
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex offset-xs10 xs2>
                    <v-text-field
                      outline
                      class="inputPrice is-bold"
                      type="number"
                      readonly
                      label="Total TTC"
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
 var moment = require('moment');
 export default {

  props: ["url"],
  created() {},
  data() {
    return {
      rules: {
        required: value => !!value || "Required."
      },
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
      produit_id: null,
      reference: "FACT-TEST",
      statut: "En cours",
      client_id: null,
      total_ht: 0,
      total_tva: 0,
      total_ttc: 0,
      total_remise: 0,
      lignes: [],
      validation_client: false,
      validation_date: false,
      validation_produit: false,
      validation_qte: false,
      validation_remise: false,
      validation_lignes: false,
      err:''
    };
  },
  methods: {
    submit() {
    // this.validation_client = this.client_id === null ? true : false
    // this.validation_date = moment(this.$refs["datefacture"].date) <= moment(this.$refs["dateecheance"].date) ? false :true
    // this.validation_qte = this.qte < 0 ? true : false
    // this.validation_remise = this.remise < 0 ? true : false
    // this.validation_produit = this.produit_id === null ? true : false
    // this.validation_lignes = this.ligne_tab.length == 0 ? true : false
    // if(this.validation_client && this.validation_date && this.validation_qte && this.validation_remise && this.validation_lignes && this.validation_produit)
    {
        let facture = {
        client_id: this.client_id,
        date_emission: this.$refs["datefacture"].computedDateFormatted,
        date_echeance: this.$refs["dateecheance"].computedDateFormatted,
        statut: this.statut,
        total_ht: this.total_ht,
        total_ttc: this.total_ttc,
        total_remise: this.total_remise,
        total_tva: this.total_tva,
        lignes: this.lignes
      };
      this.$store.dispatch("saveFacture", facture);



    }

    },
    test() {
       console.log(errors);

    },
    ajouter() {
      this.ligne_tab.push({
        designation: this.$store.getters.getProduitById(this.produit_id)
          .designation,
        qte: this.qte,
        prix_unitaire: this.$store.getters.getProduitById(this.produit_id).prix,
        tva: this.$store.getters.getProduitById(this.produit_id).tva,
        total_ht_ligne: this.total_ht_ligne(this.produit_id),
        remise: this.remise
      });
      this.total_remise = (eval(this.total_remise) + eval(this.remise)).toFixed(
        3
      );
      this.total_ht = (
        eval(this.total_ht) + eval(this.total_ht_ligne(this.produit_id))
      ).toFixed(3);
      this.total_ttc = (
        eval(this.total_ttc) + eval(this.total_ttc_ligne(this.produit_id))
      ).toFixed(3);
      this.total_tva = (
        eval(this.total_tva) + eval(this.total_tva_ligne(this.produit_id))
      ).toFixed(3);
      this.lignes.push({
        produit_id: this.produit_id,
        qte: this.qte,
        remise: this.remise
      });
    },
    total_ht_ligne(id) {
      let a = this.$store.getters.getProduitById(id).prix;
      return a * this.qte;
    },
    total_ttc_ligne(id) {
      let a = this.$store.getters.getProduitById(id).tva;
      return this.total_ht_ligne(id) * (1 + a / 100);
    },
    total_tva_ligne(id) {
      return this.total_ttc_ligne(id) - this.total_ht_ligne(id);
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    youssef() {
      return this.$store.getters.youssef;
    },
    client() {
      return this.$store.getters.getClientListName;
    },
    produit() {
      return this.$store.getters.getProduitListName;
    },
    errors: function(){
        return this.$store.getters.getErrors;
    },
    haveErrors(){
        return this.$store.getters.youssef !== null && this.$store.getters.youssef !== undefined
    }
  }
};
</script>
<style scoped>
.is-bold {
  font-weight: bold;
}
</style>

