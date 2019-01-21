<template>
    <v-container grid-list-xs>
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
    <div  v-else>
        <v-layout>
      <v-flex xs12>
        <v-btn
          color="success"
          @click="addProduct"
          block
        >Nouveau Produit</v-btn>
      </v-flex>
    </v-layout>
        <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <form>
      <v-card>
        <v-card-title>
          <span class="headline">Nouveau Produit</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Code Produit" v-model="codeProduit" v-validate="'required'" data-vv-name="code" :error-messages="errors.collect('code')"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Designation" v-model="designation" v-validate="'required'" data-vv-name="designation" :error-messages="errors.collect('designation')"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Prix" v-model="prix" v-validate="'required|decimal:3'" data-vv-name="prix" :error-messages="errors.collect('prix')" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-select
          :items="listTva"
          item-text="value"
          item-value="value"
          label="Tva"
          v-model="tva"
          v-validate="'required'" data-vv-name="tva" :error-messages="errors.collect('tva')"
        ></v-select>
        </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveProduct">Save</v-btn>
        </v-card-actions>
      </v-card>
      </form>
    </v-dialog>
  </v-layout>
        <v-layout row wrap>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="produits"
          class="elevation-1"
          item-key="id"
          :loading="loadingTable"
          :rows-per-page-items="[25,50]"
          disable-initial-sort


        >
          <template
            slot="items"
            slot-scope="props"
          >
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.code }} </td>
            <td class="text-xs-left">{{ props.item.designation }}</td>
            <td class="text-xs-left">{{ props.item.prix }}</td>
            <td class="text-xs-left">{{ props.item.tva }}</td>
            <td class="justify-center ">
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
        </v-data-table>
      </v-flex>
    </v-layout>
    </div>

  </v-container>
</template>

<script>
export default {
     $_veeValidate: {
      validator: 'new'
    },
    data () {
    return {
        create:false,
         dictionary: {
        attributes: {
        },
        custom: {
          code: {
            required:'Champs requis',
          },
          tva: {
            required: 'Champs requis'
          },
          designation:{
              required: 'Champs requis'
          },
          prix:{
               required: 'Champs requis',
               decimal:"Le prix n'est pas valide"
          }
        }
      },
        codeProduit:null,
        designation:null,
        prix:null,
        tva:null,
        dialog:false,
        id:null,
      headers: [
        {
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Code", value: "code" },
        { text: "Designation", value: "designation" },
        { text: "Prix", value: "prix" },
        { text: "TVA", value: "tva" },
        { text: "Actions", value: "name", sortable: false }
      ],
    }
    },
    methods:{
        produitId(id){
          return this.$store.getters.getProduitById(id)
        },
        deleteItem(item){
            let a={
                id:item.id,
                index:item
            }
            const index = this.produits.indexOf(item)
      		let response = confirm('Etes vous sur de vouloir supprimer ce produit?')
      		if (response) {
                  this.$store.dispatch('deleteProduit',a)

              }



        },
        editItem(item){
            const index = this.produits.indexOf(item)
            this.dialog = true
            this.clearFields()
            this.create = false
            this.codeProduit = this.produitId(item.id).code
            this.designation = this.produitId(item.id).designation
            this.tva = this.produitId(item.id).tva
            this.prix = this.produitId(item.id).prix
            this.id = item.id

        },
        addProduct(){
            this.dialog = true
            this.clearFields()
            this.create = true
        },
        saveProduct(){
                this.$validator.validate().then(result=>{
               if(result){
                   let produit={
                code:this.codeProduit,
                designation:this.designation,
                prix:this.prix,
                tva:this.tva,
                id:this.id
                     }
                   if(this.create){
                     this.$store.dispatch('saveProduit',produit)
                   }
                   else{
                       this.$store.dispatch('editProduit',produit)
                   }
                   this.dialog = false
               }
           });


        },
        clearFields(){
            this.codeProduit=null,
            this.designation=null,
            this.prix=null,
            this.tva=null
            this.$validator.reset()
        }
    },
    computed: {
      produits(){
          return this.$store.getters.getloadedProduits
      },
      loading(){
          return this.$store.getters.loading;
      },
      listTva(){
          return this.$store.getters.getLoadedTva
      },
      loadingTable(){
            return this.$store.getters.getLoadingTable
        }



  },
  mounted () {
      this.$validator.localize('en', this.dictionary)
    },
}
</script>

<style>

</style>
