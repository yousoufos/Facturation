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
          @click="addClient"
          block
        >Nouveau Client</v-btn>
      </v-flex>
    </v-layout>
        <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <form>
      <v-card>
        <v-card-title>
          <span class="headline">Nouveau Client</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Code Produit" v-model="nom" v-validate="'required'" data-vv-name="nom" :error-messages="errors.collect('nom')"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Raison" v-model="raison" v-validate="'required'" data-vv-name="raison" :error-messages="errors.collect('raison')"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Matricule" v-model="matricule" v-validate="'required'" data-vv-name="matricule" :error-messages="errors.collect('matricule')" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Telephone" v-model="tel" v-validate="'required'" data-vv-name="tel" :error-messages="errors.collect('tel')" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field label="Email" v-model="email" v-validate="'required|email'" data-vv-name="email" :error-messages="errors.collect('email')" ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-textarea box rows="2" label="Adresse" v-model="adresse" v-validate="'required'" data-vv-name="adresse" :error-messages="errors.collect('adresse')" ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveClient">Save</v-btn>
        </v-card-actions>
      </v-card>
      </form>
    </v-dialog>
  </v-layout>
        <v-layout row wrap>
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="clients"
          class="elevation-1"
          item-key="id"
          :rows-per-page-items="[25,50]"
          :loading="loadingTable"
          disable-initial-sort


        >
          <template
            slot="items"
            slot-scope="props"
          >
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.nom }} </td>
            <td class="text-xs-left">{{ props.item.raison }}</td>
            <td class="text-xs-left">{{ props.item.matricule }}</td>
            <td class="text-xs-left">{{ props.item.tel }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.adresse }}</td>
            <td class="text-xs-left ">
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
          nom: {
            required:'Champs requis',
          },
          raison: {
            required: 'Champs requis'
          },
          matricule:{
              required: 'Champs requis'
          },
          tel:{
              required: 'Champs requis'
          },
          adresse:{
              required: 'Champs requis'
          },
          email:{
               required: 'Champs requis',
               email:"Entrez un email valide"
          }
        }
      },
        nom:null,
        raison:null,
        matricule:null,
        tel:null,
        email:null,
        adresse:null,
        dialog:false,
        id:null,
      headers: [
        {
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Nom", value: "nom" },
        { text: "Raison", value: "raison" },
        { text: "matricule", value: "matricule" },
        { text: "Telephone", value: "tel" },
        { text: "Email", value: "email" },
        { text: "Adresse", value: "adresse" },
        { text: "Actions", value: "name", sortable: false }
      ],
    }
    },
    methods:{
        clientId(id){
          return this.$store.getters.getClient(id)
        },
        deleteItem(item){
            let a={
                id:item.id,
                index:item
            }
      		let response = confirm('Etes vous sur de vouloir supprimer ce client ?')
      		if (response) {
                  this.$store.dispatch('deleteClient',a)

              }



        },
        editItem(item){
            const index = this.clients.indexOf(item)
            this.dialog = true
            this.clearFields()
            this.create = false
            this.nom = this.clientId(item.id).nom
            this.raison = this.clientId(item.id).raison
            this.matricule = this.clientId(item.id).matricule
            this.tel = this.clientId(item.id).tel
            this.email = this.clientId(item.id).email
            this.adresse = this.clientId(item.id).adresse
            this.id = item.id

        },
        addClient(){
            this.dialog = true
            this.clearFields()
            this.create = true
        },
        saveClient(){
                this.$validator.validate().then(result=>{
               if(result){
                   let client={
                nom:this.nom,
                raison:this.raison,
                matricule:this.matricule,
                tel:this.tel,
                email:this.email,
                adresse:this.adresse,
                id:this.id
                     }
                   if(this.create){
                     this.$store.dispatch('saveClient',client)
                   }
                   else{
                       this.$store.dispatch('editClient',client)
                   }
                   this.dialog = false
               }
           });


        },
        clearFields(){
            this.nom=null,
            this.raison=null,
            this.tel=null,
            this.matricule=null
            this.email=null
            this.adresse=null
            this.$validator.reset()
        }
    },
    computed: {
      clients(){
          return this.$store.getters.getloadedClients
      },
      loading(){
          return this.$store.getters.loading;
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
