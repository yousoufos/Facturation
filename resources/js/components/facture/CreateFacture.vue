<template>
  <v-container grid-list-md>
      <navigation></navigation>
    <v-layout
      row
      wrap
    >

      <v-flex xs12>
        <v-alert
          :value="saved"
          type="success"
          dismissible
          @click="clearSavedStatut"
        >
          Facture enregistrée.
        </v-alert>
        <v-alert
          :value="haveErrors"
          type="error"
          dismissible
          @click="clearErrors"
        >
          {{ erreurs }}
        </v-alert>
      </v-flex>
    </v-layout>
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
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        md4
        d-flex
      >
        <v-select
          :items="clientListName"
          item-text="nom"
          item-value="id"
          label="Client"
          v-model="client_id"
        ></v-select>
        <v-alert
          :value="validation_client"
          type="error"
          dismissible
          @click="clearErrors"
        >
          Vous devez choisir un client.
        </v-alert>
      </v-flex>
      <v-flex
        xs12
        md4
      >
        <date
          :date_facture="'Date Facturation'"
          ref="datefacture"
        ></date>
      </v-flex>
      <v-flex
        xs12
        md4
      >
        <date
          :date_facture="'Date Echeance'"
          ref="dateecheance"
        ></date>
        <v-alert
          :value="validation_date"
          type="error"
          dismissible
          @click="clearErrors"
        >
          La date d'echeance doit etre superieur a celle de facturation.
        </v-alert>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap
    >
      <v-flex
        xs12
        md4
      >
        <div
          class="clientDetail"
          v-if="client_id!==null"
        >
          <p class="clientNom ml-3 mt-1">{{ client.nom }}</p>
          <p class="clientadresse ml-3">{{ client.adresse }}</p>
          <p class="clientadresse ml-3">{{ client.matricule }}</p>
        </div>
      </v-flex>
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
        ></v-select>
        <v-alert
          :value="validation_produit"
          type="error"
          dismissible
          @click="clearErrors"
        >
          Vous devez choisir un produit.
        </v-alert>
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
        <v-alert
          :value="validation_qte"
          type="error"
          dismissible
          @click="clearErrors"
        >
          La valeur de la quantité doit etre superieur ou egale à 0.
        </v-alert>
      </v-flex>
      <v-flex
        xs12
        sm4
        md2
      >
        <v-text-field
          class="inputPrice"
          type="number"
          label="Remise %"
          v-model="remise"
        ></v-text-field>
        <v-alert
          :value="validation_remise"
          type="error"
          dismissible
          @click="clearErrors"
        >
          La valeur de la remise doit etre comprise entre [0-100].
        </v-alert>
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
          <v-alert
            :value="validation_lignes"
            type="error"
            dismissible
          @click="clearErrors"
          >
            La facture ne contient aucune entrée
          </v-alert>
          <v-data-table
            :headers="headers"
            :items="ligne_tab"
            class="elevation-1"
            :total-items="50"
            rows-per-page-text="Lignes par page"
          >
            <template
              slot="items"
              slot-scope="props"
            >
              <td>{{ props.item.name }}</td>
              <td class>{{ props.item.designation }}</td>
              <td class>
                <v-edit-dialog
                  :return-value.sync="props.item.qte"
                  lazy
                  @save="save(props.item.qte,props.item,Object.keys(props.item).find(key=>props.item[key] === props.item.qte ))"
                  @cancel="cancel"
                  @open="open"
                  @close="close(props.item)"
                  ref="modif_qte"
                > {{ props.item.qte }}
                  <v-text-field
                    min="0"
                    step="1"
                    type="number"
                    slot="input"
                    v-model="props.item.qte"
                    label="Edit"
                    single-line
                    counter

                  ></v-text-field>
                </v-edit-dialog>
              </td>
              <td class>{{ props.item.prix_unitaire }}</td>
              <td class>{{ props.item.tva }}</td>
              <td class>{{ props.item.total_ht_ligne }}</td>
              <td class>
                <v-edit-dialog
                  :return-value.sync="props.item.remise"
                  lazy
                  @save="save(props.item.remise,props.item,Object.keys(props.item).find(key=>props.item[key] === props.item.remise ))"
                  @cancel="cancel"
                  @open="open"
                  @close="close(props.item)"
                > {{ props.item.remise }}
                  <v-text-field
                    slot="input"
                    type="number"
                    v-model="props.item.remise"
                    label="Edit"
                    single-line
                    counter
                  ></v-text-field>
                </v-edit-dialog>
              </td>
              <td class="justify-center layout px-0">
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
                      label="Total Remise"
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
                      label="Total Tva"
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
                      label="Total HT"
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
                      class="inputPrice is-bold "
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
          <v-snackbar
            v-model="snack"
            :timeout="3000"
            :color="snackColor"
          >
            {{ snackText }}
            <v-btn
              flat
              @click="snack = false"
            >Close</v-btn>
          </v-snackbar>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
var moment = require('moment');
export default {

  props: ["url"],
  created () { },
  data () {
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
        { text: "Total HT (aprés remise)", value: "total_ht_ligne" },
        { text: "Remise % ", value: "remise" },
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
			validation_modif_qte:false,
			validation_modif_remise:false,
      client: {
        nom: '',
        adresse: '',
        raison: '',
        mail: '',
        tel: '',
        matricule: ''
      },
      snack: false,
      snackColor: '',
      snackText: '',
    };
  },
  methods: {
    enleverAnciennesValeurLigneFacture (item) {

      let ancien_total_ht_ligne = this.total_ht_ligne(this.lignes[this.ligne_tab.indexOf(item)].produit_id, this.lignes[this.ligne_tab.indexOf(item)].qte, this.lignes[this.ligne_tab.indexOf(item)].remise)
      let ancien_ttc_ligne = ancien_total_ht_ligne * (1 + eval(this.ligne_tab[this.ligne_tab.indexOf(item)].tva) / 100)
      let ancien_total_tva_ligne = ancien_ttc_ligne - ancien_total_ht_ligne
      let ancien_total_remise_ligne = this.total_remise_ligne(this.lignes[this.ligne_tab.indexOf(item)].produit_id, this.lignes[this.ligne_tab.indexOf(item)].qte, this.lignes[this.ligne_tab.indexOf(item)].remise)
      this.total_ht = (this.total_ht - ancien_total_ht_ligne).toFixed(3);
      this.total_ttc = (this.total_ttc - ancien_ttc_ligne).toFixed(3);
      this.total_tva = (this.total_tva - ancien_total_tva_ligne).toFixed(3);
      this.total_remise = this.total_remise - ancien_total_remise_ligne

    },
    updateLigneFactureAvecNouvelleValeur (val, item, key) {

      let nouveau_total_ht_ligne = this.total_ht_ligne(this.lignes[this.ligne_tab.indexOf(item)].produit_id,        this.ligne_tab[this.ligne_tab.indexOf(item)].qte, this.ligne_tab[this.ligne_tab.indexOf(item)].remise)
      let nouveau_ttc_ligne = eval(nouveau_total_ht_ligne) * (1 + eval(this.ligne_tab[this.ligne_tab.indexOf(item)].tva) / 100)
      let nouveau_total_remise_ligne = this.total_remise_ligne(this.lignes[this.ligne_tab.indexOf(item)].produit_id, this.ligne_tab[this.ligne_tab.indexOf(item)].qte, this.ligne_tab[this.ligne_tab.indexOf(item)].remise)
      let nouveau_total_tva_ligne = nouveau_ttc_ligne - nouveau_total_ht_ligne
      this.total_ht = (eval(this.total_ht) + eval(nouveau_total_ht_ligne)).toFixed(3)
      this.total_ttc = (eval(this.total_ttc) + eval(nouveau_ttc_ligne)).toFixed(3)
      this.total_tva = (eval(this.total_tva) + eval(nouveau_total_tva_ligne)).toFixed(3)
      this.ligne_tab[this.ligne_tab.indexOf(item)].total_ht_ligne = nouveau_total_ht_ligne
      this.total_remise = (eval(this.total_remise) + eval(nouveau_total_remise_ligne)).toFixed(3)
      if (key === 'qte') {
        this.lignes[this.ligne_tab.indexOf(item)].qte = val
      }
      else {
        this.lignes[this.ligne_tab.indexOf(item)].remise = val
      }
    },

    save (val, item, key) {
        if(key === 'qte'){
            if(val>=0){
                this.snack = true
                this.snackColor = 'success'
                this.snackText = 'Data saved'
                this.enleverAnciennesValeurLigneFacture(item, key)
                this.updateLigneFactureAvecNouvelleValeur(val, item, key)
            }
            else{
                this.validation_modif_qte = true
                this.$refs.modif_qte.cancel()
            }
        }
			if (key === 'remise') {
                if(val>=0 && val <= 100){
                    this.snack = true
                    this.snackColor = 'success'
                    this.snackText = 'Data saved'
                    this.enleverAnciennesValeurLigneFacture(item, key)
                    this.updateLigneFactureAvecNouvelleValeur(val, item, key)
                }
                else{
                    this.validation_modif_remise = true
                    this.$emit('cancel')
                }
			}


    },
    cancel () {
      this.snack = true
      this.snackColor = 'error'
      this.snackText = 'Canceled'
    },
    open () {
      this.snack = true
      this.snackColor = 'info'
      this.snackText = 'Dialog opened'
    },
    close (item) {
        if(this.validation_modif_qte){
            this.ligne_tab[this.ligne_tab.indexOf(item)].qte = this.lignes[this.ligne_tab.indexOf(item)].qte
        }
        if(this.validation_modif_remise)
        {
            this.ligne_tab[this.ligne_tab.indexOf(item)].remise = this.lignes[this.ligne_tab.indexOf(item)].remise
        }

    },
    clientSelected (val) {
      this.client.nom = this.$store.getters.getClient(val).nom
      this.client.adresse = this.$store.getters.getClient(val).adresse
      this.client.raison = this.$store.getters.getClient(val).raison
      this.client.matricule = this.$store.getters.getClient(val).matricule
      this.client.mail = this.$store.getters.getClient(val).mail
      this.client.tel = this.$store.getters.getClient(val).tel
    },
    resetFields () {
      this.produit_id = null,
        this.client_id = null,
        this.total_ht = 0,
        this.total_tva = 0,
        this.total_ttc = 0,
        this.total_remise = 0,
        this.qte = 0,
        this.remise = 0,
        this.ligne_tab = [],
        this.lignes = []
    },
    deleteItem (item) {
      const index = this.ligne_tab.indexOf(item)
      let response = confirm('Etes vous sur de vouloir supprimer cette ligne')
      if (response) {
        this.enleverAnciennesValeurLigneFacture(item)
        this.ligne_tab.splice(index, 1)
        this.lignes.splice(index, 1)
      }

    },
    submit () {
      this.validation_client = this.client_id === null ? true : false
      this.validation_date = moment(this.$refs["datefacture"].date) <= moment(this.$refs["dateecheance"].date) ? false : true
      this.validation_lignes = this.ligne_tab.length == 0 ? true : false
      if (this.validation_client == false && this.validation_date == false && this.validation_qte == false && this.validation_remise == false && this.validation_lignes == false && this.validation_produit == false) {
        let facture = {
          client_id: this.client_id,
          date_emission: this.$refs["datefacture"].date,
          date_echeance: this.$refs["dateecheance"].date,
          statut: this.statut,
          total_ht: this.total_ht,
          total_ttc: this.total_ttc,
          total_remise: this.total_remise,
          total_tva: this.total_tva,
          lignes: this.lignes
        };
        this.$store.dispatch("saveFacture", facture);
        this.resetFields()
      }

    },
    test () {




    },
    clearErrors () {
        this.validation_client = false
        this.validation_date = false
        this.validation_produit = false
        this.validation_qte = false
        this.validation_remise = false
        this.validation_lignes = false
      this.$store.dispatch('clearErrors')

    },
    clearSavedStatut () {
      this.$store.dispatch('clearSavedStatut')

    },
    ajouter () {
      this.validation_qte = this.qte < 0 ? true : false
      this.validation_remise = (this.remise < 0 || this.remise > 100) ? true : false
      this.validation_produit = this.produit_id === null ? true : false
      if (this.validation_qte == false && this.validation_remise == false && this.validation_produit == false) {
        this.ligne_tab.push({
          designation: this.$store.getters.getProduitById(this.produit_id)
            .designation,
          qte: this.qte,
          prix_unitaire: this.$store.getters.getProduitById(this.produit_id).prix,
          tva: this.$store.getters.getProduitById(this.produit_id).tva,
          total_ht_ligne: this.total_ht_ligne(this.produit_id, this.qte, this.remise),
          remise: this.remise
        });
        this.total_remise = (eval(this.total_remise) + eval(this.total_remise_ligne(this.produit_id, this.qte, this.remise))).toFixed(3);


        this.total_ht = (
          eval(this.total_ht) + eval(this.total_ht_ligne(this.produit_id, this.qte, this.remise))
        ).toFixed(3);
        this.total_ttc = (
          eval(this.total_ttc) + eval(this.total_ttc_ligne(this.produit_id, this.qte, this.remise))
        ).toFixed(3);
        this.total_tva = (
          eval(this.total_tva) + eval(this.total_tva_ligne(this.produit_id, this.qte, this.remise))
        ).toFixed(3);
        this.lignes.push({
          produit_id: this.produit_id,
          qte: this.qte,
          remise: this.remise
        });
      }


    },
    total_ht_ligne (id, qte, remise) {
      let a = this.$store.getters.getProduitById(id).prix;
      return (a * qte * (1 - remise / 100)).toFixed(3);
    },
    total_ttc_ligne (id, qte, remise) {
      let a = this.$store.getters.getProduitById(id).tva;
      return this.total_ht_ligne(id, qte, remise) * (1 + a / 100);
    },
    total_tva_ligne (id, qte, remise) {
      let a = this.$store.getters.getProduitById(id).tva;
      return this.total_ht_ligne(id, qte, remise) * (a / 100);
    },
    total_remise_ligne (id, qte, remise) {
      let a = this.$store.getters.getProduitById(id).prix;
      return (a * qte * (remise / 100));
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading;
    },
    erreurs () {
      return this.$store.getters.erreurs;
    },
    clientListName () {
      return this.$store.getters.getClientListName;
    },
    produit () {
      return this.$store.getters.getProduitListName;
    },
    haveErrors () {
      return this.$store.getters.erreurs !== null && this.$store.getters.erreurs !== undefined
    },
    saved () {
      return this.$store.getters.savedStatut;
    },
    loadedClients(){
        return this.$store.getters.loadedClients
    }
  },
  mounted(){
        window.Echo.channel("newFacture").listen(".facture-created", e => {
            const lignes = [];
                    const obj = e.lignes;
                    Object.keys(obj).forEach((key) => {
                        const value = obj[key];
                        lignes.push({
                            id: value.id,
                            produit_id: value.produit_id,
                            facture_id: value.facture_id,
                            qte: value.qte,
                            remise: value.remise,
                        });
                    })
                    const f = e.facture;
                    let facture = {
                        id:f.id,
                        client_id: f.client_id,
                        date_emission: f.date_emission,
                        date_echeance: f.date_echeance,
                        statut: f.statut,
                        total_ht: f.total_ht,
                        total_ttc: f.total_ttc,
                        total_remise: f.total_remise,
                        total_tva: f.total_tva,
                        reference: f.reference,
                        lignes: lignes
                    }

                    this.$store.commit('createFacture', facture)
                    this.$store.commit('createLignesFacture', lignes)
        });
  },
  watch:{
      client_id(val){
          if(val!=null){
              this.clientSelected(val)
          }



      }
  }
};
</script>
<style scoped>
.is-bold {
  font-weight: bold;
}
.clientNom {
  font-weight: bold;
}
.clientDetail {
  border-style: solid;
  border-width: thin;
}
</style>

